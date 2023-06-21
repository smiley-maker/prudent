import React, { useState, useContext } from 'react'
import { auth } from '../firestore';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
    const [error, setError] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const { dispatch } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                dispatch({ type: "LOGIN", payload: user });
                setEmail("");
                setPassword("");
                navigate("/");
                // ...
            })
            .catch((error) => {
                //          const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                setError(true);
            });
    }


    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleLogin}>
                <input type="email" required placeholder='enter your email...' className="login-input" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" required placeholder='and password' className="login-input" onChange={(e) => setPassword(e.target.value)} />
                <button className="login-button" type='submit'>login</button>
                {error && <span className="error-message">Wrong email or password.</span>}
            </form>
            <Link to="/register"><p className="switchpage">Don't have an account? Click here to register!</p></Link>

        </div>
    )
}

export default Login