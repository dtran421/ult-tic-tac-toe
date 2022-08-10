import { useState } from "react";
import { PlayerMarker } from "../types";
import BigBoard from "./components/BigBoard";
import useGame from "./hooks/useGame";

const Header = ({ text }: { text: string }) => (
    <div className="flex justify-center items-center">
        <p className="text-white">{text}</p>
    </div>
);

const MiniCell = ({
    text,
    br = true,
    bb = true
}: {
    text: string;
    br?: boolean;
    bb?: boolean;
}) => {
    let borderClass = "";
    if (br) {
        borderClass = "border-r-2 ";
    }
    if (bb) {
        borderClass += "border-b-2";
    }

    return (
        <div className={`flex justify-center ${borderClass} p-2`}>
            <p className="w-full text-center text-white font-medium bg-zinc-600/40 rounded-lg p-2">
                {text}
            </p>
        </div>
    );
};

const Index = () => {
    const {
        AIMode,
        toggleAIMode,
        bigBoard,
        activeBoard,
        bigWinner,
        winners,
        player,
        move,
        loadBoard,
        clear
    } = useGame();

    const [ubsfBoard, setUbsfStr] = useState("");

    let turnText = "";
    if (bigWinner) {
        if (bigWinner === "DRAW") {
            turnText = "It's a draw!";
        } else {
            turnText = `Player ${bigWinner === "Player1" ? "1" : "2"} won!`;
        }
    } else {
        turnText = `Player ${player === "Player1" ? 1 : 2}'s turn`;
    }

    return (
        <div className="w-full min-h-screen flex flex-col justify-center bg-zinc-800 py-8">
            <div className="w-full flex flex-col justify-center space-y-4 px-8">
                <div className="flex justify-center">
                    <div className="flex justify-center items-center space-x-4">
                        <h1 className="text-3xl text-white text-semibold">
                            {turnText}
                        </h1>
                        <span
                            className={`flex items-center text-2xl text-white text-medium ${
                                bigWinner
                                    ? bigWinner === "DRAW"
                                        ? "bg-yellow-400 text-black"
                                        : bigWinner === "Player1"
                                        ? "bg-sky-500"
                                        : "bg-rose-500"
                                    : player === "Player1"
                                    ? "bg-sky-500"
                                    : "bg-rose-500"
                            } border-2 border-gray-300 rounded-lg px-3 py-1`}
                        >
                            {bigWinner
                                ? PlayerMarker[bigWinner]
                                : PlayerMarker[player]}
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-x-4">
                    <div className="flex flex-col space-y-10 pr-4">
                        <div className="w-full flex flex-col items-center space-y-4">
                            <h2 className="text-lg font-medium text-white text-center">
                                Load game from UBSF string
                            </h2>
                            <textarea
                                onChange={(e) => setUbsfStr(e.target.value)}
                                className="w-full h-28 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-500 px-2 py-1"
                            />
                            <div>
                                <button
                                    onClick={() => loadBoard(ubsfBoard)}
                                    className="text-white font-medium bg-blue-500 rounded-lg px-4 py-2"
                                >
                                    Load Board
                                </button>
                            </div>
                        </div>
                        <div className="text-white bg-zinc-400/40 rounded-lg space-y-2 p-3">
                            <h2 className="font-medium text-center">
                                What is UBSF?
                            </h2>
                            <p className="text-sm">
                                UBSF stands for U3T (Ultimate Tic-Tac-Toe) Board
                                Standard Format. It's used to store the current
                                board state as well as the current board to
                                play.
                            </p>
                        </div>
                        <div className="flex flex-col items-center space-y-4">
                            <h2 className="text-lg font-medium text-white text-center">
                                Board Notation
                            </h2>
                            <div className="grid grid-cols-4 -ml-8">
                                <div />
                                <Header text="Left" />
                                <Header text="Middle" />
                                <Header text="Right" />
                                <Header text="Top" />
                                <MiniCell text="TL" />
                                <MiniCell text="TM" />
                                <MiniCell text="TR" br={false} />
                                <Header text="Middle" />
                                <MiniCell text="ML" />
                                <MiniCell text="MM" />
                                <MiniCell text="MR" br={false} />
                                <Header text="Bottom" />
                                <MiniCell text="BL" bb={false} />
                                <MiniCell text="BM" bb={false} />
                                <MiniCell text="BR" br={false} bb={false} />
                            </div>
                            <p className="text-white">
                                Moves are ascribed a positional indicator using
                                row-major order (row first, then column). In
                                relations to the big board, moves have two
                                indicators, the first for the big board and the
                                second for the smaller board. For example, a
                                move in the middle left board in the top right
                                cell would be notated as{" "}
                                <span className="font-medium">ML-TR</span>.
                            </p>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <BigBoard
                            {...{
                                player,
                                AIMode,
                                bigBoard,
                                activeBoard,
                                bigWinner,
                                winners,
                                move
                            }}
                        />
                    </div>
                    <div className="flex flex-col space-y-4">
                        <div>
                            <button
                                onClick={() => clear()}
                                className="bg-blue-500 text-lg text-white font-medium rounded-lg px-6 py-2"
                            >
                                New Game
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={() => toggleAIMode(!AIMode)}
                                className={`${
                                    AIMode ? "bg-blue-500" : "bg-gray-500"
                                } text-lg text-white font-semibold rounded-lg px-6 py-2 transition duration-100 ease-linear`}
                            >
                                AI {AIMode ? "On" : "Off"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
