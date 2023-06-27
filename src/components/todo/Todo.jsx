import React, { useContext } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firestore';
import * as BsIcons from 'react-icons/bs';
import { AuthContext } from '../../context/AuthContext';
import './todo.css';

function Todo({ todo }) {
  const { currentUser } = useContext(AuthContext);

  const update = async () => {
    const stateMapping = {
      TODO: 'DOING',
      DOING: 'COMPLETE',
      COMPLETE: 'TODO',
    };

    const nextState = stateMapping[todo.state];

    const todoRef = doc(db, 'users', currentUser.uid, 'todos', todo.id);
    await updateDoc(todoRef, { state: nextState });
  };

  const stateColors = {
    TODO: ['var(--primary-accent)', 'var(--darker)', 'none'],
    DOING: ['var(--secondary-accent)', 'var(--darker)', 'none'],
    COMPLETE: ['var(--secondary-accent)', 'var(--primary-accent)', 'line-through'],
  };

  const cn = todo.state.toLowerCase();
  const col = stateColors[todo.state][0];
  const background = stateColors[todo.state][1];
  const fontStyle = stateColors[todo.state][2];

  return (
    <div className={`todo-wrapper }`}>
      <button className="todo" onClick={update} style={{ background: background }} >
        <BsIcons.BsCircleFill className={`indicator`} style={{ color: col }} />
        <p className={`todotext `} style={{ 'text-decoration': fontStyle }} >{todo.text}</p>
      </button>
    </div>
  );
}



export default Todo;
