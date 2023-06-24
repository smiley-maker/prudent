import React from 'react'

function ConferenceCard(props) {
  return (
    <div className="conference-card">
        <h6>{props.acronym}</h6>
        <p>{props.dateRange}</p>
    </div>
  )
}

export default ConferenceCard