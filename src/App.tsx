import { useState } from "react"
import { clsx } from "clsx"
import { languages } from "./languages"
import { getRandomWord } from "./utils"
import ConfettiContainer from "./Components/ConfettiContainer"
import Header from "./Components/Header"
import GameStatus from "./Components/GameStatus"
import AriaLiveStatus from "./Components/AriaLiveStatus"
import LanguageChips from "./Components/LanguageChips"
import WordLetters from "./Components/WordLetters"
import NewGame from "./Components/NewGame"
import Keyboard from "./Components/Keyboard"

export default function AssemblyEndgame() {
    // State values
    const [currentWord, setCurrentWord] = useState<string>((): string => getRandomWord())
    const [guessedLetters, setGuessedLetters] = useState<string[]>([])

    // Derived values
    const numGuessesLeft: number = languages.length - 1
    const wrongGuessCount: number =
        guessedLetters.filter((letter: string): boolean => !currentWord.includes(letter)).length
    const isGameWon: boolean =
        currentWord.split("").every((letter: string): boolean => guessedLetters.includes(letter))
    const isGameLost: boolean = wrongGuessCount >= numGuessesLeft
    const isGameOver: boolean = isGameWon || isGameLost
    const lastGuessedLetter: string = guessedLetters[guessedLetters.length - 1]
    const isLastGuessIncorrect: string | boolean = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

    // Static values
    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    function addGuessedLetter(letter: string): void {
        setGuessedLetters((prevLetters: string[]): string[] =>
            prevLetters.includes(letter) ?
                prevLetters :
                [...prevLetters, letter]
        )
    }

    function removeGuessedLetter(): void {
        setGuessedLetters([]);
    }

    function startNewGame(): void {
        setCurrentWord(getRandomWord())
        setGuessedLetters([])
    }

    return (
        <main>
            <ConfettiContainer isGameWon={isGameWon}/>
            <Header/>

            <GameStatus
                isGameWon={isGameWon}
                isGameLost={isGameLost}
                isGameOver={isGameOver}
                isLastGuessIncorrect={isLastGuessIncorrect}
                wrongGuessCount={wrongGuessCount}
            />

            <LanguageChips
                languages={languages}
                wrongGuessCount={wrongGuessCount}
            />

           <WordLetters
                currentWord={currentWord}
                isGameLost={isGameLost}
                guessedLetters={guessedLetters}
                removeGuessedLetter={removeGuessedLetter}
           />

            {/* Combined visually-hidden aria-live region for status updates */}
            <AriaLiveStatus
                currentWord={currentWord} 
                lastGuessedLetter={lastGuessedLetter} 
                numGuessesLeft={numGuessesLeft} 
                guessedLetters={guessedLetters}
            />

            <Keyboard
                alphabet={alphabet}
                addGuessedLetter={addGuessedLetter}
                guessedLetters={guessedLetters}
                currentWord={currentWord}
                isGameOver={isGameOver}
            />

            <NewGame
                isGameOver={isGameOver}
                startNewGame={startNewGame}
            />
        </main>
    )
}