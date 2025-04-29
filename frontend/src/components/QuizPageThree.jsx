import React, { useState } from "react";
import './QuizPageThree.css';
const QuizPageThree = () => {
  const sentences = [
    // Keep your sentences array exactly as it was
    { id: 'a', text: ['The', 'lion', 'roared', '.'], correctNouns: [1] },
    { id: 'b', text: ['The', 'baby', 'is', 'crying', '.'], correctNouns: [1] },
    { id: 'c', text: ['The', 'castle', 'is', 'on', 'hill', '.'], correctNouns: [1, 4] },
    { id: 'e', text: ['The', 'teacher', 'sat', 'on', 'a', 'bench', '.'], correctNouns: [1, 5] },
    { id: 'd', text: ['A', 'butterfly', 'landed', 'on', 'the', 'flower', '.'], correctNouns: [1, 5] },
    { id: 'f', text: ['My', 'cat', 'chased', 'a', 'mouse', 'in', 'the', 'garden', '.'], correctNouns: [1, 4, 7] },
    { id: 'g', text: ['Sarah', 'and', 'Tom', 'read', 'books', 'in', 'the', 'library', '.'], correctNouns: [0, 2, 4, 7] },
];

const [sentenceStates, setSentenceStates] = useState(
    sentences.map(sentence => ({
        id: sentence.id,
        selectedWords: Array(sentence.text.length).fill(false),
        isChecked: false,
        hasErrors: false
    }))
);

const toggleWordSelection = (sentenceIndex, wordIndex) => {
    if (sentenceStates[sentenceIndex].isChecked) return;
    setSentenceStates(prev => {
        const newStates = [...prev];
        newStates[sentenceIndex] = {
            ...newStates[sentenceIndex],
            selectedWords: [...newStates[sentenceIndex].selectedWords]
        };
        newStates[sentenceIndex].selectedWords[wordIndex] = !newStates[sentenceIndex].selectedWords[wordIndex];
        if (newStates[sentenceIndex].hasErrors) {
            newStates[sentenceIndex].hasErrors = false;
        }
        return newStates;
    });
};

const checkSingleSentence = (sentenceIndex) => {
    const sentenceData = sentences[sentenceIndex];
    const currentSelections = sentenceStates[sentenceIndex].selectedWords;
    let errorsFound = false;
    for (let i = 0; i < currentSelections.length; i++) {
        const isSelected = currentSelections[i];
        const shouldBeSelected = sentenceData.correctNouns.includes(i);
        if (isSelected !== shouldBeSelected) {
            errorsFound = true;
            break;
        }
    }
    setSentenceStates(prev => {
        const newStates = [...prev];
        newStates[sentenceIndex] = {
            ...newStates[sentenceIndex],
            isChecked: true,
            hasErrors: errorsFound
        };
        return newStates;
    });
};

const resetSingleSentence = (sentenceIndex) => {
    setSentenceStates(prev => {
        const newStates = [...prev];
        newStates[sentenceIndex] = {
            ...newStates[sentenceIndex],
            selectedWords: Array(sentences[sentenceIndex].text.length).fill(false),
            isChecked: false,
            hasErrors: false
        };
        return newStates;
    });
};

const getWordStatus = (sentenceIndex, wordIndex) => {
    if (!sentenceStates[sentenceIndex].isChecked) return null;
    const isSelected = sentenceStates[sentenceIndex].selectedWords[wordIndex];
    const shouldBeSelected = sentences[sentenceIndex].correctNouns.includes(wordIndex);
    if (isSelected && shouldBeSelected) return "correct";
    if (isSelected && !shouldBeSelected) return "incorrect";
    if (!isSelected && shouldBeSelected) return "missed";
    return null;
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
            padding-top:0px;
          }


          .quiz-content1 {
            flex: 1;
            margin-bottom:0px;
            position: relative;
            display: flex;
            margin-left:890px;
           
          }

          .image-row {
            position: absolute;
            top: 150px;
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
            margin-top: 10px;
            margin-right:100px;
            gap: 40px;
            margin-left:1000px;
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
            .overlay-Q3{
             position: absolute;
            top: 80px;
            left:1260px;
            width: 20vh;
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
            padding-top: 39px;
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
        <div>
        <img src="/Rectangle 7.png" alt="Overlay Icon" className="group-icon" />
        <img src="/5.png" alt="Overlay Q3" className="overlay-Q3" />
        </div>
      </header>

     
        <div className="image-row">
          <img src="/tree_icon 2.png" alt="Tree" className="tree-img" />
          <img src="/_.png" alt="Underscore" className="underscore-img" />
          <img src="/talking.gif" alt="Bear" className="bear-img" />
        </div>
        <main className="quiz-content1">
           
        <div className="right-panel">
                    <div className="quiz-content">
                        <p className="quiz-instruction">
                            <span className="question-number">3.</span>
                            <u>Underline all the nouns</u> in each sentence. {' '}
                            <span className="instruction-detail">(There may be more than one)</span>
                        </p>
                        <p className="quiz-example">
                            <span className="example-label">Example:</span> The <span className="example-noun">dog</span> is barking.
                        </p>
                        <ul className="sentence-list">
                            {sentenceStates.map((state, sentenceIndex) => (
                                <li key={state.id} className="sentence-item"> {/* Parent Flex Container */}
                                    <span className="sentence-id">{state.id}.</span> {/* Flex Item 1 */}

                                    {/* Flex Item 2: Sentence Text */}
                                    <div className="sentence-text"> {/* No longer grows */}
                                        {sentences[sentenceIndex].text.map((word, wordIndex) => {
                                            const status = getWordStatus(sentenceIndex, wordIndex);
                                            const isSelected = state.selectedWords[wordIndex];
                                            const wordClasses = `word ${isSelected ? 'selected' : ''} ${status ? status : ''} ${state.isChecked ? 'disabled' : ''}`;
                                            return (
                                                <span
                                                    key={wordIndex}
                                                    onClick={() => toggleWordSelection(sentenceIndex, wordIndex)}
                                                    className={wordClasses}
                                                    role="button"
                                                    tabIndex={state.isChecked ? -1 : 0}
                                                >
                                                    {word}
                                                </span>
                                            );
                                        })}
                                        {state.id === 'c' && (
                                            <div className="tooltip-container">
                                                <span className="tooltip-trigger">🌟</span>
                                                <div className="tooltip-content">
                                                    This sentence has <span className="tooltip-highlight">2 nouns</span>.
                                                    <div className="tooltip-arrow"></div>
                                                </div>
                                            </div>
                                        )}
                                    </div> {/* End sentence-text */}

                                    {/* Flex Item 3: Button Area - MOVED OUTSIDE sentence-text */}
                                    <div className="sentence-button-area"> {/* Changed class name */}
                                        {!state.isChecked ? (
                                            <button
                                                onClick={() => checkSingleSentence(sentenceIndex)}
                                                className="button button-check-sentence"
                                            >
                                                Check Answer
                                            </button>
                                        ) : state.hasErrors ? (
                                            <button
                                                onClick={() => resetSingleSentence(sentenceIndex)}
                                                className="button button-try-again-sentence"
                                            >
                                                Try Again
                                            </button>
                                        ) : (
                                            <span className="feedback-correct">✓ Correct!</span>
                                        )}
                                    </div> {/* End sentence-button-area */}
                                </li> // End sentence-item
                            ))}
                        </ul>
                        </div>

                        </div>
                        </main>
      

          <div className="button-wrapper">
            <button
              className="previous-button"
              onClick={() => (window.location.href = "/quiztwo")}
            >
              PREVIOUS QUESTION
            </button>
            <button
              className="next-button"
              onClick={() => (window.location.href = "/quizfour")}
            >
              NEXT QUESTION
            </button>
          </div>
       
     

      <footer className="quiz-footer">
        <img src="/footer.png" alt="Footer" />
      </footer>
    </div>
  );
};

export default QuizPageThree;
