import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyVideos = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getOwnVideo();
  }, []);

  const getOwnVideo = () => {
    axios.get('https://youtubeapi-p9h2.onrender.com/video/own-video', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        console.log(res.data);
        setVideos(res.data.videos);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleVideoClick = (video) => {
    navigate('/video', { state: { 
      videoURL: video.videoURL, 
      title: video.title, 
      views: video.views, 
      description: video.description, 
      user_id: {
        logoURL: video.user_id.logoURL,
        channelName: video.user_id.channelName,
        subscribers: video.user_id.subscribers
      } 
    }});
  };

  return (
    <div className='my-videos-container'>
      <table className='videos-table'>
        <thead>
          <tr>
            <th>Video</th>
            <th>Title</th>
            <th>Date</th>
            <th>Views</th>
            <th>Like vs Dislike</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {videos.map(video => (
            <tr key={video._id} onClick={() => handleVideoClick(video)}>
              <td><img alt='thumbnail' src={video.thumbnailURL} /></td>
              <td>{video.title}</td>
              <td>{new Date(video.createdAt).toLocaleDateString()}</td>
              <td>{video.views}</td>
              <td>{video.likes} / {video.dislike}</td>
              <td><button>Delete</button></td>
              <td><button>Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyVideos;