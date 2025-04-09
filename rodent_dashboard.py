import pandas as pd
import geopandas as gpd
from shapely.geometry import Point
import folium
from folium.plugins import HeatMap
import panel as pn
import os
import time
import branca.colormap as cm
import numpy as np

# Set custom CSS for styling to match the mockup
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

# Create density grid for the entire dataset to use for normalization
# Get bounds of all data
min_lat = joined["location_y_latitude"].min()
max_lat = joined["location_y_latitude"].max()
min_lng = joined["location_x_longitude"].min()
max_lng = joined["location_x_longitude"].max()

# Create a 100x100 grid over the bounds
grid_size = 100
lat_bins = np.linspace(min_lat, max_lat, grid_size)
lng_bins = np.linspace(min_lng, max_lng, grid_size)

# Count points in each grid cell
hist_full, _, _ = np.histogram2d(
    joined["location_y_latitude"], 
    joined["location_x_longitude"], 
    bins=[lat_bins, lng_bins]
)

# Get max density value for normalization
max_density = hist_full.max()

# Custom CSS to match the mockup style
custom_css = """
<style>
body {
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
    padding: 0;
    background-color: white;
}

.header {
    background-color: #2e6da4;
    color: white;
    padding: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #245580;
}

.header h1 {
    margin: 0;
    font-size: 32px;
    font-weight: bold;
    text-transform: uppercase;
}

.control-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 12px 20px;
    margin-bottom: 20px;
}

.control-column {
    display: flex;
    flex-direction: column;
}

.widget-label {
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 14px;
    color: #333;
}

.widget-select select {
    border: 1px solid #ced4da;
    border-radius: 4px;
    padding: 6px 12px;
    font-size: 14px;
    color: #333;
    background-color: #fff;
    height: 34px;
    min-width: 200px;
}

.widget-checkbox input {
    margin-right: 8px;
}

.map-container {
    border: 1px solid #dee2e6;
    border-radius: 4px;
    overflow: hidden;
}

.divider {
    width: 1px;
    height: 30px;
    background-color: #dee2e6;
    margin: 0 20px;
}
</style>
"""

# Custom header to match mockup
header_html = """
<div class="header">
    <h1>BOSTON'S RAT MITIGATION ZONES</h1>
</div>
"""

# Add custom CSS to the page
css_pane = pn.pane.HTML(custom_css)
header_pane = pn.pane.HTML(header_html)

# Widgets
neighborhood_list = sorted(joined["Neighborhood"].unique().tolist())
dropdown = pn.widgets.Select(
    name="Neighborhood", 
    options=["All"] + neighborhood_list, 
    value="All", 
    width=200
)

# Month filtering
month_list = sorted(joined["year_month"].unique().tolist())
month_slider = pn.widgets.DiscreteSlider(
    name="Month", 
    options=month_list, 
    value=month_list[-1], 
    width=200
)

month_checkbox = pn.widgets.Checkbox(
    name="Show Time Filter", 
    value=False
)

# Output pane
iframe = pn.pane.HTML(
    sizing_mode='stretch_width', 
    height=600, 
    css_classes=['map-container']
)

# Red gradient heatmap colors
red_gradient = {
    0.0: '#ffffb2',
    0.2: '#fecc5c',
    0.4: '#fd8d3c',
    0.6: '#f03b20',
    0.8: '#bd0026',
    1.0: '#7f0000'
}

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

    # Get heat data with weights based on density
    # The weight is used to normalize the intensity values
    heat_data = []
    for _, row in subset.iterrows():
        # Get latitude and longitude
        lat = row["location_y_latitude"]
        lng = row["location_x_longitude"]
        
        # Use default weight of 1
        weight = 1.0
        
        # Add to heat data
        heat_data.append([lat, lng, weight])
    
    # Create map with monochrome style to match mockup
    m = folium.Map(
        location=center, 
        zoom_start=zoom,
        tiles='Cartodb Positron',  # Light, clean style
        dragging=True,
        scrollWheelZoom=True,
        doubleClickZoom=False
    )
    
    # Add neighborhood boundaries with black outline to match mockup style
    folium.GeoJson(
        neighborhoods_gdf,
        style_function=lambda x: {
            'fillColor': 'white' if x['properties']['Name'] != neighborhood else '#f8f9fa',
            'color': 'black',
            'weight': 1,
            'fillOpacity': 0.1 if x['properties']['Name'] != neighborhood else 0.3,
        },
        highlight=False
    ).add_to(m)
    
    if heat_data:
        # Use HeatMap with max_value parameter for normalization
        # This makes the color scale consistent across filters
        HeatMap(
            heat_data, 
            radius=12,
            blur=15,
            gradient=red_gradient,  # Red gradient for better visibility
            min_opacity=0.3,
            max_zoom=18,
            max_val=max_density  # Using the max density from the full dataset for normalization
        ).add_to(m)
        
        # Add a legend
        gradient_map = cm.LinearColormap(
            colors=[red_gradient[key] for key in sorted(red_gradient.keys())],
            vmin=0,
            vmax=100,
            caption='Rodent Activity Intensity'  # Legend title
        )
        gradient_map.add_to(m)
    
    # Add simple script to disable all click actions
    disable_clicks_js = '''
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        // Get the map container
        var mapContainer = document.querySelector('.leaflet-container');
        
        // Disable all click handlers except those for controls
        var onClick = function(e) {
            // Allow clicks on controls
            if (e.target.closest('.leaflet-control')) {
                return true;
            }
            // Prevent all other clicks
            e.stopPropagation();
            return false;
        };
        
        // Add click handler to prevent all map clicks
        mapContainer.addEventListener('click', onClick, true);
        mapContainer.addEventListener('dblclick', onClick, true);
    });
    </script>
    '''
    m.get_root().html.add_child(folium.Element(disable_clicks_js))
    
    # Add note about normalized scale
    scale_note = f'''
    <div style="position: absolute; bottom: 30px; left: 10px; z-index: 999; 
                background-color: white; padding: 5px; border-radius: 3px; 
                font-size: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.3);">
        <strong>Note:</strong> Color scale normalized to the entire dataset
    </div>
    '''
    m.get_root().html.add_child(folium.Element(scale_note))
    
    m.save("maps/temp_map.html")

# Update map
def update_map(event=None):
    create_map(dropdown.value, month_slider.value, month_checkbox.value)
    unique_id = int(time.time() * 1000)
    iframe.object = f'<iframe src="maps/temp_map.html?{unique_id}" width="100%" height="600px" frameborder="0"></iframe>'

dropdown.param.watch(update_map, 'value')
month_slider.param.watch(update_map, 'value')
month_checkbox.param.watch(update_map, 'value')

# Initial load
update_map()

# Conditional month slider visibility
conditional_month_slider = pn.bind(lambda enabled: month_slider if enabled else pn.Spacer(height=0), month_checkbox)

# Neighborhood widget with custom label
neighborhood_widget = pn.Column(
    pn.pane.Markdown("NEIGHBORHOOD", css_classes=["widget-label"]),
    dropdown
)

# Time filter widgets with custom label
time_filter_widget = pn.Column(
    pn.pane.Markdown("TIME PERIOD", css_classes=["widget-label"]),
    pn.Row(month_checkbox),
    conditional_month_slider
)

# Control container with widgets
control_container = pn.Row(
    neighborhood_widget,
    pn.pane.HTML('<div class="divider"></div>'),
    time_filter_widget,
    css_classes=["control-container"]
)

# Layout with header and controls styled to match mockup
layout = pn.Column(
    css_pane,
    header_pane,
    pn.Column(
        control_container,
        iframe,
        sizing_mode='stretch_width',
        margin=(0, 20)
    ),
    sizing_mode='stretch_width',
    margin=0
)

layout.servable()

# Run with:
# panel serve rodent_dashboard.py --show --static-dirs maps=maps
