import { useState } from "react";

import { PlayerMarker } from "../types";
import { GameContext, PlayerContext } from "./Contexts";
import useGame from "./hooks/useGame";

import BigBoard from "./components/BigBoard";
import BoardNotation from "./components/BoardNotation";
import PlayerModule from "./components/PlayerModule";

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
                        <PlayerContext.Provider
                            value={{ playerTypes, setPlayerType, toggleAIPlay }}
                        >
                            <PlayerModule
                                {...{ canAIPlay }}
                                player="Player1"
                                isPlaying={player === "Player1"}
                            />
                            <PlayerModule
                                {...{ canAIPlay }}
                                player="Player2"
                                isPlaying={player === "Player2"}
                            />
                        </PlayerContext.Provider>
                    </div>
                </div>
                <BoardNotation />
            </div>
        </div>
    );
};

export default Index;
