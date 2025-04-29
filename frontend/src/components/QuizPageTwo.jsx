import React, { useState } from "react";

const QuizPageTwo = () => {
    const [droppedWords, setDroppedWords] = useState({
        people: [],
        places: [],
        things: [],
      });
      
      
      const correctAnswers = {
        people: ["teacher", "girl", "bird"],
        places: ["river", "castle", "playground"],
        things: ["table", "ball", "train", "flower"],
      };
      const wordBank = [
        "table", "river", "ball", "teacher", "castle",
        "train", "girl", "playground", "flower", "bird"
      ];
 
      const getRemainingWords = () => {
        const used = new Set([
          ...droppedWords.people,
          ...droppedWords.places,
          ...droppedWords.things,
        ]);
        return wordBank.filter(word => !used.has(word));
      };
      const handleDrop = (category) => (e) => {
        e.preventDefault();
        const word = e.dataTransfer.getData("text/plain");
    
        setDroppedWords((prev) => {
          if (prev[category].includes(word)) return prev;
    
          const updated = {
            ...prev,
            people: prev.people.filter((w) => w !== word),
            places: prev.places.filter((w) => w !== word),
            things: prev.things.filter((w) => w !== word),
          };
    
          updated[category] = [...updated[category], word];
          return updated;
        });
      };
    
      const handleWordRemove = (category, word) => {
        setDroppedWords((prev) => {
          const updated = {
            ...prev,
            [category]: prev[category].filter((w) => w !== word),
          };
          return updated;
        });
      };
    
      const getWordColor = (word, category) => {
        return correctAnswers[category].includes(word) ? "green" : "red";
      };
    
      const remainingWords = getRemainingWords();
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
        {
          `
          @import url('https://fonts.googleapis.com/css2?family=Bakbak+One&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Sen:wght@800&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Comic+Neue&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap');

         .quiz-footer img {
            width: 100%;
            height: auto;
            display: block;
            padding-bottom:5px;
          }


          .quiz-content {
            flex: 1;
            position: relative;
            display: flex;
           
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
            margin-top: 30px;
            margin-right: 80px;
            text-align: left;
            max-width: 700px;
            font-size: 20px;
            font-family: 'Comic Neue', sans-serif;
          }

          .quiz-task strong {
            font-weight: 900 !important;
          }

          .button-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 30px;
            gap: 40px;
          }

          .next-button, .previous-button {
            font-family: 'Sen', sans-serif;
            font-weight: 800;
            font-size: 14px;
            padding: 10px 20px;
            cursor: pointer;
            border-radius: 6px;
            border: rgb(118, 207, 236);
            transition: background-color 0.3s ease;
            background-color: rgb(118, 207, 236);
            margin-top: 0;
            margin-bottom:0px;
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
            color: white;
          }

          .previous-button {
            color: white;
          }
           .header-bg {
            padding-top: 29px;
            width: 100%;
            height: 20vh;
            object-fit: cover;
            display: block;
          }

          .next-button:hover, .previous-button:hover {
            background-color: #0AAAE1;
          }
        `
        }
      </style>

      <div className="profile-section">
        <img src="/young.png" alt="Profile" className="profile-icon" />
        
      </div>

      <div className="header-text"><img src="/nounsheader.png" alt=""></img></div>

      <header className="quiz-header">
        <div className="header-left">
          <img src="/igloo.png" alt="Igloo" className="header-icon" />
          <a href="/nouns" className="home-link">Home</a>
        </div>
        <img src="/Frame.jpg" alt="Header Background" className="header-bg" />
        <img src="/Q2.png" alt="Overlay Icon" className="group-icon" />
      </header>

      <main className="quiz-content">
        <div className="image-row">
          <img src="/tree_icon 2.png" alt="Tree" className="tree-img" />
          <img src="/_.png" alt="Underscore" className="underscore-img" />
          <img src="/talking.gif" alt="Bear" className="bear-img" />
        </div>

        <div className="quiz-task">
          <p>
            2. Read the 10 words below. Drag each word into the correct box:{" "}
            <br />
            <strong>People, Places or Things.</strong> (The first one is done for you)

            {/* First Row */}
           
      {/* Drag Area */}
{getRemainingWords().length === 0 ? (
  <div style={{
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '40px',
    fontFamily: "'Comic Neue', sans-serif",
    color: 'green'
  }}>
    You got all answers!!!
  </div>
) : (
  <>
    {/* Top Row of Words */}
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '25px',
      backgroundColor: 'white',
      borderRadius: '80px',
      padding: '6px',
      marginTop: '20px',
      flexWrap: 'wrap',
      border: '2px solid #ccc'
    }}>
      {getRemainingWords().slice(0, 5).map(word => (
        <div
          key={word}
          draggable
          onDragStart={(e) => e.dataTransfer.setData("text/plain", word)}
          style={{
            padding: "2px 15px",
            border: "2px solid #999",
            borderRadius: "20px",
            backgroundColor: "white",
            cursor: "grab",
            fontWeight: "bold",
            fontSize: "15px",
            fontFamily: "'Comic Neue', sans-serif"
          }}
        >
          {word}
        </div>
      ))}
    </div>

    {/* Bottom Row of Words */}
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '25px',
      backgroundColor: 'white',
      borderRadius: '80px',
      padding: '6px',
      marginTop: '10px',
      flexWrap: 'wrap',
      border: '2px solid #ccc'
    }}>
      {getRemainingWords().slice(5).map(word => (
        <div
          key={word}
          draggable
          onDragStart={(e) => e.dataTransfer.setData("text/plain", word)}
          style={{
            padding: "2px 15px",
            border: "2px solid #999",
            borderRadius: "20px",
            backgroundColor: "white",
            cursor: "grab",
            fontWeight: "bold",
            fontSize: "15px",
            fontFamily: "'Comic Neue', sans-serif"
          }}
        >
          {word}
        </div>
      ))}
    </div>

    {/* Drop Zones */}
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '15px',
      marginTop: '30px',
      flexWrap: 'wrap'
    }}>
      {/* People Card */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop("people")}
        style={{
          position: 'relative',
          backgroundColor: '#B5EBFB',
          padding: '20px',
          borderRadius: '20px',
          minWidth: '150px',
          minHeight: '120px',
          textAlign: 'center'
        }}>
        <div style={{
          position: 'absolute',
          top: '-15px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#00cccc',
          borderRadius: '25px',
          padding: '5px 15px',
          fontWeight: 'bold',
          fontFamily: "'Comic Neue', sans-serif",
          color: 'white',
          fontSize: "15px",
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
        }}>People</div>
        <div style={{
          fontFamily: "'Comic Neue', sans-serif",
          fontWeight: 'bold',
          color:'green',
          fontSize: "15px",
        }}>farmer</div>
        {droppedWords.people.map((word) => (
          <div
            key={word}
            style={{
              fontWeight: "bold",
              fontSize: "15px",
              fontFamily: "'Comic Neue', sans-serif",
              color: correctAnswers.people.includes(word) ? "green" : "red"
            }}
          >
            {word}
          </div>
        ))}
      </div>

      {/* Places Card */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop("places")}
        style={{
          position: 'relative',
          backgroundColor: '#E7E0EC',
          padding: '20px',
          borderRadius: '20px',
          minWidth: '150px',
          minHeight: '120px',
          textAlign: 'center'
        }}>
        <div style={{
          position: 'absolute',
          top: '-15px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#262161',
          borderRadius: '25px',
          padding: '5px 15px',
          fontWeight: 'bold',
          fontFamily: "'Comic Neue', sans-serif",
          color: 'white',
          fontSize: "15px",
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
        }}>Places</div>
        {droppedWords.places.map((word) => (
          <div
            key={word}
            style={{
              fontWeight: "bold",
              fontSize: "15px",
              fontFamily: "'Comic Neue', sans-serif",
              color: correctAnswers.places.includes(word) ? "green" : "red"
            }}
          >
            {word}
          </div>
        ))}
      </div>

      {/* Things Card */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop("things")}
        style={{
          position: 'relative',
          backgroundColor: '#FFF8DC',
          padding: '20px',
          borderRadius: '20px',
          minWidth: '150px',
          minHeight: '120px',
          textAlign: 'center'
        }}>
        <div style={{
          position: 'absolute',
          top: '-15px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#FFC24F',
          borderRadius: '25px',
          padding: '5px 15px',
          fontWeight: 'bold',
          fontFamily: "'Comic Neue', sans-serif",
          color: 'white',
          fontSize: "15px",
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
        }}>Things</div>
        {droppedWords.things.map((word) => (
          <div
            key={word}
            style={{
              fontWeight: "bold",
              fontSize: "15px",
              fontFamily: "'Comic Neue', sans-serif",
              color: correctAnswers.things.includes(word) ? "green" : "red"
            }}
          >
            {word}
          </div>
        ))}
      </div>
    </div>
  </>
)}


          </p>

          <div className="button-wrapper">
            <button
              className="previous-button"
              onClick={() => (window.location.href = "/quizone")}
            >
              PREVIOUS QUESTION
            </button>
            <button
              className="next-button"
              onClick={() => (window.location.href = "/quizthree")}
            >
              NEXT QUESTION
            </button>
          </div>
        </div>
      </main>

      <footer className="quiz-footer">
        <img src="/footer.png" alt="Footer" />
      </footer>
    </div>
  );
};

export default QuizPageTwo;
