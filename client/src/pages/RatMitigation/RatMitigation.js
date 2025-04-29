import React from "react";
import "./RatMitigation.css";

function RatMitigation() {
  return (
    <div className="container">
      <div className="header">
        <div className="blue-overlay">
          <h1 className="header-content">BOSTON RODENT DATA DASHBOARD</h1>
        </div>
      </div>

      <div className="content">
        <h2>Heatmap</h2>
        <p>
          The heatmap is an interactive tool designed to inform residents about
          Boston's efforts to manage and reduce rodent populations. Developed in
          collaboration with Northeastern's Scout Labs, this dashboard
          visualizes real-time rodent activity trends and showcases the city's
          proactive mitigation strategies. Powered by data from multiple
          divisions within the Inspectional Services Department (ISD) and Public
          Works, the dashboard offers clear, actionable insights into the city's
          ongoing efforts to create cleaner, safer neighborhoods across Boston.
        </p>
        <p style={{ marginBottom: "0" }}>
          Through this tool, residents can:
          <ul
            style={{
              textAlign: "left",
              listStylePosition: "outside",
              paddingLeft: "20px",
            }}
          >
            <li>
              Understand where and how rodent activity is being monitored.
            </li>
            <li>
              Learn about the city’s targeted interventions, such as enhanced
              waste management solutions and sensor-based tracking.
            </li>
            <li>
              Stay informed about the progress of Boston’s rodent mitigation
              strategies.
            </li>
          </ul>
        </p>

        <div>
          <div className="heatmap-container">
            <iframe
              src="http://localhost:5006/rodent_dashboard"
              width="100%"
              height="700"
              title="Rat Activity Dashboard"
            />
          </div>

          <div className="info-card">
            <h3>RODENT-RELATED VIOLATIONS</h3>
            <p>
              Trends in rodent-related health code violations recorded by Boston Inspectional
              Services, categorized by neighborhood and reported month. These include confirmed 
              evidence of infestation, unsanitary conditions, and other public health 
              violations.
            </p>
            <div className="iframe-wrapper">
              <iframe
                src="/rodent-charts/violations_over_time.html"
                width="100%"
                height="600"
                title="Violations Over Time"
              />
            </div>
          </div>

          <div className="info-card">
            <h3>VIOLATION TYPES FROM INSPECTIONS</h3>
            <p>
             This chart shows the volume of property violations identified during inspections by the Boston 
              Inspectional Services Department. Violations are categorized by type—such as housing, 
              environmental, health, and general issues—and color-coded to reflect their classification. 
              Inspections may result from 311 complaints or be initiated proactively by the city.
            </p>
            <div className="iframe-wrapper">
              <iframe
                src="/rodent-charts/violation_types.html"
                width="100%"
                height="600"
                title="Violations Over Time"
              />
            </div>
          </div>
          <div className="info-card">
            <h3>RODENT VIOLATION RATE IN HOUSING INSPECTIONS</h3>
            <p>
             This chart shows the percentage of housing inspections that resulted in rodent-related violations 
             each month. The rate reflects the share of total inspections that identified active signs of rodents, 
             unsanitary conditions, or contributing factors. Trends over time help assess seasonal changes and the 
             effectiveness of abatement efforts.
            </p>
            <div className="iframe-wrapper">
              <iframe
                src="/rodent-charts/violation_rate.html"
                width="100%"
                height="600"
                title="Violations Over Time"
              />
            </div>
          </div>

          <div className="bottom-section">
            <div className="info-card">
              <h3>RODENT VIOLATIONS BY NEIGHBORHOOD OVER TIME</h3>
              <p>
               This chart tracks monthly rodent-related violations across Boston neighborhoods. Each line represents 
               one neighborhood, allowing for comparison of trends and hotspots over time. Use the dropdown to focus 
               on a specific neighborhood or view all for citywide patterns.
              </p>
              <div className="iframe-wrapper">
              <iframe
                src="/rodent-charts/neighborhood_selector.html"
                width="100%"
                height="600"
                title="Neighborhood Selector"
              />
            </div>
            </div>
            <div className="info-card">
              <h3>PROACTIVE BAITING BY NEIGHBORHOOD OVER TIME</h3>
              <p>
                This chart displays the number of rodent baiting activities conducted proactively by Boston's pest control teams.
                These efforts are not triggered by complaints but are part of scheduled or targeted public health initiatives in 
                neighborhoods with known rodent issues. Trends reflect how intervention strategies vary over time and location.
              </p>
              <div className="iframe-wrapper">
              <iframe
                src="/rodent-charts/proactive_baiting.html"
                width="100%"
                height="600"
                title="Proactive Baiting Over Time"
              />
            </div>
            </div>
          </div>
          <div className="cta-container">
            <a
              href="https://www.boston.gov/departments/growboston/rodent-management#:~:text=Identifying%20a%20Problem,report%20it%20by%20calling%20311"
              target="_blank"
              rel="noopener noreferrer"
              className="rat-button"
              title="If you see a rodent and would like to report it, click here!"
            >
              🐀 Report a Rodent
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RatMitigation;
