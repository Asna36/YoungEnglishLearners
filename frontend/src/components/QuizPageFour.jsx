import React, { useState } from "react";

const baseStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        fontFamily: "'Comic Neue', sans-serif",
    },
    header: {
        position: 'relative',
        backgroundImage: "url('/Frame (2).png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100px',
    },
    headerContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1280px',
        margin: '0 auto',
        width: '100%',
        padding: '1rem',
        gap: '1rem',
    },
    homeLink: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textDecoration: 'none',
        padding: '1.25rem',
    },
    iglooImage: {
        width: '2rem',
        height: '2rem',
        objectFit: 'contain',
    },
    homeText: {
        fontSize: '0.75rem',
        fontWeight: '600',
        marginTop: '0.25rem',
        color: '#1f2937',
    },
    title: {
        fontSize: '1.125rem',
        fontWeight: '500',
        color: '#1f2937',
        textAlign: 'center',
    },
    examplesContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '0.5rem',
        gap: '1rem',
    },
    exampleItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    exampleWord: {
        fontWeight: 'bold',
    },
    exampleType: {
        fontSize: '0.75rem',
        color: '#4b5563',
    },
    questionBox: {
        position: 'relative',
        backgroundColor: 'white',
        border: '1px solid #38bdf8',
        padding: '0.25rem 0.75rem',
        borderRadius: '0.375rem',
        fontWeight: 'bold',
        color: '#0891b2',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    },
    mainContent: {
        flexGrow: 1,
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentWrapper: {
        maxWidth: '1280px',
        padding: '0 2rem',
        width: '100%',
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: '2rem',
        justifyContent: 'center',
    },
    polarBearContainer: {
        width: '50%',
        maxWidth: '600px',
    },
    polarBearImage: {
        display: 'block',
        width: '100%',
        height: 'auto',
        objectFit: 'contain',
    },
    questionsContainer: {
        width: '50%',
        maxWidth: '600px',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'between',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
    starBadge: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '0.5rem',
    },
    instructions: {
        fontWeight: '500',
        marginBottom: '0.75rem',
        color: '#1f2937',
        fontSize: '1rem',
    },
    example: {
        marginBottom: '1.5rem',
        color: '#374151',
        fontSize: '0.875rem',
    },
    questionList: {
        paddingLeft: '2.5rem',
    },
    questionItem: {
        marginBottom: '1.5rem',
        transition: 'opacity 0.3s ease',
    },
    questionInput: {
        border: 'none',
        borderBottom: '2px solid #fbbf24',
        outline: 'none',
        minWidth: '4rem',
        padding: '0.25rem',
        fontSize: '0.875rem',
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
    feedback: {
        marginLeft: '0.5rem',
        fontSize: '0.875rem',
    },
    navigationButtons: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '0.5rem',
        marginTop: '2rem',
    },
    prevButton: {
        padding: '1rem',
        border: '1px solid #67e8f9',
        borderRadius: '0.375rem',
        color: '#374151',
        backgroundColor: 'transparent',
        fontSize: '0.75rem',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: '#f0f9ff',
        },
    },
    nextButton: {
        padding: '1rem',
        backgroundColor: '#06b6d4',
        color: 'white',
        borderRadius: '0.375rem',
        fontSize: '0.75rem',
        cursor: 'pointer',
        fontWeight: 'bold',
        border: 'none',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: '#0891b2',
        },
    },
    checkButton: {
        padding: '0.5rem 1rem',
        backgroundColor: '#06b6d4',
        color: 'white',
        borderRadius: '0.375rem',
        fontSize: '0.75rem',
        cursor: 'pointer',
        border: 'none',
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: '#0891b2',
        },
    },
    footer: {
        width: '100%',
        overflow: 'hidden',
        maxHeight: '5rem',
        marginTop: 'auto',
    },
    footerImage: {
        width: '100%',
        display: 'block',
    },
};

// Add media queries
if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    if (mediaQuery.matches) {
        baseStyles.flexContainer.flexDirection = 'column';
        baseStyles.flexContainer.alignItems = 'center';
        baseStyles.polarBearContainer.width = '100%';
        baseStyles.questionsContainer.width = '100%';
        baseStyles.iglooImage.width = '2rem';
        baseStyles.iglooImage.height = '2rem';
        baseStyles.questionBox.padding = '0.25rem 0.75rem';
        baseStyles.title.fontSize = '1rem';
        baseStyles.contentWrapper.padding = '0 1rem';
    }
}

const QuizPageFour = () => {
    const [styles, setStyles] = useState(baseStyles);

    const questions = [
        {
            id: 1,
            text: "The ____ gave us homework to complete.",
            type: "person",
            answer: "teacher",
            hint: "(person)",
        },
        {
            id: 2,
            text: "I saw a swan swimming in the ____.",
            type: "place",
            answer: "lake",
            hint: "(place)",
        },
        {
            id: 3,
            text: "My favorite ____ is chocolate cake.",
            type: "thing",
            answer: "dessert",
            hint: "(things)",
        },
        {
            id: 4,
            text: "We visited the ____ to see animals.",
            type: "place",
            answer: "zoo",
            hint: "(place)",
        },
        {
            id: 5,
            text: "The ____ ran the fastest in the race.",
            type: "person",
            answer: "boy",
            hint: "(person)",
        },
        {
            id: 6,
            text: "I packed my ____ in my school bag.",
            type: "thing",
            answer: "lunch",
            hint: "(thing)",
        },
    ];

    const [userAnswers, setUserAnswers] = useState({});
    const [completedQuestions, setCompletedQuestions] = useState([]);
    const [feedback, setFeedback] = useState({});
    const [polarBearPath, setPolarBearPath] = useState("/Group 20.png");
    const [firstTry, setFirstTry] = useState(false);

    const handleAnswerChange = (questionId, answer) => {
        setUserAnswers({
            ...userAnswers,
            [questionId]: answer,
        });
        // Clear feedback when typing
        setFeedback({
            ...feedback,
            [questionId]: null,
        });
    };

    const playAudioWithGif = async (audioSrc, gifSrc) => {
        try {
            const context = new (window.AudioContext || window.webkitAudioContext)();
            const buffer = await (await fetch(audioSrc)).arrayBuffer();
            const decoded = await context.decodeAudioData(buffer);

            const source = context.createBufferSource();
            source.buffer = decoded;
            source.connect(context.destination);
            source.start(0);
            setPolarBearPath(gifSrc);

            source.onended = () => setPolarBearPath("/Group 20.png");
        } catch (err) {
            console.error("Audio play error:", err);
            setPolarBearPath("/Group 20.png");
        }
    };

    const checkAnswer = (questionId) => {
        const currentQuestion = questions.find((q) => q.id === questionId);
        const userAnswer = userAnswers[questionId] || "";

        const isCorrect =
            userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase();
        if (isCorrect) {
            if (!completedQuestions.includes(questionId)) {
                setCompletedQuestions([...completedQuestions, questionId]);
            }

            if (!firstTry) {
                // audio for first try

                playAudioWithGif("/firstcorrect.mp3", "/talking.gif");
                setFirstTry(true);
            } else if (completedQuestions.length === questions.length - 1) {
                // audio for all right answer

                playAudioWithGif("/findall.mp3", "/talking.gif");
            } else {
                // audio for right answer
                playAudioWithGif("/2-3correct2.mp3", "/talking.gif");
            }
        } else {
            // audio for wrong answer

            playAudioWithGif("/e.mp3", "/talking.gif");
            setFirstTry(true);
        }

        setFeedback({
            ...feedback,
            [questionId]: isCorrect,
        });

        if (isCorrect) {
            if (!completedQuestions.includes(questionId)) {
                setCompletedQuestions([...completedQuestions, questionId]);
            }
        }
    };

    // Check if a question is active (can be answered)
    const isQuestionActive = (questionId) => {
        if (questionId === 1) return true; // First question is always active
        const previousQuestionId = questionId - 1;
        return completedQuestions.includes(previousQuestionId);
    };

    // Helper function to render all questions with proper active/disabled states
    const renderQuestions = () => {
        return questions.map((question, index) => {
            const parts = question.text.split("____");
            const questionLetter = String.fromCharCode(97 + index);
            const isActive = isQuestionActive(question.id);
            const isCompleted = completedQuestions.includes(question.id);

            return (
                <div
                    key={question.id}
                    style={{
                        ...styles.questionItem,
                        opacity: !isActive ? 0.6 : 1
                    }}
                >
                    <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                        {questionLetter}. {parts[0]}
                        <span style={{ borderBottom: '2px solid #fbbf24', display: 'inline-block', minWidth: '4rem' }}>
                            <input
                                type="text"
                                value={userAnswers[question.id] || ""}
                                onChange={(e) =>
                                    handleAnswerChange(question.id, e.target.value)
                                }
                                disabled={!isActive || isCompleted}
                                style={styles.questionInput}
                            />
                        </span>
                        {parts[1]} {question.hint}
                        {feedback[question.id] !== undefined && (
                            <span style={{
                                ...styles.feedback,
                                color: feedback[question.id] ? '#059669' : '#dc2626'
                            }}>
                                {feedback[question.id] ? "✓" : "✗"}
                            </span>
                        )}
                    </p>
                    {isActive && !isCompleted && (
                        <button
                            onClick={() => checkAnswer(question.id)}
                            style={{
                                padding: '0.25rem 0.75rem',
                                backgroundColor: '#06b6d4',
                                color: 'white',
                                borderRadius: '0.375rem',
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                                border: 'none',
                            }}
                        >
                            Check
                        </button>
                    )}
                </div>
            );
        });
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.headerContent}>
                    <div style={styles.homeLink}>
                        <img
                            src="/igloo.png"
                            alt="Igloo"
                            style={styles.iglooImage}
                        />
                        <span style={styles.homeText}>HOME</span>
                    </div>
                    <div>
                        <h1 style={styles.title}>
                            A Noun is a word that names a person, place or thing.
                        </h1>
                        <div style={styles.examplesContainer}>
                            {[
                                { word: 'DOCTOR', type: '(PERSON)' },
                                { word: 'PARK', type: '(PLACE)' },
                                { word: 'TABLE', type: '|______' },
                                { word: 'SPOON', type: '(THINGS)' },
                                { word: 'BALL', type: '______|' }
                            ].map((example, index) => (
                                <div key={index} style={styles.exampleItem}>
                                    <span style={styles.exampleWord}>{example.word}</span>
                                    <span style={styles.exampleType}>{example.type}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={styles.questionBox}>
                        QUESTION 4/4
                    </div>
                </div>
            </header>

            <main style={styles.mainContent}>
                <div style={styles.contentWrapper}>
                    <div style={styles.flexContainer}>
                        <div style={styles.polarBearContainer}>
                            <img
                                src={polarBearPath}
                                alt="Polar Bear"
                                style={styles.polarBearImage}
                            />
                        </div>

                        <div style={styles.questionsContainer}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={styles.starBadge}>
                                    <img
                                        src="/Group 2.png"
                                        alt="Star Badge"
                                        style={{ width: '4.5rem', height: '4.5rem' }}
                                    />
                                </div>
                                <p style={styles.instructions}>
                                    <sup><strong>4. </strong></sup>
                                    Type a <strong>person, place, or thing</strong> to complete each sentence.
                                </p>
                                <p style={styles.example}>
                                    <strong>
                                        Example : The <u style={{ color: '#fbbf24' }}>baby</u> is crying.
                                    </strong>
                                </p>
                            </div>
                            <div style={styles.questionList}>{renderQuestions()}</div>

                            <div style={styles.navigationButtons}>
                                <button
                                    style={styles.prevButton}
                                    onClick={() => window.location.href = "/quizthree"}
                                >
                                    <strong>PREVIOUS QUESTION</strong>
                                </button>
                                <button
                                    style={styles.nextButton}
                                    onClick={() => window.location.href = "/result"}
                                >
                                    <strong>NEXT QUESTION</strong>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer style={styles.footer}>
                <img
                    src="/footer.png"
                    alt="Footer"
                    style={styles.footerImage}
                />
            </footer>
        </div>
    );
};

export default QuizPageFour;