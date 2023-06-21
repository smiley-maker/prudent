import './App.css';
import React, {useContext} from "react";
import Home from './pages/Home';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import NewUser from './pages/NewUser';
import AddTodoForm from './pages/AddTodo';
import TodoCard from './components/todoCard/TodoCard';
import Conferences from './components/Conferences';
import Table from './components/Table/Table';
import AddConference from './pages/AddConference';
import Sidebar from './components/Sidebar/Sidebar';

function App() {

  const {currentUser} = useContext(AuthContext);

  const RequireAuth = ({children}) => {
    return currentUser ? (children) : <Navigate to="/login" />
  }

  console.log(currentUser);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<NewUser/>}/>
          <Route path='/todos' element={<TodoCard/>}/>
          <Route path="/addconf" element={<AddConference />}/>
          <Route path="/favorites" element={<Conferences />} />
          <Route path="/allConfs" element={<Table />} />
          <Route path="/newtodo" element={<AddTodoForm />}/>
          <Route path='/' element={
            <RequireAuth>
              <Home/>
            </RequireAuth>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
