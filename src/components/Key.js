import React, { useContext } from 'react'
import { AppContext } from '../App';

function Key({keyVal, bigKey, disabled, correct, almost}) {
    const { onSelectLetter, onDelete, onEnter } = useContext(AppContext);

    const selectLetter = () => {
        if (keyVal == "ENTER"){ // if player clicks the ENTER key
            onEnter()
        } else if (keyVal == "DELETE"){ // if player clicks the DELETE key
            onDelete()
        } else {
            onSelectLetter(keyVal)
        }
    }

    return (
        <div
            className='key'
            id={bigKey ? "big" : disabled ? "disabled" : correct ? "correct" : almost && "almost"}
            onClick={selectLetter}
        >
            {keyVal}
        </div>
    )
}

export default Key