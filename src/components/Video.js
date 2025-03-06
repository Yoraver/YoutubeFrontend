import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import '../App.css';
import { sampleVideos } from './Dashboard/Home'; // Import sample videos
import axios from 'axios';

const Video = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [likes, setLikes] = useState(location.state.likes || 0);
    const [dislikes, setDislikes] = useState(location.state.dislikes || 0);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        console.log(location.state);
        // Fetch comments for the video
        axios.get(`https://youtubeapi-p9h2.onrender.com/comments/${location.state.user_id.token}`)
            .then(res => setComments(res.data.commentList))
            .catch(err => console.log(err));

        const likedVideos = JSON.parse(sessionStorage.getItem('likedVideos')) || [];
        const dislikedVideos = JSON.parse(sessionStorage.getItem('dislikedVideos')) || [];

        if (likedVideos.includes(location.state._id)) {
            setLikes(location.state.likes + 1);
        }

        if (dislikedVideos.includes(location.state._id)) {
            setDislikes(location.state.dislikes + 1);
        }
    }, [location.state]);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleLike = () => {
        const likedVideos = JSON.parse(sessionStorage.getItem('likedVideos')) || [];
        const dislikedVideos = JSON.parse(sessionStorage.getItem('dislikedVideos')) || [];

        if (!likedVideos.includes(location.state._id) && !dislikedVideos.includes(location.state._id)) {
            setLikes(likes + 1);
            sessionStorage.setItem('likedVideos', JSON.stringify([...likedVideos, location.state._id]));
        }
    };

    const handleDislike = () => {
        const likedVideos = JSON.parse(sessionStorage.getItem('likedVideos')) || [];
        const dislikedVideos = JSON.parse(sessionStorage.getItem('dislikedVideos')) || [];

        if (!dislikedVideos.includes(location.state._id) && !likedVideos.includes(location.state._id)) {
            setDislikes(dislikes + 1);
            sessionStorage.setItem('dislikedVideos', JSON.stringify([...dislikedVideos, location.state._id]));
        }
    };

    const handleSubscribe = () => {
        const endpoint = isSubscribed 
            ? `https://youtubeapi-p9h2.onrender.com/user/unsubscribe/${location.state.user_id._id}`
            : `https://youtubeapi-p9h2.onrender.com/user/subscribe/${location.state.user_id._id}`;

        axios.put(endpoint, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(() => {
            setIsSubscribed(!isSubscribed);
        })
        .catch(err => {
            console.log(err);
            alert('An error occurred while trying to subscribe/unsubscribe. Please try again later.');
        });
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const comment = {
            commentText: newComment
        };
        setComments([...comments, { ...comment, user: { channelName: localStorage.getItem('channelName') }, date: new Date().toLocaleString() }]);
        setNewComment('');
        // Save comment in the backend
        axios.post(`https://youtubeapi-p9h2.onrender.com/comments/new-comment/${location.state._id}`, comment, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .catch(err => console.log(err));
    };

    const handleSuggestedVideoClick = (video) => {
        navigate('/video', { state: video });
    };

    return (
        <div className='dashboard-container'>
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} />
            <div className={`content-container ${isSidebarOpen ? '' : 'full-width'}`}>
                <div className='video-page'>
                    <div className='video-container'>
                        <div className='video-and-comment'>
                            <video controls className='video-box'>
                                <source src={location.state.videoURL}></source>
                            </video>
                            <h3 className='video-title'>{location.state.title}</h3>
                            <p className='views'>{location.state.views} views</p>
                            <div className='channel-info'>
                                <img alt='logo' className='channel-logo' src={location.state.user_id.logoURL} />
                                <div>
                                    <p>{location.state.user_id.channelName}<span className='subscribers'>{location.state.user_id.subscribers} subscribers</span></p>
                                    <button className='subscribe-button' onClick={handleSubscribe}>
                                        {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
                                    </button>
                                </div>
                            </div>
                            <div className='video-actions'>
                                <button className='like-button' onClick={handleLike}>
                                    <i className="fa fa-thumbs-up"></i> {likes}
                                </button>
                                <button className='dislike-button' onClick={handleDislike}>
                                    <i className="fa fa-thumbs-down"></i> {dislikes}
                                </button>
                            </div>
                            <div className='video-description'>
                                <p>{location.state.description}</p>
                            </div>
                            <div className='comments-section'>
                                <h4>Comments</h4>
                                <form onSubmit={handleCommentSubmit}>
                                    <input
                                        type='text'
                                        placeholder='Add a comment...'
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                    />
                                    <button type='submit'>Comment</button>
                                </form>
                                <div className='comments-list'>
                                    {comments.map((comment, index) => (
                                        <div key={index} className='comment'>
                                            <p><strong>{comment.user.channelName}</strong> <span>{comment.date}</span></p>
                                            <p>{comment.commentText}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='suggested-videos'>
                        <h3>Suggested Videos</h3>
                        {sampleVideos.slice(0, 5).map(video => (
                            <div key={video._id} className='suggested-video' onClick={() => handleSuggestedVideoClick(video)}>
                                <img alt='thumbnail' src={video.thumbnailURL} />
                                <div>
                                    <p>{video.title}</p>
                                    <p>{video.user_id.channelName}</p>
                                    <p>{video.views} views</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Video;