import React, { useState } from "react";

const StatementThree = () => {
    const [questions, setQuestions] = useState({
        questionA: {
            sourceWords: ['raining', 'It', 'is', 'outside'],
            droppedWords: [],
            answer: ['It', 'is', 'raining', 'outside'],
            showAnswer: false
        },
        questionB: {
            sourceWords: ['fast', 'runs', 'dog', 'The'],
            droppedWords: [],
            answer: ['The', 'dog', 'runs', 'fast'],
            showAnswer: false
        },
        questionC: {
            sourceWords: ['The', 'shining', 'is', 'sun', 'brightly'],
            droppedWords: [],
            answer: ['The', 'sun', 'is', 'shining', 'brightly'],
            showAnswer: false
        },
        questionD: {
            sourceWords: ['eats', 'every', 'banana', 'Sam', 'a', 'morning'],
            droppedWords: [],
            answer: ['Sam', 'eats', 'a', 'banana', 'every', 'morning'],
            showAnswer: false
        },
        questionE: {
            sourceWords: ['a', 'sandwich', 'delicious', 'made', 'I', 'lunch', 'for'],
            droppedWords: [],
            answer: ['I', 'made', 'a', 'delicious', 'sandwich', 'for', 'lunch'],
            showAnswer: false
        },
        questionF: {
            sourceWords: ['because', 'coat', 'it', 'wore', 'his', 'raining', 'was', 'Jack'],
            droppedWords: [],
            answer: ['Jack', 'wore', 'his', 'coat', 'because', 'it', 'was', 'raining'],
            showAnswer: false
        }
    });

    const handleDragStart = (e, word) => {
        e.dataTransfer.setData('text/plain', word);
    };

    const handleDrop = (e, questionId) => {
        e.preventDefault();
        const word = e.dataTransfer.getData('text/plain');
        
        setQuestions(prev => {
            const question = prev[questionId];
            
            // Only add the word if it's from the source words and not already dropped
            if (question.sourceWords.includes(word) && !question.droppedWords.includes(word)) {
                const newSourceWords = question.sourceWords.filter(w => w !== word);
                const newDroppedWords = [...question.droppedWords, word];
                const showAnswer = newDroppedWords.length === question.answer.length;
                
                return {
                    ...prev,
                    [questionId]: {
                        ...question,
                        sourceWords: newSourceWords,
                        droppedWords: newDroppedWords,
                        showAnswer
                    }
                };
            }
            return prev;
        });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleRemoveWord = (questionId, word) => {
        setQuestions(prev => {
            const question = prev[questionId];
            return {
                ...prev,
                [questionId]: {
                    ...question,
                    sourceWords: [...question.sourceWords, word],
                    droppedWords: question.droppedWords.filter(w => w !== word),
                    showAnswer: false
                }
            };
        });
    };

    const isWordCorrect = (word, index, questionId) => {
        return word.toLowerCase() === questions[questionId].answer[index].toLowerCase();
    };

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
            margin-left: 650px;
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
            
                <img src="/statframe.png" alt="Header Background" className="header-bg" />
                
            </header>

            <main className="quiz-content">
                <div className="image-row">
                    <img src="/tree_icon 2.png" alt="Tree" className="tree-img" />
                    <img src="/greenQ.png" alt="Underscore" className="underscore-img" />
                    <img src="/talking.gif" alt="Bear" className="bear-img" />
                </div>

                <div className="quiz-task">
                <p>
                    
                    <strong>3. Sort the words in the right order to make a statement</strong> </p>
                   <p> <span>Tip: Make sure to use a capital letter at the beginning and a full stop at the end.</span> 
                  </p><br></br>
                  <span style={{color:'orange'}}>Drag and drop the words on right side.</span>
                  <p><span className="circle-highlight">Example: laptop / broken / My / is {'->'} My laptop is broken.</span></p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '20px', marginBottom: '20px' }}>
                    {Object.entries(questions).map(([questionId, question], qIndex) => (
                        <div key={questionId} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ display: 'flex', gap: '5px', alignItems: 'flex-start' }}>
                                {/* Source Words */}
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', minWidth: '400px' }}>
                                    <span>{String.fromCharCode(97 + qIndex)}.</span>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {question.sourceWords.map((word, index) => (
                                            <div
                                                key={index}
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, word)}
                                                style={{
                                                    padding: '3px 5px',
                                                    backgroundColor: '#E8E8E8',
                                                    color: 'white',
                                                    
                                                    borderRadius: '4px',
                                                    cursor: 'move',
                                                    color:'black',
                                                    fontWeight:'900',
                                                    userSelect: 'none',
                                                    fontSize: '14px'
                                                }}
                                            >
                                                {word}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Drop Zone */}
                                <div
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, questionId)}
                                    style={{
                                        minWidth: '400px',
                                        minHeight: '10px',
                                        border: '2px dashed #ccc',
                                        paddingRight:'0px',
                                        borderRadius: '8px',
                                        padding: '9px',
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '2px',
                                        backgroundColor: '#f8fafc'
                                    }}
                                >
                                    {question.droppedWords.map((word, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleRemoveWord(questionId, word)}
                                            style={{
                                                padding: '3px 12px',
                                                backgroundColor: '#e5e7eb',
                                                color: '#374151',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                userSelect: 'none',
                                                fontSize: '14px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0px'
                                            }}
                                        >
                                            {word}
                                            {isWordCorrect(word, index, questionId) ? (
                                                <span style={{ color: 'green' }}>✓</span>
                                            ) : (
                                                <span style={{ color: 'red' }}>✗</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Show Answer */}
                            {question.showAnswer && (
                                <div style={{
                                    marginLeft: '220px',
                                    padding: '8px 16px',
                                    backgroundColor: '#ecfdf5',
                                    color: '#059669',
                                    borderRadius: '4px',
                                    fontSize: '14px'
                                }}>
                                    Correct sentence: {question.answer.join(' ')}.
                                </div>
                            )}
                        </div>
                    ))}
                  </div>

                  <div className="button-wrapper">
                    <button
                        className="previous-button"
                        onClick={() => (window.location.href = "/quiztwos")}
                    >
                        PREVIOUS QUESTION
                    </button>
                    <button
                        className="next-button"
                        onClick={() => (window.location.href = "/quizfours")}
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

export default StatementThree;
