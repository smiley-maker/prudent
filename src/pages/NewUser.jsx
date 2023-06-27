import React, { useState, useContext, useEffect } from 'react'
import { auth, db, storage } from '../firestore';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { userInputs } from '../registration-inputs';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';

function NewUser() {

    const [data, setData] = useState({});
    const [file, setFile] = useState("");
    const [per, setPer] = useState(null);

    useEffect(() => {
        const uploadFile = () => {
            const uniqueName = new Date().getTime() + file.name;
            const storageRef = ref(storage, uniqueName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setPer(progress);
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.log(error);
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setData((prev) => ({...prev, img: downloadURL}))
                    });
                }
            );
        }
        file && uploadFile();
    }, [file]);

    const navigate = useNavigate()

    const { dispatch } = useContext(AuthContext);

    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setData({ ...data, [id]: value });
    };

    const handleAdd = async (e) => {
        e.preventDefault();

        try {
            const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await setDoc(doc(db, "users", res.user.uid), { ...data, timestamp: serverTimestamp() });
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="register-page">
            <h1 className='w-40 text-centered'>Hi! Welcome to the Conference Collective!</h1>
            <h5>Sign up below to get started!</h5>
            <form className="login-form" onSubmit={handleAdd}>
                {userInputs.map((uinput) => (
                    <input
                        id={uinput.id}
                        type={uinput.type}
                        className="login-input"
                        placeholder={uinput.placeholder}
                        onChange={handleInput}
                        key={uinput.id} // Don't forget to add a unique key for each element in the map loop
                    />
                ))}
                <div className="form-group">
                    <label htmlFor='file' className='copy-lg bold text-center'>
                        <DriveFolderUploadOutlinedIcon /> Upload a profile image...
                    </label>
                    <input type='file' id="file" onChange={(e) => setFile(e.target.files[0])} style={{ display: 'none' }} />
                </div>

                <button disabled={per != null && per < 100} type="submit" className="logout">
                    Sign Up!
                </button>
            </form>
            <hr className='divider'/>
            <Link to="/login"><p className="switchpage">already have an account? <em>login now!</em></p></Link>
        </div>
    )
}

export default NewUser