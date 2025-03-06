import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './components/Dashboard/Home';
import Video from './components/Video';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import MyVideos from './components/Dashboard/MyVideos';
import Upload from './components/Dashboard/Upload';
import SearchResults from './components/SearchResults';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Navigate to="/signup" />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/video" element={<Video />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route path="home" element={<Home />} />
                        <Route path="upload" element={<Upload />} />
                        <Route path="my-videos" element={<MyVideos />} />
                    </Route>
                </Routes>
                <ToastContainer />
            </div>
        </Router>
    );
}

export default App;
