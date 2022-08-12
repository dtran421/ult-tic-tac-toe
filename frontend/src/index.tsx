import { useContext, useState } from "react";

import { PlayerMarker } from "../types";

import BigBoard from "./components/BigBoard";
import PlayerSelector from "./components/PlayerSelector";
import GameContext from "./GameContext";
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
        playerTypes,
        setPlayerType,
        canAIPlay,
        toggleAIPlay,
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
            <div className="px-12">
                <h1 className="text-white text-6xl font-bold">
                    U3T.
                    <span className="text-blue-500">ai</span>
                </h1>
            </div>
            <div className="w-full flex flex-col justify-center space-y-4 px-8">
                <div className="flex justify-center">
                    <div className="flex justify-center items-center space-x-4">
                        <h1 className="text-3xl text-white text-semibold">
                            {turnText}
                        </h1>
                        <span
                            className={`flex items-center text-2xl text-white text-medium shadow-lg ${
                                bigWinner
                                    ? bigWinner === "DRAW"
                                        ? "bg-yellow-400 text-black"
                                        : bigWinner === "Player1"
                                        ? "bg-sky-500"
                                        : "bg-rose-500"
                                    : player === "Player1"
                                    ? "bg-sky-500 shadow-sky-500/60"
                                    : "bg-rose-500 shadow-rose-500/60"
                            } rounded-lg px-3 py-1`}
                        >
                            {bigWinner
                                ? PlayerMarker[bigWinner]
                                : PlayerMarker[player]}
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-x-4">
                    <div className="flex flex-col items-center space-y-10 pr-4">
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
                    </div>
                    <div className="col-span-2">
                        <GameContext.Provider
                            value={{ playerTypes, player, move }}
                        >
                            <BigBoard
                                {...{
                                    bigBoard,
                                    activeBoard,
                                    bigWinner,
                                    winners
                                }}
                            />
                        </GameContext.Provider>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <div className="grid grid-cols-2 space-x-4">
                            <button
                                onClick={() => clear()}
                                className="bg-blue-500 text-lg text-white font-medium rounded-lg px-6 py-2"
                            >
                                New Game
                            </button>
                            <button
                                onClick={() =>
                                    toggleAIPlay({
                                        Player1:
                                            playerTypes.Player1 !== "Human" &&
                                            !canAIPlay.Player1,
                                        Player2:
                                            playerTypes.Player2 !== "Human" &&
                                            !canAIPlay.Player2
                                    })
                                }
                                className="bg-blue-500 disabled:bg-gray-500 text-lg text-white font-medium rounded-lg px-6 py-2"
                                disabled={
                                    playerTypes.Player1 === "Human" &&
                                    playerTypes.Player2 === "Human"
                                }
                            >
                                {(playerTypes.Player1 !== "Human" &&
                                    canAIPlay.Player1) ||
                                (playerTypes.Player2 !== "Human" &&
                                    canAIPlay.Player2)
                                    ? "Pause"
                                    : "Play"}
                            </button>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <h2 className="text-white font-semibold">
                                Player 1
                            </h2>
                            <PlayerSelector
                                {...{ setPlayerType, toggleAIPlay }}
                                player="Player1"
                                activeType={playerTypes.Player1}
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <h2 className="text-white font-semibold">
                                Player 2
                            </h2>
                            <PlayerSelector
                                {...{ setPlayerType, toggleAIPlay }}
                                player="Player2"
                                activeType={playerTypes.Player2}
                            />
                        </div>
                    </div>
                </div>
                <div className="max-w-2xl flex flex-col items-center space-y-4 pt-8 mx-auto">
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
                    <p className="text-white text-center">
                        Moves are ascribed a positional indicator using
                        row-major order (row first, then column). In relations
                        to the big board, moves have two indicators, the first
                        for the big board and the second for the smaller board.
                        For example, a move in the middle left board in the top
                        right cell would be notated as{" "}
                        <span className="font-medium">ML-TR</span>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Index;
