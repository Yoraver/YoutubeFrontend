import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="profile-container">
        <img alt="logo" src={localStorage.getItem('logoURL')} />
        <h2>{localStorage.getItem('channelName')}</h2>
      </div>
      <div className="menu-container">
        <Link to="/dashboard/home" className={location.pathname === '/dashboard/home' ? 'active-menu-link' : 'menu-link'}>
          <i className="fa-solid fa-house"></i> Home
        </Link>
        <Link to="/dashboard/my-videos" className={location.pathname === '/dashboard/my-videos' ? 'active-menu-link' : 'menu-link'}>
          <i className="fa-solid fa-video"></i> My Videos
        </Link>
        <Link to="/dashboard/upload" className={location.pathname === '/dashboard/upload' ? 'active-menu-link' : 'menu-link'}>
          <i className="fa-solid fa-upload"></i> Upload Videos
        </Link>
        <button onClick={handleLogout} className="menu-link logout-button">
          <i className="fa-solid fa-right-from-bracket"></i> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;