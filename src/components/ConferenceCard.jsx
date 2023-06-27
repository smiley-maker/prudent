import React from 'react'

function ConferenceCard(props) {
  return (
    <div className="conference-card">
        <h5 className='text-center'>{props.acronym}</h5>
        <h8 className="text center">{props.dateRange}</h8>
    </div>
  )
}

export default ConferenceCard