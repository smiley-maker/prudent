import React, { useContext } from 'react';

import Brightness1Icon from '@mui/icons-material/Brightness1';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firestore';
import * as BsIcons from "react-icons/bs"
import { AuthContext } from '../../context/AuthContext';
import "./todo.css";


function Todo({ todo }) {

    const { currentUser } = useContext(AuthContext);
    console.log("Todo");
    console.log(todo);
    
const update = async (stat) => {
    const todoRef = doc(db, 'users', currentUser.uid, 'todos', todo.id);
    console.log("Todo Ref:", todoRef);

//    console.log("Todo Ref");
  //  console.log(todoRef);
    await updateDoc(todoRef, { state: stat });
  };
  
  var cn = "";
  var styl = "";
  console.log("status");
  console.log(todo.state);
  if (todo.state === "TODO") {
    cn = "overdue";
    styl = "red";
  } else if (todo.state === "DOING") {
    cn = "uncomplete";
    styl = "blue";
  } else {
    cn = "complete";
    styl = "green";
  }
      const markComplete = () => {
        update("COMPLETE");
    }


  return (
    <div className={'todo-wrapper ' + cn}>
        <button className='todo' onClick={() => update("COMPLETE")}>
            <BsIcons.BsCircle className={`indicator ${cn}`} style={{ color: styl }} />
            <p className={`todotext ${cn}`}>{todo.text}</p>
        </button>
    </div>
  )
}

export default Todo