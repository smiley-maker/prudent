import React from 'react'

function ConferenceCard(props) {
  return (
    <div className="conference-card">
        <h4>{props.acronym}</h4>
        <p>{props.dateRange}</p>
    </div>
  )
}

export default ConferenceCard