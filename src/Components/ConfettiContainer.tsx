import type {JSX} from 'react';
import Confetti from 'react-confetti';

export default function ConfettiContainer(
    {isGameWon}: {isGameWon: boolean}
): null |JSX.Element {
    if (!isGameWon) {
        return null;
    } else {
        return (
            <Confetti
                recycle={false}
                numberOfPieces={1000}
            />
        )
    }
}