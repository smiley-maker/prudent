import React from 'react';
import "./AdditionalInfo.css";

function AdditionalInfo({conf}) {
  return (
    <div className='more-info-wrapper'>
        <p className="copy-reg w-30">{conf.conferenceDescription}</p>
        <div className="related-dates">
            {Object.keys(conf.relevantDates).map((key, index) => {
                return (
                    <div key={index} className="related-date">
                        <h6>{conf.relevantDates[key]}</h6>
                        <p className="copy-sm">{key}</p>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default AdditionalInfo