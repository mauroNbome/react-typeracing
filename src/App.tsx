import React, { useState, useEffect, useRef } from "react";
import Sentence from "./components/Sentence/Sentence";
import Timer from "./components/Timer";
import InputBox from "./components/InputBox";
import "./App.css";

const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "To be or not to be, that is the question.",
    "I have a dream that one day this nation will rise up.",
    "A journey of a thousand miles begins with a single step.",
    "Don't count your chickens before they hatch.",
    "All that glitters is not gold.",
    "A watched pot never boils.",
    "Actions speak louder than words.",
    "You can lead a horse to water, but you can't make it drink.",
    "When the going gets tough, the tough get going.",
    "Beauty is in the eye of the beholder.",
    "Rome wasn't built in a day.",
    "The pen is mightier than the sword."
];

const getRandomSentence = () => {
    return sentences[Math.floor(Math.random() * sentences.length)];
};

const App: React.FC = () => {
    const [sentence, setSentence] = useState(getRandomSentence());
    const [input, setInput] = useState("");
    const [timer, setTimer] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const intervalRef = useRef<NodeJS.Timeout>();
    const countdownRef = useRef<NodeJS.Timeout>();
    const inputRef = useRef<HTMLInputElement>(null);

    // Timer and game completion
    useEffect(() => {
        if (!isStarted || isCompleted) return;

        const intervalId = setInterval(() => {
            if (countdown > 0) {
                setCountdown(prevCountdown => prevCountdown - 1);
            } else {
                setTimer(prevTime => prevTime + 1);
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [isStarted, isCompleted, countdown]);

    // Focus on input after countdown
    useEffect(() => {
        if (countdown === 0 && inputRef.current) {
            inputRef.current.focus();
        }
    }, [countdown]);

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);

        // Check if input matches the sentence
        if (e.target.value === sentence) {
            setIsCompleted(true);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    };

    // Start the game
    const handleStart = () => {
        setIsStarted(true);
    };

    // Reset the game
    const handleReset = () => {
        setSentence(getRandomSentence());
        setInput("");
        setTimer(0);
        setIsCompleted(false);
        setIsStarted(false);
        setCountdown(3);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        if (countdownRef.current) {
            clearInterval(countdownRef.current);
        }
    };

    return (
        <div className='app'>
            <h1>Typing Race App</h1>
            <Sentence sentence={sentence} input={input} />
            <InputBox
                ref={inputRef}
                value={input}
                onChange={handleChange}
                disabled={!isStarted || isCompleted || countdown > 0}
            />
            <Timer timer={timer} />
            {!isStarted && (
                <button
                    onClick={handleStart}
                    className='start-button'
                    aria-label='Start'
                >
                    Start
                </button>
            )}
            {countdown > 0 && isStarted && (
                <p data-testid='countdown'>Countdown: {countdown}</p>
            )}
            {isCompleted && (
                <p>Congratulations! You&apos;ve completed the race.</p>
            )}
            {isCompleted && (
                <button onClick={handleReset} className='reset-button'>
                    Reset
                </button>
            )}
        </div>
    );
};

export default App;
