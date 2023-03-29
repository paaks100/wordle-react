import wordBank from "./wordle-bank.txt"

export const boardDefault = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
];

// get words from txt file
export const generateWordSet = async () => {
    let wordSet; // all words from list
    let todaysWord; // random word for game
    await fetch(wordBank) // fetch content from file
        .then((response) => response.text()) // convert to string
        .then((result) => {
            const wordArr = result.split("\r\n"); // convert to array of words for each line
            todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)] // get random word
            wordSet = new Set(wordArr) // set containing wordArr
        });

    return { wordSet, todaysWord };
};