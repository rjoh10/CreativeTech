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
            <h3>311 COMPLAINTS</h3>
            <p>
              For rat sighting, mouse sighting, signs of rodents, or conditions
              attracting rodents
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
            <h3>HEALTH INSPECTIONS</h3>
            <p>
              Initial inspections follow a 311 complaint, or are initiated
              proactively by the Health Department. Properties that fail may
              fail for active rat signs, garbage, or conditions that harbor
              rats. When a property fails an initial inspection, the owner
              receives an abatement order.
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
            <h3>HOUSING INSPECTIONS</h3>
            <p>
              Initial inspections follow a 311 complaint, or are initiated
              proactively by the Health Department. Properties that fail may
              fail for active rat signs, garbage, or conditions that harbor
              rats. When a property fails an initial inspection, the owner
              receives an abatement order.
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
              <h3>CODE ENFORCEMENT VIOLATIONS</h3>
              <p>
                Compliance inspections follow failed initial inspections, 2 to 3
                weeks after an abatement order. If a property fails a compliance
                inspection, the owner is issued a summons. A property may fail
                for active rat signs, garbage, or conditions that harbor rats.
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
              <h3>ENVIRONMENTAL VIOLATIONS</h3>
              <p>
                The Health Department may send exterminators to visit a
                property when an owner fails a compliance inspection. These may
                result in bait applied (rodenticides), or the exterminator may
                monitor the property to see if remediation is working. The owner
                is billed for this work.
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
