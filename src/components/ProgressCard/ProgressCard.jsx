import React from 'react'
import "./progresscard.css"
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"

function ProgressCard() {
  return (
    <div className='todo-card'>
        <div className="card-content">
            <CircularProgressbar text='2 Months' value={70}  />
        </div>
    </div>
  )
}

export default ProgressCard