import React from 'react';
import Brightness1Icon from '@mui/icons-material/Brightness1';

function Todo(props) {

    var cn = "";
    var styl = "";
    console.log("status");
    console.log(props.status);
    if (props.status === "OVERDUE") {
        cn = "overdue";
        styl = "red";
    }
    else if (props.status === "UNCOMPLETE") {
        cn = "uncomplete";
        styl = "blue";
    }
    else {
        cn = "complete";
        styl = "green";
    }

    const markComplete = () => {
        cn = "complete";
        styl = "green";
    }

  return (
    <div className={'todo ' + cn}>
        <button onClick={markComplete}>
            <Brightness1Icon className={`indicator ${cn}`} style={{ color: styl }} />
        </button>
        <p className={`todotext ${cn}`}>{props.text}</p>
    </div>
  )
}

export default Todo