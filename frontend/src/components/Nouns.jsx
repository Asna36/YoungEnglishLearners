import React from 'react';
import Sidebar from './Sidebar'; 
import './DashboardPage.css'; 
import { useState,useEffect,useRef,useCallback } from "react";
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


const Nouns = () => {
     const [username, setUsername] = useState('');
     const [showOverlay, setShowOverlay] = useState(true);
     const [isPlaying, setIsPlaying] = useState(false);
     const [progress, setProgress] = useState(0);
     const [greetingAudio, setGreetingAudio] = useState(null);
     const videoRef = useRef(null);
     const audioRef = useRef(null);
   
     const handleSpacePress = useCallback((event) => {
        if (event.code === 'Space' && !event.repeat && 
            !(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement)) {
          event.preventDefault(); // Prevent page scroll
          if (videoRef.current) {
            if (isPlaying) {
              videoRef.current.pause();
              if (audioRef.current) {
                audioRef.current.pause();
              }
            } else {
              videoRef.current.play();
              setShowOverlay(false);
              
              // Play greeting audio after 0.15 seconds if video is at start
              if (videoRef.current.currentTime < 0.1 && greetingAudio) {
                const audio = new Audio(greetingAudio);
                audioRef.current = audio;
                setTimeout(() => {
                  audio.play().catch(error => {
                    console.error('Error playing audio:', error);
                  });
                }, 150);
              }
            }
            setIsPlaying(!isPlaying);
          }
        }
      }, [isPlaying, greetingAudio]);
          useEffect(() => {
            const storedUsername = localStorage.getItem('username');
            if (storedUsername) {
              setUsername(storedUsername);
            }
          }, []);
          useEffect(() => {
            const storedUsername = localStorage.getItem('username');
            if (storedUsername) {
              setUsername(storedUsername);
              generateGreeting(storedUsername);
            }
        
            // Add keyboard event listener for spacebar
            window.addEventListener('keydown', handleSpacePress);
        
            // Cleanup listener on component unmount
            return () => {
              window.removeEventListener('keydown', handleSpacePress);
            };
          }, [handleSpacePress]);
        
          const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        
          const generateGreeting = async (name, retryCount = 0) => {
            console.log('Generating greeting for:', name, 'attempt:', retryCount + 1);
            try {
              // Using Bill's voice
              const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/pqHfZKP75CvOlQylNhV4', {
                method: 'POST',
                headers: {
                  'Accept': 'audio/mpeg',
                  'Content-Type': 'application/json',
                  'xi-api-key': 'sk_4a0236e78e6c2c8044605ca65211a5bca73c439c728db85f'
                },
                body: JSON.stringify({
                  text: `Hello!! ${name}!!`,
                  model_id: 'eleven_monolingual_v1',
                  voice_settings: {
                    stability: 0.4,
                    similarity_boost: 0.5
                  }
                })
              });
        
              console.log('API Response status:', response.status);
        
              if (response.status === 429 && retryCount < 3) {
                // If too many requests and haven't retried 3 times yet
                console.log('Too many requests, retrying after delay...');
                await sleep(2000 * (retryCount + 1)); // Exponential backoff
                return generateGreeting(name, retryCount + 1);
              }
        
              if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to generate audio: ${errorText}`);
              }
        
              const arrayBuffer = await response.arrayBuffer();
              const audioBlob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
              const audioUrl = URL.createObjectURL(audioBlob);
              console.log('Audio URL created:', audioUrl);
              setGreetingAudio(audioUrl);
            } catch (error) {
              console.error('Error generating greeting:', error);
              if (error.message.includes('too_many_concurrent_requests') && retryCount < 3) {
                console.log('Retrying after error...');
                await sleep(2000 * (retryCount + 1));
                return generateGreeting(name, retryCount + 1);
              }
            }
          };
          const handlePlayClick = () => {
            if (videoRef.current) {
              if (isPlaying) {
                videoRef.current.pause();
              } else {
                videoRef.current.play();
                setShowOverlay(false);
                
                // Play greeting audio after 0.15 seconds
                if (greetingAudio) {
                  console.log('Playing greeting audio:', greetingAudio);
                  const audio = new Audio(greetingAudio);
                  audioRef.current = audio;
                  
                  audio.onerror = (e) => {
                    console.error('Audio playback error:', e);
                  };
                  
                  setTimeout(() => {
                    audio.play().catch(error => {
                      console.error('Error playing audio:', error);
                    });
                  }, 150); // 0.15 seconds
                } else {
                  console.log('No greeting audio available');
                }
              }
              setIsPlaying(!isPlaying);
            }
          };
            
          const handleVideoEnd = () => {
            setIsPlaying(false);
            setShowOverlay(true);
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
            }
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }
          };
        
          const handleTimeUpdate = () => {
            if (videoRef.current) {
              const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
              setProgress(progress);
            }
          };
        
          const handleProgressClick = (e) => {
            if (videoRef.current) {
              const progressBar = e.currentTarget;
              const clickPosition = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
              videoRef.current.currentTime = clickPosition * videoRef.current.duration;
            }
          };
        
          const handleForward = () => {
            if (videoRef.current) {
              videoRef.current.currentTime += 10;
            }
          };
        
          const handleRewind = () => {
            if (videoRef.current) {
              videoRef.current.currentTime -= 10;
            }
          };
        
          const toggleFullScreen = () => {
            if (videoRef.current) {
              if (document.fullscreenElement) {
                document.exitFullscreen();
              } else {
                videoRef.current.requestFullscreen();
              }
            }
          };
            
          
         
        

    return (
        
        <div className="dashboard-page font-sassoon">
            <Sidebar activeLink="home" /> 

            <main className="dashboard-main-content">
                
                <header className="dashboard-header1">
                    
                <div className="header-wrapper">
  <img src="/Resultframe.jpg" alt="Header Background" className="header-bg" />

  <div className="header-actions1">
    <button className="icon-button"><SearchIcon /></button>
    <button className="icon-button"><BellIcon /></button>
    
    <div className="user-info">
      <img src={USER_AVATAR_IMG} alt="User Avatar" className="user-avatar" />
      <span className="user-name">{username.toUpperCase() || "Guest"}</span>
      <button className="icon-button small"><ArrowDownIcon /></button>
    </div>
  </div>
</div>

                </header>

                <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Bakbak+One&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Sen:wght@800&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Comic+Neue&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap');

          .quiz-footer {
            margin-top: 0px;
            padding-top:0px;
          }
          .dashboard-header1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem; 
    flex-shrink: 0;
    background-color: #ffffff;
    padding: 1rem 1rem;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
    border-radius: 0;
    margin-top: -1.5rem;
    margin-left: -8rem;
    margin-right: -4rem;
    margin-bottom: 0px;
    height:10vh;
    
    position: relative; /* Needed if z-index is used */
    z-index: 5;
}

          .quiz-footer img {
            width: 100%;
            height: auto;
            display: block;
             margin-top: 0px;
            padding-top:0px;
          }

          .quiz-content {
            flex: 1;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            min-height: calc(100vh - 200px);
          }
            .header-tex{
             color: rgb(34, 123, 153);
             margin-right:0px;
             margin-left:1300px;
             margin-top:0px;
             padding-top:0px;
            }
          .header-actions1 {
  position: absolute;
  top: 0;
  right: 0;
  height: 90%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  z-index: 2;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 9999px;
    object-fit: cover;
  }
  
  .user-name {
    font-weight: 550;
    font-size:13px;
    color: black;
  }
  
  .icon-button {
    background: transparent;
    border: none;
    cursor: pointer;
    color: black;
  }
  
  .icon-button.small {
    padding: 0 4px;
  }
  

          .header-text {
            text-align: center;
            margin-bottom: 30px;
            color: rgb(34, 123, 153);
          }
          .image-row {
            position: absolute;
            top: 0;
            left: 0;
          }

          .tree-img {
            width: 150px;
            height: 240px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 4;
            margin-left: 90px;
            padding-top: 245px;
          }
          .main-container {
            background-color: white;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            font-family: 'Comic Neue', sans-serif;
          }
          }

          .video-wrapper {
            position: relative;
            width: 650px;
            height: 400px;
            overflow: hidden;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            padding-bottom:190px;
           
          }

          .video-wrapper {
            position: relative;
            width: 650px;
            height: 400px;
            overflow: hidden;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
           
            margin-top: 0px;
            margin-bottom:0px;
            padding-bottom:0px;
            
          }

          .video-wrapper video {
            width: 100%;
            height: 90%;
            object-fit: cover;
            
            z-index: 1;
          }

          .overlay-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 2;
          }

          .play-button {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 3;
            cursor: pointer;
            width: 64px;
            height: 64px;
            transition: transform 0.2s ease;
          }

          .play-button:hover {
            transform: translate(-50%, -50%) scale(1.1);
          }

          .video-controls {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 10px;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 3;
          }

          .control-button {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 5px;
            font-size: 18px;
          }

          .control-button:hover {
            opacity: 0.8;
          }

          .progress-bar {
            flex: 1;
            height: 4px;
            background-color: rgba(255, 255, 255, 0.3);
            cursor: pointer;
            position: relative;
          }

          .progress-filled {
            height: 100%;
            background-color: white;
            transition: width 0.1s linear;
          }

          

          .header-text {
            top: 0px;
            left: 10px;
            display: flex;
            align-items: center;
            gap: 0px;
            z-index: 10;
          }
           

          .username {
            font-family: 'Comic Neue', sans-serif;
            font-size: 16px;
            font-weight: bold;
            color: black;
          }

          .header-left {
            position: absolute;
            top: 45px;
            left: 10px;
            text-align: center;
            z-index: 10;
          }

          .header-icon {
            width: 80px;
            height: 70px;
            display: block;
            margin-left: 20px;
            padding-top:3px;
          }

           .home-link {
            font-family: 'Comic Neue', sans-serif;
            font-size: 20px;
            color: black;
            text-decoration: none;
            font-weight: bold;
            margin-top: 0px;
            margin-left:20px;
            display: block;
          }

          .bear-img {
            width: 390px;
            height: 375px;
            position: absolute;
            top: 0;
            left: 193px;
            z-index: 3;
            padding-top: 115px;
          }

          .quiz-task {
            margin-left: auto;
            margin-top: 55px;
            margin-right: 250px;
            text-align: left;
            max-width: 400px;
            font-size: 30px;
            font-family: 'Comic Neue', sans-serif;
          }

          .quiz-task strong {
            font-weight: bold;
          }

          .circle-highlight {
            border: 3px solid #FFBF00;
            border-radius: 30px;
            padding: 2px 6px;
            display: inline-block;
          }

          .word-box {
            margin-top: 30px;
            padding: 20px;
            background-color:white;
            border-radius: 25px;
            border: 2px solid grey;
            font-weight: bolder;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          }

          .word-options {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
            font-weight: bolder;
           font-family: 'Comic Neue', sans-serif;
          }

          .word-row {
            display: flex;
            gap: 30px;
            flex-wrap: wrap;
            justify-content: center;
          }

          .word-button {
            border-radius: 20px;
            border: 2px solid #333;
            background-color: white;
            border-color: rgb(192, 202, 209);
            cursor: pointer;
            font-size: 20px;
            font-weight: bolder;
            font-family: 'Comic Neue', sans-serif;
            transition: background-color 0.3s ease, color 0.3s ease;
          }

          .word-button.correct {
            color: black;
            font-size: 20px;
            font-weight: bolder;
            font-family: 'Comic Neue', sans-serif;
            border-color: #4caf50;
          }

          .word-button.wrong {
            color: black;
            font-size: 20px;
            font-weight: bolder;
            font-family: 'Comic Neue', sans-serif;
            border-color:rgba(240, 44, 14, 0.85);
          }

          .quiz-header {
           
            width: 100%;
            height: 10vh;
            overflow: hidden;
            display: flex;
            align-items: center;
            margin-top:0px;
            padding-top:0px;
          }

           .header-wrapper {
  position: relative;
  width: 100%;
}

.header-bg {
  margin-top: 0px;
  padding-top: 99px;
  width: 100%;
  height: 25vh;
  object-fit: cover;
  display: block;
}
         .group-icon {
            position: absolute;
            top: 60px;
            right: 40px;
            width: 40vh;
            height: auto;
            z-index: 5;
          }
          .next-button , .previous-button{
            font-family: 'Sen', sans-serif;
            font-weight: 800;
            color: white;
            font-size: 15px;
            background-color: rgb(118, 207, 236);
            border: rgb(118, 207, 236);
            padding: 10px 25px;
            margin-top: 50px;
            margin-left: 90px;
            cursor: pointer;
            border-radius: 6px;
            transition: background-color 0.3s ease;
          }
.previous-button {
            color: black;
          }
          .next-button:hover {
            background-color: #0AAAE1;
          }
            .head{
          padding-top:0px;
            margin-top:0px;
            
            }
          .previous-button:hover {
            background-color: #0AAAE1;
          }
            .button-wrapper{
            margin-top:10px;
            margin-bottom:0px;
            padding-bottom:0px;
            }
            
.dashboard-footer1 {
    width: calc(100% + 6rem); 
    margin: 3rem -1rem -1.5rem -3rem; 
    position: relative;
    z-index: 1;
    margin-top: 0px;
    padding-top:0px;
    line-height: 0;
}
.dashboard-footer1 img { display: block; width: 100%; height: auto; }
        `}
      </style>


      
      
     
     
  <div className="head">
      <header className="quiz-header">
        
       
       
      </header>
      </div>
      <main className="quiz-content">
        <div className="video-wrapper">
          <video
            ref={videoRef}
            src="home/blizzhome.mp4"
            className="video-element"
            onEnded={handleVideoEnd}
            onTimeUpdate={handleTimeUpdate}
            controls={false}
          />
          {showOverlay && (
            <>
              <img
                src="home/playimg.jpg"
                alt="Overlay"
                className="overlay-img"
              />
 <button
                onClick={handlePlayClick}
                className="play-button-wrapper"
              >
                <img
                  src="home/play.png"
                  alt="Play"
                  className="play-button"
                />
              </button>
            </>
          )}
          <div className="video-controls">
            <button className="control-button" onClick={handlePlayClick}>
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button className="control-button" onClick={handleRewind}>⏪</button>
            <button className="control-button" onClick={handleForward}>⏩</button>
            <div className="progress-bar" onClick={handleProgressClick}>
              <div
                className="progress-filled"
                style={{ width: `${progress}%` }}
              />
            </div>
            <button className="control-button" onClick={toggleFullScreen}>⛶</button>
          </div>
        </div>

        <div className="button-wrapper">
          <button
            className="previous-button"
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = 0;
                setShowOverlay(false);
                videoRef.current.play();
                setIsPlaying(true);
                
                // Play greeting audio after 0.15 seconds
                if (greetingAudio) {
                  const audio = new Audio(greetingAudio);
                  audioRef.current = audio;
                  
                  audio.onerror = (e) => {
                    console.error('Audio playback error:', e);
                  };
                  
                  setTimeout(() => {
                    audio.play().catch(error => {
                      console.error('Error playing audio:', error);
                    });
                  }, 150); // 0.15 seconds
                }
              }
            }}
          >
            PLAY AGAIN
          </button>
          <button
            className="next-button"
            onClick={() => (window.location.href = "/quizone")}
          >
            WORK BOOK
          </button>
        </div>
      </main>

                 
                 <footer className="dashboard-footer1">
                    <img src='footer.png' alt="Footer Decoration" />
                </footer>
            </main>
        </div>
    );
};

export default Nouns;