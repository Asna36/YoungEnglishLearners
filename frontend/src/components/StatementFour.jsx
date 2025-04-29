import React, { useState } from "react";

const StatementFour = () => {
    
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
            top: 10px;
            right: 60px;
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
            height: 40px;
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
            margin-left: 5px;
            padding-top:7px;
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
            border: rgb(22, 193, 167);
            transition: background-color 0.3s ease;
            background-color:  rgb(22, 193, 167);
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
            padding-top: 55px;
            width: 100%;
            height: 17vh;
            object-fit: cover;
            display: block;
          }
  .circle-highlight {
            border: 3px solid rgb(49, 191, 163);
            border-radius: 40px;
            padding: 2px 6px;
            display: inline-block;
            margin-top:10px;
          }
          .next-button:hover, .previous-button:hover {
            background-color:rgb(8, 92, 75);
          }
        `
        }
      </style>

      <div className="profile-section">
        <img src="/young.png" alt="Profile" className="profile-icon" />
        
      </div>

      <div className="header-text"><img src="/Statements.png" alt=""></img></div>

      <header className="quiz-header">
      
        <img src="/Q4frame.png" alt="Header Background" className="header-bg" />
        
      </header>

      <main className="quiz-content">
        <div className="image-row">
          <img src="/tree_icon 2.png" alt="Tree" className="tree-img" />
          <img src="/greenQ.png" alt="Underscore" className="underscore-img" />
          <img src="/talking.gif" alt="Bear" className="bear-img" />
        </div>

        <div className="quiz-task">
        <p>
            
            <strong>4. Write the following  Statements.</strong> </p><br></br>
           <p> <span><strong>a. Write a statement about today's weather.</strong> </span> 
          </p><br></br>
          <div>
          <input
      type="text"
      placeholder="Write here"
      style={{
        padding: '10px',
        backgroundColor:'#F5F5F5',
        border: '2px solid rgb(13, 166, 156)',
        borderRadius: '8px',
        fontSize: '16px',
        width: '300px',
        outline: 'none',
      }}
    />
    </div>
            
   <br></br>        
    <p> <span><strong>b. Write a statement about your favourite animal.</strong> </span> 
          </p><br></br>
          <div>
          <input
      type="text"
      placeholder="Write here"
      style={{
        padding: '10px',
        backgroundColor:'#F5F5F5',
        border: '2px solid rgb(13, 166, 156)',
        borderRadius: '8px',
        fontSize: '16px',
        width: '300px',
        outline: 'none',
      }}
    /> 
    </div><br></br>
  <p> <span><strong>c. Write a statement about something you enjoy doing and when you do it.</strong> </span> 
          </p><br></br>
          <input
      type="text"
      placeholder="Write here"
      style={{
        padding: '10px',
        backgroundColor:'#F5F5F5',
        border: '2px solid rgb(13, 166, 156)',
        borderRadius: '8px',
        fontSize: '16px',
        width: '300px',
        outline: 'none',
      }}
    /><br></br>
          
          <div className="button-wrapper">
            <button
              className="previous-button"
              onClick={() => (window.location.href = "/quizthrees")}
            >
              PREVIOUS QUESTION
            </button>
            <button
              className="next-button"
              onClick={() => (window.location.href = "/results")}
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

export default StatementFour;
