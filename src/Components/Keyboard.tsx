import type {JSX} from 'react'
import clsx from 'clsx';

type KeyboardProps = {
    alphabet: string; 
    addGuessedLetter: (letter: string) => void;  
    guessedLetters: string[];
    currentWord: string;
    isGameOver: boolean;
}

export default function Keyboard({
    alphabet, addGuessedLetter, guessedLetters, currentWord, isGameOver
}: KeyboardProps):  JSX.Element {
    const keyboardElements: JSX.Element[] = alphabet.split("").map(
        (letter: string): JSX.Element => {
        const isGuessed: boolean = guessedLetters.includes(letter)
        const isCorrect: boolean = isGuessed && currentWord.includes(letter)
        const isWrong: boolean = isGuessed && !currentWord.includes(letter)
        const className: string = clsx({
            correct: isCorrect,
            wrong: isWrong
        })

        return (
            <button
                className={className}
                key={letter}
                disabled={isGameOver}
                aria-disabled={guessedLetters.includes(letter)}
                aria-label={`Letter ${letter}`}
                onClick={(): void => addGuessedLetter(letter)}
            >
                {letter.toUpperCase()}
            </button>
        )
    });

    return (
        <section className="keyboard">
            {keyboardElements}
        </section>
    )
}