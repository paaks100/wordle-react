import React, { useCallback, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import Key from './Key';

function Keyboard() {
    const {
        onEnter,
        onDelete,
        onSelectLetter,
        disabledLetters,
        correctLetters,
        almostLetters
    } = useContext(AppContext);

    const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]; // top row keys
    const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];  // middle row keys
    const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];  // bottom row keys

    // when player clicks on actual keyboard
    const handleKeyboard = useCallback((event) => {
        if (event.key == "Enter"){ // if player clicks the ENTER key
            onEnter();
        } else if (event.key == "Backspace"){ // if player clicks the DELETE key
            onDelete();
        } else {
            keys1.forEach((key) => // if player clicks a top row key
                (event.key.toLowerCase() == key.toLowerCase()&& onSelectLetter(key)));

            keys2.forEach((key) => // if player clicks a middle row key
                (event.key.toLowerCase() == key.toLowerCase() && onSelectLetter(key)));

            keys3.forEach((key) => // if player clicks a bottom row key
                (event.key.toLowerCase() == key.toLowerCase() && onSelectLetter(key)));
        }
    })

    // called to handle the handleKeyboard() function
    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard);
        return () => {
            document.removeEventListener("keydown", handleKeyboard)
        }
    }, [handleKeyboard])

    return (
        <div className="keyboard" onKeyDown={handleKeyboard}>
            <div className="line1">
                {keys1.map((key) => {
                    return <Key
                        keyVal={key}
                        disabled={disabledLetters.includes(key)}
                        correct={correctLetters.includes(key)}
                        almost={almostLetters.includes(key)}
                    />
                })}
            </div>
            <div className="line2">
                {keys2.map((key) => {
                    return <Key
                        keyVal={key}
                        disabled={disabledLetters.includes(key)}
                        correct={correctLetters.includes(key)}
                        almost={almostLetters.includes(key)}
                    />
                })}
            </div>
            <div className="line3">
                <Key keyVal={"ENTER"} bigKey/>
                {keys3.map((key) => {
                    return <Key
                        keyVal={key}
                        disabled={disabledLetters.includes(key)}
                        correct={correctLetters.includes(key)}
                        almost={almostLetters.includes(key)}
                    />
                })}
                <Key keyVal={"DELETE"} bigKey/>
            </div>
        </div>
    )
}

export default Keyboard