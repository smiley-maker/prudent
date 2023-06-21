import React, { useState, useContext, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firestore';
import { AuthContext } from '../context/AuthContext';

function AddTodoForm() {
  const [todoText, setTodoText] = useState('');
  const [todoDate, setTodoDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);

  const { currentUser } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleTodoDateInputChange = (e) => {
    setTodoDate(e.target.value);
  };

  useEffect(() => {
    setCurrentDate(new Date().toISOString().split('T')[0]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (todoText.trim() === '') {
      return;
    }

    try {
      const todoData = {
        text: todoText,
        date: todoDate,
        state: isDatePast(todoDate) ? 'OVERDUE' : 'UNCOMPLETE',
        timestamp: serverTimestamp(),
      };

      const userTodosRef = collection(db, 'users', currentUser.uid, 'todos');
      await addDoc(userTodosRef, todoData);

      setTodoText('');
      setTodoDate(new Date().toISOString().split('T')[0]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const isDatePast = (date) => {
    const currentDateObj = new Date(currentDate);
    const todoDateObj = new Date(date);

    return todoDateObj < currentDateObj;
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
      <input
        className='login-input'
        type="date"
        placeholder="Enter a deadline for your todo"
        value={todoDate}
        onChange={handleTodoDateInputChange}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default AddTodoForm;
