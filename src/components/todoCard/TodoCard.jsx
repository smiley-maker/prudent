import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../firestore';
import Todo from '../todo/Todo';

function TodoCard() {
    const { currentUser } = useContext(AuthContext);

    const [todos, setTodos] = useState([])

    useEffect(() => {
        onSnapshot(collection(db, "users", currentUser.uid, "todos"), (snapshot) => {
            setTodos(snapshot.docs.map((doc) => doc.data()));
        })
    }, [currentUser]);

  return (
    <div className='todo-card'>
        <div className="card-content">
            <h4 className="card-heading">
                Daily Todos
            </h4>
            {todos.map((todo) => (
                <Todo key={todo.timestamp} text={todo.text} status={todo.state} />
            ))}
        </div>
    </div>
  )
}

export default TodoCard