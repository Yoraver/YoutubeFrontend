import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

export const sampleVideos = [
  {
    _id: '1',
    videoURL: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    title: 'Big Buck Bunny - Fun Animation',
    views: 1500,
    description: 'A classic animation video featuring Big Buck Bunny.',
    user_id: {
      logoURL: 'https://via.placeholder.com/50',
      channelName: 'Animation World',
      subscribers: 5000
    },
    thumbnailURL: 'https://static-cse.canva.com/blob/1396717/1600w-wK95f3XNRaM.jpg',
    category: 'Entertainment'
  },
  {
    _id: '2',
    videoURL: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    title: 'Exploring Nature - Scenic Views',
    views: 2500,
    description: 'Beautiful scenic views of nature in 4K.',
    user_id: {
      logoURL: 'https://via.placeholder.com/50',
      channelName: 'Nature Lovers',
      subscribers: 12000
    },
    thumbnailURL: 'https://designshack.net/wp-content/uploads/youtube-thumbnail-template-1-1024x683.jpeg',
    category: 'Science'
  },
  {
    _id: '3',
    videoURL: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    title: 'Cooking Pasta - Italian Recipe',
    views: 3000,
    description: 'Learn how to cook delicious Italian pasta at home.',
    user_id: {
      logoURL: 'https://via.placeholder.com/50',
      channelName: 'Chef’s Kitchen',
      subscribers: 8000
    },
    thumbnailURL: 'https://i.ytimg.com/vi/7JXV3k4Zz8E/maxresdefault.jpg',
    category: 'Education'
  },
  {
    _id: '4',
    videoURL: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    title: 'Space Exploration - Mars Mission',
    views: 4000,
    description: 'Discover the latest updates on Mars exploration.',
    user_id: {
      logoURL: 'https://via.placeholder.com/50',
      channelName: 'Space Enthusiasts',
      subscribers: 15000
    },
    thumbnailURL: 'https://i.ytimg.com/vi/7X8II6J-6mU/maxresdefault.jpg',
    category: 'Science'
  },
  {
    _id: '5',
    videoURL: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    title: 'Guitar Tutorial - Beginner Lessons',
    views: 5000,
    description: 'Learn guitar from scratch with this beginner-friendly tutorial.',
    user_id: {
      logoURL: 'https://via.placeholder.com/50',
      channelName: 'Music Masters',
      subscribers: 20000
    },
    thumbnailURL: 'https://i.ytimg.com/vi/5qap5aO4i9A/maxresdefault.jpg',
    category: 'Music'
  },
  {
    _id: '6',
    videoURL: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    title: 'Yoga for Beginners - Morning Routine',
    views: 6000,
    description: 'Start your day with this relaxing yoga routine.',
    user_id: {
      logoURL: 'https://via.placeholder.com/50',
      channelName: 'Healthy Living',
      subscribers: 10000
    },
    thumbnailURL: 'https://i.ytimg.com/vi/9Z3R0m1e3vM/maxresdefault.jpg',
    category: 'Education'
  },
  {
    _id: '7',
    videoURL: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    title: 'Tech Review - Latest Smartphone',
    views: 7000,
    description: 'A detailed review of the latest smartphone in the market.',
    user_id: {
      logoURL: 'https://via.placeholder.com/50',
      channelName: 'Tech Guru',
      subscribers: 25000
    },
    thumbnailURL: 'https://i.ytimg.com/vi/7X8II6J-6mU/maxresdefault.jpg',
    category: 'Technology'
  },
  {
    _id: '8',
    videoURL: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    title: 'Travel Vlog - Paris Adventures',
    views: 8000,
    description: 'Explore the beautiful city of Paris in this travel vlog.',
    user_id: {
      logoURL: 'https://via.placeholder.com/50',
      channelName: 'Wanderlust',
      subscribers: 30000
    },
    thumbnailURL: 'https://i.ytimg.com/vi/9Z3R0m1e3vM/maxresdefault.jpg',
    category: 'Entertainment'
  },
  {
    _id: '9',
    videoURL: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    title: 'DIY Crafts - Home Decor Ideas',
    views: 9000,
    description: 'Creative DIY home decor ideas to spruce up your space.',
    user_id: {
      logoURL: 'https://via.placeholder.com/50',
      channelName: 'Crafty Corner',
      subscribers: 15000
    },
    thumbnailURL: 'https://i.ytimg.com/vi/5qap5aO4i9A/maxresdefault.jpg',
    category: 'Education'
  },
  {
    _id: '10',
    videoURL: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    title: 'Fitness Tips - Stay Healthy',
    views: 10000,
    description: 'Essential fitness tips to maintain a healthy lifestyle.',
    user_id: {
      logoURL: 'https://via.placeholder.com/50',
      channelName: 'Fit Life',
      subscribers: 50000
    },
    thumbnailURL: 'https://i.ytimg.com/vi/7X8II6J-6mU/maxresdefault.jpg',
    category: 'Education'
  }
];

const Home = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleVideoClick = (video) => {
    navigate('/video', { state: video });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredVideos = selectedCategory === 'All'
    ? sampleVideos
    : sampleVideos.filter(video => video.category === selectedCategory);

  return (
    <div className="home-container">
      <div className="filter-buttons">
        {['All', 'Education', 'Entertainment', 'Music', 'Science', 'Technology'].map(category => (
          <button
            key={category}
            className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="videos-list">
        {filteredVideos.map(video => (
          <div key={video._id} className="video-item" onClick={() => handleVideoClick(video)}>
            <img src={video.thumbnailURL} alt="thumbnail" />
            <div className="video-info">
              <h4>{video.title}</h4>
              <p>{video.user_id.channelName}</p>
              <p>{video.views} views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;