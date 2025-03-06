import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../App.css';
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);

    const navigate = useNavigate();


    const submitHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        

        axios.post('https://youtubeapi-p9h2.onrender.com/user/login', {
            email: email,
            password: password
        })
            .then(res => {
                setLoading(false);
                console.log(res.data);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', res.data._id);
                localStorage.setItem('channelName',res.data.channelName)
                localStorage.setItem('logoURL',res.data.logoURL)
                navigate('/dashboard/home');
                toast('Welcome to YouTube');
            })
            .catch(err => {
              setLoading(false);
              if (err.response && err.response.data && err.response.data.error) {
                  console.log(err.response.data.error);
                  toast.error(err.response.data.error);
              } else {
                  console.log(err.message);
                  toast.error('Please check the password');
              }
          });
    };

    return (
        <div className='main-wrapper'>
            <div className="wrapper-header">
                <img className="logo-image" alt='logo' src={require('../assets/youtubelogo.png')} />
                <h2 className="c-name">YouTube</h2>
            </div>
                <form className='form-wrapper' onSubmit={submitHandler}>
                    <input required onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="Email" />
                    <input required onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="Password" />
                    <button type="submit"> {isLoading && <i className="fa-solid fa-cog fa-spin fa-spin-reverse"></i>}Submit</button>

                    <Link to='/signup' className="link">Create your account</Link>
                </form>
        </div>
    );
};

export default Login;