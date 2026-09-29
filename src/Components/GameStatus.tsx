import type {JSX} from 'react'
import clsx from "clsx"
import { getFarewellText } from "../utils"
import { languages } from "../languages"

type GameStatusProps = {
    isGameWon: boolean,
    isGameLost: boolean,
    isGameOver: boolean,
    isLastGuessIncorrect: string | boolean,
    wrongGuessCount: number 
}

export default function GameStatus({
    isGameWon, isGameLost, isGameOver, isLastGuessIncorrect, wrongGuessCount
}: GameStatusProps) : JSX.Element {
    const gameStatusClass: string = clsx("game-status", {
        won: isGameWon,
        lost: isGameLost,
        farewell: !isGameOver && isLastGuessIncorrect
    });

    function renderGameStatus() {
        if (!isGameOver && isLastGuessIncorrect) {
            return (
                <p className="farewell-message">
                    {getFarewellText(languages[wrongGuessCount - 1].name)}
                </p>
            )
        }

        if (isGameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            )
        }
        if (isGameLost) {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </>
            )
        }

        return null
    }

    return(
        <section
            aria-live="polite"
            role="status"
            className={gameStatusClass}
        >
            {renderGameStatus()}
        </section>
    )
}