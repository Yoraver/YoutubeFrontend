import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../App.css';
import { toast } from "react-toastify";

const Signup = () => {
    const [channelName, setChannelName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [logo, setLogo] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fileHandler = (e) => {
        console.log(e.target.files[0]);
        setLogo(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('channelName', channelName);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('password', password);
        formData.append('logo', logo);

        axios.post('https://youtubeapi-p9h2.onrender.com/user/signup', formData)
            .then(res => {
                setLoading(false);
                navigate('/login');
                console.log(res.data);
                toast("Account is created..")
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
                toast.error(err.response.data.error);
            });
    };

    return (
        <div className='main-wrapper'>
            <div className="wrapper-header">
                <img className="logo-image" alt='logo' src={require('../assets/youtubelogo.png')} />
                <h2 className="c-name">YouTube</h2>
            </div>
                <form className='form-wrapper' onSubmit={submitHandler}>
                    <input required onChange={(e) => { setChannelName(e.target.value) }} type="text" placeholder="Channel/User Name" />
                    <input required onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="Email" />
                    <input required onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="Password" />
                    <input required onChange={(e) => { setPhone(e.target.value) }} type="text" placeholder="Phone" />
                    <input required onChange={fileHandler} type="file" />
                    {imageUrl && <img className="preview-image" alt='logo-image' src={imageUrl} />}
                    <button type="submit"> {isLoading && <i className="fa-solid fa-cog fa-spin fa-spin-reverse"></i>}Submit</button>

                    <Link to='/login' className="link">Login with your account</Link>
                </form>
        </div>
    );
};

export default Signup;