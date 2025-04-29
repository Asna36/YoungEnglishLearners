import React from 'react';
import { Link } from 'react-router-dom';
import {
    LuLayoutDashboard,
    LuBook,
    LuCalendarDays,
    LuUsers,
    LuUser
} from "react-icons/lu";
import './DashboardPage.css'; 

const UPGRADE_BADGE_IMG = 'Medal.png';
const DashboardIcon = LuLayoutDashboard;
const ClassIcon = LuBook;
const CalendarIcon = LuCalendarDays;
const PeopleIcon = LuUsers;
const ProfileIcon = LuUser;

const Sidebar = ({ activeLink }) => {
    const isLinkActive = (linkName) => activeLink === linkName;

    return (
        <aside className="sidebar">
            
            <div className="sidebar-header">
                
                <div className="sidebar-logo-text">
                <div className="profile-section">
        <img src="/young.png" alt="Profile" className="profile-icon" />
        
      </div>
                </div>
                
                <hr className="sidebar-header-divider" />
            </div>
            

            <nav className="sidebar-nav">
                 <ul>
                    <li className={isLinkActive('dashboard') ? 'active' : ''}><Link to="/dashboard"><span className="nav-icon"><DashboardIcon /></span> Dashboard</Link></li>
                    <li className={isLinkActive('home') ? 'active' : ''}><Link to="/home"><span className="nav-icon"><ClassIcon /></span> My class</Link></li>
                    <li className={isLinkActive('upcoming') ? 'active' : ''}><Link to="/upcoming-class"><span className="nav-icon"><CalendarIcon /></span> Upcoming class</Link></li>
                    <li className={isLinkActive('instructors') ? 'active' : ''}><Link to="#"><span className="nav-icon"><PeopleIcon /></span> Instructors</Link></li>
                    <li className={isLinkActive('profile') ? 'active' : ''}><Link to="#"><span className="nav-icon"><ProfileIcon /></span> Profile</Link></li>
                </ul>
            </nav>

            
            <div className="sidebar-upgrade">
                 <img src={UPGRADE_BADGE_IMG} alt="Pro Badge" className="upgrade-badge" />
                <p className="upgrade-title">Upgrade your Account to Pro</p>
                <p className="upgrade-text">Upgrade to premium to get premium features</p>
                <button className="upgrade-button">Upgrade</button>
            </div>
        </aside>
    );
};

export default Sidebar;