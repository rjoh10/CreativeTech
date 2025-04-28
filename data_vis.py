import pandas as pd
import altair as alt
import numpy as np
import os

# Set Altair to handle larger datasets
alt.data_transformers.disable_max_rows()

# Create output directory
os.makedirs("output", exist_ok=True)

def process_rodent_data(csv_file):
    """Process the rodent data CSV file."""
    # Read the CSV file
    print(f"Reading file: {csv_file}")
    df = pd.read_csv(csv_file)
    print(f"Loaded {len(df)} records")
    
    # Convert date column to datetime
    df['open_dt'] = pd.to_datetime(df['open_dt'], errors='coerce')
    
    # Filter out invalid dates
    df = df[~df['open_dt'].isna()]
    print(f"After removing invalid dates: {len(df)} records")
    
    # Extract month and year
    df['month'] = df['open_dt'].dt.strftime('%Y-%m')
    df['year'] = df['open_dt'].dt.year
    df['month_num'] = df['open_dt'].dt.month
    
    # Extract neighborhood from location field
    def extract_neighborhood(location):
        if not isinstance(location, str):
            return 'Unknown'
        parts = location.split(',')
        if len(parts) < 2:
            return 'Unknown'
        
        second_part = parts[1].strip()
        if ' ' in second_part:
            return second_part.split(' ')[0]
        return second_part
    
    df['neighborhood'] = df['location'].apply(extract_neighborhood)
    
    # Filter out 'Unknown' neighborhoods
    df = df[df['neighborhood'] != 'Unknown']
    print(f"After removing 'Unknown' neighborhoods: {len(df)} records")
    
    # Print neighborhood counts to verify data
    neigh_counts = df['neighborhood'].value_counts()
    print(f"Top neighborhoods: {neigh_counts.head()}")
    print(f"Total unique neighborhoods: {len(neigh_counts)}")
    
    # Identify case types
    df['housing_related'] = df['case_description'].str.contains('inspection|housing', case=False, na=False) | \
                            df['closure_reason'].str.contains('inspection|housing', case=False, na=False)
    
    df['baiting_related'] = df['case_description'].str.contains('bait', case=False, na=False) | \
                           df['closure_reason'].str.contains('bait', case=False, na=False)
    
    df['environmental_related'] = df['case_description'].str.contains('trash|garbage|waste|debris', case=False, na=False) | \
                                 df['closure_reason'].str.contains('trash|garbage|waste|debris', case=False, na=False)
    
    df['health_related'] = df['case_description'].str.contains('health|disease|contamination', case=False, na=False) | \
                          df['closure_reason'].str.contains('health|disease|contamination', case=False, na=False)
    
    print(f"Housing related: {df['housing_related'].sum()} cases")
    print(f"Baiting related: {df['baiting_related'].sum()} cases")
    
    return df

def create_violations_line_chart(df):
    """Create a line chart showing violations over time by neighborhood."""
    # Group by month and neighborhood
    monthly_by_neighborhood = df.groupby(['month', 'neighborhood']).size().reset_index(name='violations')
    
    # Sort by date
    monthly_by_neighborhood['month'] = pd.to_datetime(monthly_by_neighborhood['month'])
    monthly_by_neighborhood = monthly_by_neighborhood.sort_values('month')
    
    # Get top 5 neighborhoods by total violations
    top_neighborhoods = df['neighborhood'].value_counts().nlargest(5).index.tolist()
    filtered_data = monthly_by_neighborhood[monthly_by_neighborhood['neighborhood'].isin(top_neighborhoods)]
    
    # Create chart
    chart = alt.Chart(filtered_data).mark_line(point=True).encode(
        x=alt.X('month:T', title='Month'),
        y=alt.Y('violations:Q', title='Number of Violations'),
        color=alt.Color('neighborhood:N', title='Neighborhood'),
        tooltip=['month:T', 'neighborhood:N', 'violations:Q']
    ).properties(
        title='Rodent Violations Over Time by Neighborhood',
        width=700,
        height=400
    ).interactive()
    
    return chart

def create_baiting_line_chart(df):
    """Create a line chart showing baiting activities over time."""
    # Group by month and neighborhood for baiting-related cases
    baiting_df = df[df['baiting_related']]
    monthly_baiting = baiting_df.groupby(['month', 'neighborhood']).size().reset_index(name='baitings')
    
    # Sort by date
    monthly_baiting['month'] = pd.to_datetime(monthly_baiting['month'])
    monthly_baiting = monthly_baiting.sort_values('month')
    
    # Get top 5 neighborhoods by total baitings
    top_baiting_neighborhoods = baiting_df['neighborhood'].value_counts().nlargest(5).index.tolist()
    filtered_data = monthly_baiting[monthly_baiting['neighborhood'].isin(top_baiting_neighborhoods)]
    
    # Create chart
    chart = alt.Chart(filtered_data).mark_line(point=True).encode(
        x=alt.X('month:T', title='Month'),
        y=alt.Y('baitings:Q', title='Number of Baiting Activities'),
        color=alt.Color('neighborhood:N', title='Neighborhood'),
        tooltip=['month:T', 'neighborhood:N', 'baitings:Q']
    ).properties(
        title='Proactive Baiting Over Time by Neighborhood',
        width=700,
        height=400
    ).interactive()
    
    return chart

def create_violation_types_stacked_bar(df):
    """Create a stacked bar chart of violation types."""
    # Group by month
    monthly_data = df.groupby('month').agg({
        'housing_related': 'sum',
        'environmental_related': 'sum',
        'health_related': 'sum',
        'case_reference': 'count'
    }).reset_index()
    
    monthly_data.rename(columns={'case_reference': 'total'}, inplace=True)
    
    # Calculate general violations
    monthly_data['general'] = monthly_data['total'] - monthly_data['housing_related'] - \
                             monthly_data['environmental_related'] - monthly_data['health_related']
    
    # Prepare data for stacked bar chart
    melted_data = pd.melt(
        monthly_data,
        id_vars=['month'],
        value_vars=['housing_related', 'environmental_related', 'health_related', 'general'],
        var_name='violation_type',
        value_name='count'
    )
    
    # Clean up violation type names
    melted_data['violation_type'] = melted_data['violation_type'].map({
        'housing_related': 'Housing',
        'environmental_related': 'Environmental',
        'health_related': 'Health',
        'general': 'General'
    })
    
    # Sort by date
    melted_data['month'] = pd.to_datetime(melted_data['month'])
    melted_data = melted_data.sort_values('month')
    
    # Create chart
    chart = alt.Chart(melted_data).mark_bar().encode(
        x=alt.X('month:T', title='Month'),
        y=alt.Y('count:Q', title='Number of Violations'),
        color=alt.Color('violation_type:N', title='Violation Type', scale=alt.Scale(
            domain=['Housing', 'Environmental', 'Health', 'General'],
            range=['#ff7f0e', '#2ca02c', '#9467bd', '#1f77b4']
        )),
        tooltip=['month:T', 'violation_type:N', 'count:Q']
    ).properties(
        title='Violation Types Over Time',
        width=700,
        height=400
    )
    
    return chart

def create_violation_rate_chart(df):
    """Create a line chart showing housing inspection rodent violation rates."""
    # Group by month
    monthly_data = df.groupby('month').agg({
        'housing_related': 'sum',
        'case_reference': 'count'
    }).reset_index()
    
    # Calculate violation rate
    monthly_data['violation_rate'] = (monthly_data['housing_related'] / monthly_data['case_reference']) * 100
    
    # Sort by date
    monthly_data['month'] = pd.to_datetime(monthly_data['month'])
    monthly_data = monthly_data.sort_values('month')
    
    # Create chart
    chart = alt.Chart(monthly_data).mark_line(point=True).encode(
        x=alt.X('month:T', title='Month'),
        y=alt.Y('violation_rate:Q', title='Rodent Violation Rate (%)', scale=alt.Scale(zero=False)),
        tooltip=['month:T', 'housing_related:Q', 'case_reference:Q', 
                alt.Tooltip('violation_rate:Q', format='.2f', title='Violation Rate (%)')]
    ).properties(
        title='Rate of Rodent Violations in Housing Inspections',
        width=700,
        height=400
    ).interactive()
    
    return chart

def create_neighborhood_dropdown_chart(df):
    """Create chart with neighborhood dropdown selector (without 'Unknown')."""
    # Group by month and neighborhood
    monthly_by_neighborhood = df.groupby(['month', 'neighborhood']).size().reset_index(name='violations')
    
    # Convert month to datetime for proper sorting
    monthly_by_neighborhood['month'] = pd.to_datetime(monthly_by_neighborhood['month'])
    monthly_by_neighborhood = monthly_by_neighborhood.sort_values('month')
    
    # Get unique neighborhoods for dropdown (excluding 'Unknown')
    neighborhoods = sorted(df['neighborhood'].unique().tolist())
    
    # Create input dropdown
    input_dropdown = alt.binding_select(options=['All'] + neighborhoods)
    selection = alt.param(name='Neighborhood', value='All', bind=input_dropdown)
    
    # Create base chart
    base = alt.Chart(monthly_by_neighborhood).mark_line(point=True).encode(
        x='month:T',
        y='violations:Q',
        color='neighborhood:N',
        tooltip=['month:T', 'neighborhood:N', 'violations:Q']
    ).properties(
        width=700,
        height=400,
        title='Rodent Violations by Neighborhood'
    )
    
    # Filter to create two versions - one for "All" and one for selected neighborhood
    filtered = base.transform_filter(
        (alt.datum.neighborhood == selection) | (selection == 'All')
    )
    
    # Add dropdown
    dropdown_chart = filtered.add_params(
        selection
    ).interactive()
    
    return dropdown_chart

def main():
    """Main function to run the analysis."""
    try:
        # Get correct file path
        file_path = 'rodent_cleaned.csv'
        
        df = process_rodent_data(file_path)
        
        # Create visualizations
        print("Creating visualizations...")
        violations_chart = create_violations_line_chart(df)
        baiting_chart = create_baiting_line_chart(df)
        violation_types_chart = create_violation_types_stacked_bar(df)
        violation_rate_chart = create_violation_rate_chart(df)
        neighborhood_chart = create_neighborhood_dropdown_chart(df)
        
        # Save charts to HTML files
        print("Saving visualizations...")
        violations_chart.save('output/violations_over_time.html')
        baiting_chart.save('output/proactive_baiting.html')
        violation_types_chart.save('output/violation_types.html')
        violation_rate_chart.save('output/violation_rate.html')
        neighborhood_chart.save('output/neighborhood_selector.html')
       

        print("Open the HTML files in a web browser to view the visualizations.")
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()