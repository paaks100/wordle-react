import { createContext, useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board';
import GameOver from './components/GameOver';
import Keyboard from './components/Keyboard';
import { boardDefault, generateWordSet } from './Words';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [almostLetters, setAlmostLetters] = useState([]);
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false});
  const [correctWord, setCorrectWord] = useState("");

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord)
    });
  }, []);

  // when player clicks a letter
  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return; // if last letter of current attempt has been filled
    const newBoard = [...board]; // make change to board on each click
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal; // set value at that position to keyVal
    setBoard(newBoard);
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1}) // move to next letter
  }
  
  // when player clicks DELETE/Backspace
  const onDelete = () => {
    if (currAttempt.letterPos == 0) return; // there's no letter in the attempt yet
    const newBoard = [...board]; // make change to board on each click
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = ""; // clear letter behind
    setBoard(newBoard);
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1}) // move back by 1
  }

  // when player clicks ENTER
  const onEnter = () => {
    if (currAttempt.letterPos != 5) return; // if attempt not yet complete

    let currWord = "";
    for (let i = 0; i < 5; i++){
      currWord += board[currAttempt.attempt][i]; // append letters to currWord
    }

    (wordSet.has(currWord.toLowerCase())) // does wordSet contain currWord?
      ? setCurrAttempt({attempt: currAttempt.attempt + 1, letterPos: 0}) // if yes, move on to next attempt
      : alert("Word Not Found!"); // otherwise alert

    if (currWord.toLowerCase() == correctWord){
      setGameOver({gameOver: true, guessedWord: true})
      return;
    }

    (currAttempt.attempt == 5 && wordSet.has(currWord.toLowerCase())) // if last attempt is wrong
      && setGameOver({gameOver: true, guessedWord: false});
  };

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider value={{
        board,
        setBoard,
        currAttempt,
        setCurrAttempt,
        onSelectLetter,
        onDelete,
        onEnter,
        correctWord,
        disabledLetters,
        setDisabledLetters,
        almostLetters,
        setAlmostLetters,
        correctLetters,
        setCorrectLetters,
        setGameOver,
        gameOver
      }}>
        <div className='game'>
          <Board/>
          {gameOver.gameOver ? <GameOver/> : <Keyboard/>}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
