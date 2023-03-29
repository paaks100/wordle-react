import React, { useContext, useEffect } from 'react';
import { AppContext } from '../App';

function Letter({letterPos, attemptVal}) {
    const {
        board,
        correctWord,
        currAttempt,
        setDisabledLetters,
        setCorrectLetters,
        setAlmostLetters
    } = useContext(AppContext);
    const letter = board[attemptVal][letterPos];

    const correct = (correctWord.toUpperCase()[letterPos] == letter);
    const almost = (!correct && letter != "" && correctWord.toUpperCase().includes(letter));

    const letterState = (currAttempt.attempt > attemptVal)
        && (correct ? "correct" : almost ? "almost" : "error");

    useEffect(() => {
        if (letter != "" && !correct && !almost){
            setDisabledLetters((prev) => [...prev, letter])
        }
        if (letter != "" && almost){
            setAlmostLetters((prev) => [...prev, letter])
        }
        if (letter != "" && correct){
            setCorrectLetters((prev) => [...prev, letter])
        }
    }, [currAttempt.attempt])

    return (
        <div className='letter' id={letterState}> {letter} </div>
    )
}

export default Letter;