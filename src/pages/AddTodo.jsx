import React, { useState, useContext } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firestore';
import { AuthContext } from '../context/AuthContext';

function AddTodoForm() {
  const [todoText, setTodoText] = useState('');

  const { currentUser } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (todoText.trim() === '') {
      return;
    }

    try {
      const todoData = {
        text: todoText,
        state: "TODO",
        timestamp: serverTimestamp(),
      };

      const userTodosRef = collection(db, 'users', currentUser.uid, 'todos');
      await addDoc(userTodosRef, todoData);

      setTodoText('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <input
        className='login-input'
        type="text"
        placeholder="Enter a todo"
        value={todoText}
        onChange={handleInputChange}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default AddTodoForm;
