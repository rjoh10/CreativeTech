import React from "react";
import { Link } from "react-router-dom";
import "./ActionPlan.css";

function ActionPlan() {
  return (
    <div className="container">
      <div className="header">
        <div className="blue-overlay"></div>
        <h1 className="header-content">BOSTON'S RODENT ACTION PLAN</h1>
      </div>

      <div className="center-box">
        <Link to="/rat-mitigation">
          <button className="learn-more-btn">LEARN MORE</button>
        </Link>
        <div className="inner-box">
          <p>
            The <strong>BRAP</strong> will serve as a powerful tool to connect
            residents with this data, enabling them to see Boston's ongoing
            efforts in action. By promoting transparency and empowering
            residents with actionable insights, the dashboard will strengthen
            public trust and encourage collective participation in Boston’s
            broader mission to create cleaner, safer communities.
          </p>
        </div>
      </div>

      <div className="content">
        <h2>BRAP STORY: BOSTON'S COMMITMENT TO RODENT MITIGATION</h2>
        <p>
          Boston's dense urban landscape presents unique challenges in managing
          rodent populations. The Boston Rodent Action Plan (BRAP) was launched
          to address these challenges through a comprehensive and sustainable
          strategy. Boston’s BRAP initiative integrates data, technology, and
          community engagement to tackle rodent issues more effectively.
        </p>
        <p>
          In 2024, Boston conducted an extensive evaluation of its rodent
          management strategies, waste collection practices, and public
          outreach efforts.
        </p>

        <h2 style={{ borderBottom: "5px solid black", paddingBottom: "5px" }}>
          KEY INTERVENTIONS
        </h2>

        <ul style={{ textAlign: "left", listStylePosition: "outside", paddingLeft: "20px" }}>
          <li>
            <strong>Redesigned Waste Bins:</strong> In areas like Boston Common
            and the <a href="https://www.northendboston.com/" target="_blank" rel="noopener noreferrer">North End</a>,
            traditional trash bins have been replaced with redesigned models that make it harder for rodents to reach food waste—reducing one of the most common rodent attractants.
          </li>
          <li>
            <strong>Sensor Deployment:</strong> Approximately 275 sensors will
            be installed across strategic locations to measure rodent activity
            accurately. These sensors will provide invaluable insights by
            establishing baseline population metrics and tracking the impact of
            mitigation efforts.
          </li>
          <li>
            <strong>Participatory Budgeting Win:</strong> In the latest
            Participatory Budgeting cycle, Rodent Prevention Initiatives
            received the second highest vote tally citywide. As a result,
            Boston will receive $500,000 to implement changes to waste
            management at BHA sites.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ActionPlan;
