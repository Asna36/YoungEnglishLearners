import React, { useState,useEffect,useRef } from "react";

const QuizPageOne = () => {
   const [username, setUsername] = useState('');
   const [bearImage, setBearImage] = useState('/polar bear face 1.gif');
   const initialLoadRef = useRef(true);
   const correctAnswers = ["pencil", "teacher", "zoo", "school", "leaf"];
  const allOptions = [
    ["pencil", "teacher", "speak"],[ "blue", "zoo", "silly",
    "quickly"], ["school", "leaf", "enormous"],
  ];
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [recentCorrectStreak, setRecentCorrectStreak] = useState(0);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const [selected, setSelected] = useState({});
  const audioQueue = useRef([]);
  const audioRef = useRef(null);
  const playAudio = (src) => {
    if (audioQueue.current.includes(src)) return;  // Prevent adding the same audio to the queue

    audioQueue.current.push(src);

    // If no audio is playing, start the first audio in the queue
    if (!audioRef.current || audioRef.current.paused || audioRef.current.ended) {
      playNextInQueue();
    }
  };
  const playNextInQueue = () => {
    if (audioQueue.current.length === 0) return;

    const src = audioQueue.current.shift();
    if (audioRef.current) {
      audioRef.current.pause();  // Pause any ongoing audio
    }
    audioRef.current = new Audio(src);
    audioRef.current.onended = () => {
      // Once the audio ends, play the next audio in the queue
      playNextInQueue();
    };
    audioRef.current.play();
  };
  const milestonesPlayed = useRef({
    first: false,
    second: false,
    third: false,
    threeInARow: false,
    allCorrect: false,
  });

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Handle initial load animation
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      const timer = setTimeout(() => {
        setBearImage('/bear.png');
      }, 2000); // Change back to original after 2 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClick = (word) => {
    setLastInteractionTime(Date.now());
    const isCorrect = correctAnswers.includes(word);
    
    // Change bear image based on correct/wrong answer
    setBearImage(isCorrect ? '/polar bear face 3.gif' : '/polar bearface 2.gif');
    
    // Reset bear image after 1 second
    setTimeout(() => {
      setBearImage('/bear.png');
    }, 1000);

    setSelected((prev) => {
      if (prev[word]) return prev;
      return { ...prev, [word]: isCorrect ? "correct" : "wrong" };
    });
  };

  useEffect(() => {
    const selectedWords = Object.entries(selected);
    const correctSelections = selectedWords.filter(([word, result]) => result === "correct").length;
    const wrongSelections = selectedWords.filter(([word, result]) => result === "wrong").length;
  
    setCorrectCount(correctSelections);
    setWrongCount(wrongSelections);
  
    // Update correct streak (only consider last 3 entries)
    const lastThree = selectedWords.slice(-3).map(([_, result]) => result);
    const isThreeInARow = lastThree.length === 3 && lastThree.every((res) => res === "correct");
  
    // Fix: Play 3 in a row audio when there are exactly 3 correct answers in a row
    if (isThreeInARow && !milestonesPlayed.current.threeInARow) {
      // playAudio("/threeinarow.mp3");
      milestonesPlayed.current.threeInARow = true;
    }
  
    // Play correct answer milestone audios
    if (correctSelections === 1 && !milestonesPlayed.current.first) {
      playAudio("/firstcorrect.mp3");
      milestonesPlayed.current.first = true;
    } else if (correctSelections === 2 && !milestonesPlayed.current.second) {
      playAudio("/2-3correct1.mp3");
      milestonesPlayed.current.second = true;
    } else if (correctSelections === 3 && !milestonesPlayed.current.third) {
      playAudio("/2-3correct2.mp3");
      milestonesPlayed.current.third = true;
    }
  
    // Play all correct completion audio
    if (correctSelections === correctAnswers.length && !milestonesPlayed.current.allCorrect) {
      playAudio("/findall.mp3");
      milestonesPlayed.current.allCorrect = true;
  
      setTimeout(() => {
        playAudio("/next.mp3");
      }, 1000);
    }
  
    // Fix: Play wrong answer feedback without repetition
    if (wrongSelections > 0) {
      const wrongAudios = ["/a.mp3", "/b.mp3", "/c.mp3", "/d.mp3", "/e.mp3"];
      // Make sure we're selecting the correct audio for the current wrong answer
      if (!milestonesPlayed.current[`wrong${wrongSelections}`]) {
        playAudio(wrongAudios[Math.min(wrongSelections - 1, 4)]);
        milestonesPlayed.current[`wrong${wrongSelections}`] = true;
      }
    }
  
  }, [selected]);

  return (
    <div
      style={{
        backgroundColor: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Comic Neue', sans-serif",
      }}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Bakbak+One&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Sen:wght@800&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Comic+Neue&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap');

          .quiz-footer img {
            width: 100%;
            height: auto;
            display: block;
          }

          .quiz-content {
            flex: 1;
            position: relative;
            display: flex;
          }

          .header-tex{
            position: absolute;
            top: 0px;
            right: 20px;
            align-items: center;
            margin-top:5px;
            margin-right:0px;
            margin-left:0px;
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

          .underscore-img {
            width: 230px;
            height: 330px;
            position: absolute;
            top: 0;
            left: 129px;
            z-index: 2;
            padding-top: 125px;
          }

          .header-text {
            position: absolute;
            top: 0px;
            right: 20px;
            align-items: center;
            margin-top:5px;
            margin-right:570px;
            margin-left:0px;
            
          
          }

          .profile-section {
            position: absolute;
            top: 10px;
            left: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10;
          }

          .profile-icon {
            margin-top:0px;
            height: 25px;
            margin-left:25px;
            object-fit: cover;
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
            border-radius: 40px;
            padding: 2px 6px;
            display: inline-block;
          }

          .word-box {
            margin-top: 30px;
            padding: 20px;
            background-color:white;
            border-radius: 30px;
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
            border-radius: 10px;
            border: 2px solid #333;
            background-color: white;
            border-color: rgb(192, 202, 209);
            cursor: pointer;
            font-size: 15px;
            font-weight: bolder;
            font-family: 'Comic Neue', sans-serif;
            transition: background-color 0.3s ease, color 0.3s ease;
          }

          .word-button.correct {
            color: black;
            font-size: 15px;
            font-weight: bolder;
            font-family: 'Comic Neue', sans-serif;
            border-color: #4caf50;
          }

          .word-button.wrong {
            color: black;
            font-size: 15px;
            font-weight: bolder;
            font-family: 'Comic Neue', sans-serif;
            border-color:rgba(240, 44, 14, 0.85);
          }

          .quiz-header {
            position: relative;
            width: 100%;
            height: 25vh;
            overflow: hidden;
            display: flex;
            align-items: center;
          }

           .header-bg {
            padding-top: 25px;
            width: 100%;
            height: 20vh;
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
          .next-button {
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

          .next-button:hover {
            background-color: #0AAAE1;
          }
        `}
      </style>

      <div className="profile-section">
        <img src="/young.png" alt="Profile" className="profile-icon" />
        
      </div>

      <div className="header-text"><img src="/nounsheader.png" alt=""></img></div>
      <div className="header-tex">
     
     <strong>WELCOME, {username.toUpperCase() || "Guest"}!</strong>
   </div>
      <header className="quiz-header">
        <div className="header-left">
          <img src="/igloo.png" alt="Igloo" className="header-icon" />
          <a href="/nouns" className="home-link">Home</a>
        </div>
        <img src="/Frame.jpg" alt="Header Background" className="header-bg" />
        <img src="/Group 10.png" alt="Overlay Icon" className="group-icon" />
      </header>

      <main className="quiz-content">
        <div className="image-row">
          <img src="/tree_icon 2.png" alt="Tree" className="tree-img" />
          <img src="/_.png" alt="Underscore" className="underscore-img" />
          <img src={bearImage} alt="Bear" className="bear-img" />
        </div>

        <div className="quiz-task">
          <p>
            1. <span className="circle-highlight">Circle</span> the{" "}
            <strong>nouns</strong> below
          </p>

          <div className="word-box">
            <div className="word-options">
              {allOptions.map((row, rowIndex) => (
                <div className="word-row" key={rowIndex}>
                  {row.map((word) => (
                    <button
                      key={word}
                      className={`word-button ${selected[word] || ""}`}
                      onClick={() => handleClick(word)}
                    >
                      {word}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <button
            className="next-button"
            onClick={() => (window.location.href = "/quiztwo")}
          >
            NEXT QUESTION
          </button>
        </div>
      </main>

      <footer className="quiz-footer">
        <img src="/footer.png" alt="Footer" />
      </footer>
    </div>
  );
};

export default QuizPageOne;
