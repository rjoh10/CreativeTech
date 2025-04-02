import pandas as pd
import geopandas as gpd
from shapely.geometry import Point
import folium
from folium.plugins import HeatMap
import panel as pn
import os
import time

pn.extension()

os.makedirs("maps", exist_ok=True)

# Load rodent data
df = pd.read_csv("Rodent Activity Data_ ISD Environmental Feb 2023 to Feb 2025 - ESD CRMs 311.csv")
df = df.dropna(subset=["location_x_longitude", "location_y_latitude", "open_dt"])
df["open_dt"] = pd.to_datetime(df["open_dt"])
df["year_month"] = df["open_dt"].dt.to_period("M").astype(str)

# Convert to GeoDataFrame
geometry = [Point(xy) for xy in zip(df["location_x_longitude"], df["location_y_latitude"])]
rodents_gdf = gpd.GeoDataFrame(df, geometry=geometry, crs="EPSG:4326")

# Load Boston neighborhood boundaries
neighborhoods_gdf = gpd.read_file("Boston_Neighborhoods.geojson").to_crs("EPSG:4326")

joined = gpd.sjoin(rodents_gdf, neighborhoods_gdf, how="left", predicate="within")
joined = joined.rename(columns={"Name": "Neighborhood"})
joined = joined.dropna(subset=["Neighborhood"])

# Widgets
neighborhood_list = sorted(joined["Neighborhood"].unique().tolist())
dropdown = pn.widgets.Select(name="Neighborhood", options=["All"] + neighborhood_list, value="All", width=300)

# Month filtering
month_list = sorted(joined["year_month"].unique().tolist())
month_slider = pn.widgets.DiscreteSlider(name="Month", options=month_list, value=month_list[-1], width=300)
month_checkbox = pn.widgets.Checkbox(name="Enable Month Filter", value=True)

# Output pane
iframe = pn.pane.HTML(sizing_mode='stretch_width', height=600)

# Create heatmap
def create_map(neighborhood, selected_month, use_month_filter):
    if use_month_filter:
        subset = joined[joined["year_month"] == selected_month]
    else:
        subset = joined

    if neighborhood != "All":
        subset = subset[subset["Neighborhood"] == neighborhood]
        selected_poly = neighborhoods_gdf[neighborhoods_gdf["Name"] == neighborhood]
        if not selected_poly.empty:
            centroid = selected_poly.geometry.centroid.iloc[0]
            center = [centroid.y, centroid.x]
            zoom = 14
        else:
            center = [42.3601, -71.0589]
            zoom = 12
    else:
        center = [42.3601, -71.0589]
        zoom = 12

    heat_data = subset[["location_y_latitude", "location_x_longitude"]].values.tolist()
    m = folium.Map(location=center, zoom_start=zoom)

    if heat_data:
        HeatMap(heat_data, radius=10).add_to(m)

    m.save("maps/temp_map.html")

# Update map
def update_map(event=None):
    create_map(dropdown.value, month_slider.value, month_checkbox.value)
    unique_id = int(time.time() * 1000)
    iframe.object = f'<iframe src="/maps/temp_map.html?{unique_id}" width="100%" height="600px" frameborder="0"></iframe>'

dropdown.param.watch(update_map, 'value')
month_slider.param.watch(update_map, 'value')
month_checkbox.param.watch(update_map, 'value')

# Initial load
update_map()

# Conditional month slider visibility
conditional_month_slider = pn.bind(lambda enabled: month_slider if enabled else pn.Spacer(height=0), month_checkbox)

# Layout
layout = pn.Column(
    pn.pane.Markdown("## Rodent Activity Heatmap"),
    pn.Row(dropdown, month_checkbox),
    conditional_month_slider,
    iframe
)

layout.servable()

# Run with:
# panel serve rodent_dashboard.py --show --static-dirs maps=maps
