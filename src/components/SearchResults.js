import React from 'react';
import { useLocation } from 'react-router-dom';
import { sampleVideos } from './Dashboard/Home';
import '../App.css';

const SearchResults = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');

    const filteredVideos = sampleVideos.filter(video =>
        video.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="search-results-container">
            <h2>Search Results for "{query}"</h2>
            <div className="videos-list">
                {filteredVideos.map(video => (
                    <div key={video._id} className="video-item">
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

export default SearchResults;