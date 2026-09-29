import type { JSX } from "react";

type NewGameProps = {
    isGameOver: boolean; 
    startNewGame: () => void
}

export default function NewGame(
    {isGameOver, startNewGame}: NewGameProps
):  null | JSX.Element{
    if (!isGameOver) {
        return null
    } else {
        return (
            <button
                className="new-game"
                onClick={startNewGame}
            >
                New Game
            </button>
        )
    }
}