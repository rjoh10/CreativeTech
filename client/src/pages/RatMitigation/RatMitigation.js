import React from 'react';
import { Link } from "react-router-dom";
import "./RatMitigation.css";


function RatMitigation() {
  return (
    <div className='container'>
      {/* Header with Overlay */}
      <div className='header'>
        <div className='blue-overlay'> 
        <h1 className='header-content'>BOSTON'S RAT MITIGATION ZONES</h1>
        </div>
      </div>


      {/* Content Section */}
      <div className='content'>
        <h2>LOREM IPSUM</h2>
        <p>
        Lorem ipsum odor amet, consectetuer adipiscing elit. Mi habitant mi
        maximus quis nulla pretium; fames curae. In at maximus varius
        ridiculus vestibulum vel elementum imperdiet. Ex at laoreet odio; nisi
        hendrerit cursus non. Elit phasellus curabitur ultricies est morbi
        hendrerit. Mus at maecenas habitant aenean dictumst ridiculus in arcu.
        Eros montes euismod per ut fames justo porttitor.
        </p>

        {/*Grid Layout*/}
        <div className='grid-layout'>
          {/* Image */}
          <div className='image-place'>
            <img src='/assets/boston.png' alt='Boston Map'/>
          </div> 

          {/* Right Portion */}
          <div className='right-section'>
            <div className='info-card'>
            <h3>311 COMPLAINTS</h3>
            <p> 
              For rat sighting, mouse sighting, signs of rodents, or conditions attracting rodents
            </p>
            </div>
            <div className='info-card'>
              <h3>HEALTH INSPECTIONS</h3>
              <p> 
              Initial inspections follow a 311 complaint, or are initiated proactively by the Health Department.
              Properties that fail may fail for active rat signs, garbage, or conditions that harbor rats. 
              When a property fails an initial inspection, the owner receives an abatement order.
              </p>
            </div>
            <div className='info-card'>
              <h3>HOUSING INSPECTIONS</h3>
              <p>
              Initial inspections follow a 311 complaint, or are initiated proactively by the Health Department.
              Properties that fail may fail for active rat signs, garbage, or conditions that harbor rats.
              When a property fails an initial inspection, the owner receives an abatement order.
              </p>
            </div>
          </div>

          {/* Bottom Section  */}
          <div className='bottom-section'>
            <div className='info-card'>
              <h3>CODE ENFORCEMENT VIOLATIONS</h3>
              <p>
              Compliance inspections follow failed initial inspections, 2 to 3 weeks after an abatement order. 
              If a property fails a compliance inspection, the owner is issued a summons. A property may fail for active rat signs, garbage, or conditions that harbor rats.
              </p>
            </div>
            <div className='info-card'>
              <h3>ENVIRONMENTAL VIOLATIONS</h3>
              <p>
              The Health Department may send exterminators to visit a property when an owner fails a compliance inspection.
              These may result in bait applied (rodenticides), or the exterminator may monitor the property to see if remediation is working. 
              The owner is billed for this work.
              </p>

            </div>
          </div>

          {/* BRAP */}
          <div className='BRAP-section'>
            <div className='info-card'>
              <h3>BRAP PROGRESS</h3>
              <p>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Suscipit cras dis pretium posuere leo curae potenti. 
              Cursus aliquet penatibus potenti, primis ipsum maecenas augue non. Litora congue fringilla magna tincidunt nostra augue.
              </p>
              <div className='circle-graph'>
                <svg width= "100" height= "100">
                  <circle cx="50" cy="50" r="40" stroke="lightgray" strokeWidth="8" fill="none"/>
                  <circle cx="50" cy="50" r="40" stroke="blue" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset="75"/>
                  <text x="50" y="55" textAnchor="middle" fontSize="16" fill="black">70%</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RatMitigation;
