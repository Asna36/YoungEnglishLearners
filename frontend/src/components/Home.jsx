import React from 'react';
import Sidebar from './Sidebar'; 
import './DashboardPage.css'; 
import { useState,useEffect,useRef } from "react";
import { FaSearch, FaRegBell } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom';
const BANNER_BG_IMG = '/Frame (2).png';       
const WELCOME_BEAR_IMG = '/beargif.gif';        
const CONGRATS_BADGE_IMG = '/congrats.png';   
const NOUNS_BG_IMG = '/nouns (2).png';    
const STATEMENTS_BG_IMG = '/statement.png'; 
const SPELLINGS_BG_IMG = '/spelling.png';   
const COMPREHENSION_BG_IMG = '/comp.png';   
const FOOTER_IMG = '/Group 21.png';      
const USER_AVATAR_IMG = '/avatar1.png';      

const SearchIcon = FaSearch;
const BellIcon = FaRegBell;
const ArrowDownIcon = IoIosArrowDown;
const OptionsIcon = () => <span>[...]</span>; 


const Home = () => {
     const [username, setUsername] = useState('');
        
          useEffect(() => {
            const storedUsername = localStorage.getItem('username');
            if (storedUsername) {
              setUsername(storedUsername);
            }
          }, []);
    

    return (
        
        <div className="dashboard-page font-sassoon">
            <Sidebar activeLink="home" /> 

            <main className="dashboard-main-content">
                
                <header className="dashboard-header">
                    <h1 className="header-title">My Class</h1>
                    <div className="header-actions">
                        <button className="icon-button"><SearchIcon /></button>
                        <button className="icon-button"><BellIcon /></button>
                        <div className="user-info">
                            <img src={USER_AVATAR_IMG} alt="User Avatar" className="user-avatar" />
                            <span className="user-name">{username.toUpperCase() || "Guest"}</span>
                            <button className="icon-button small"><ArrowDownIcon /></button>
                        </div>
                    </div>
                </header>

                
                <div className="dashboard-grid">

                <section className="my-classes-section">
                        <h2 className="section-title">My Classes</h2>
                        <div className="classes-grid">
                            
                            <div className="class-card nouns">
                            <Link to="/nouns"> <img src={NOUNS_BG_IMG} alt="Nouns activity background" className="class-card-bg" /></Link>
                                
                            </div>
                            <div className="class-card statements">
                            <Link to="/statements">    <img src={STATEMENTS_BG_IMG} alt="Statements activity background" className="class-card-bg" /></Link>
                                
                            </div>
                            <div className="class-card spellings">
                                <img src={SPELLINGS_BG_IMG} alt="Spellings activity background" className="class-card-bg" />
                                
                            </div>
                            <div className="class-card comprehension">
                                <img src={COMPREHENSION_BG_IMG} alt="Comprehension activity background" className="class-card-bg" />
                                
                            </div>
                        </div>
                    </section>

         
                  

                    
                    
                    
                    
                 </div> 

                 
                 <footer className="dashboard-footer">
                    <img src='footer.png' alt="Footer Decoration" />
                </footer>
            </main>
        </div>
    );
};

export default Home;