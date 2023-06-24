import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../firestore';
import Todo from '../todo/Todo';

function TodoCard() {
    const { currentUser } = useContext(AuthContext);

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, 'users', currentUser.uid, 'todos'),
            (snapshot) => {
                const todosData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTodos(todosData);
            }
        );

        return () => {
            unsubscribe();
        };
    }, [currentUser]);

    return (
        <div className="todo-card">
            <div className="card-content">
                <h4 className="card-heading">Daily Todos</h4>
                {todos.map((todo) => (
                    <Todo key={todo.id} todo={todo} />
                ))}
            </div>
        </div>
    );
}

export default TodoCard;
