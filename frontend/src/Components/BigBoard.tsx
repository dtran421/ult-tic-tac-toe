import _ from "lodash";

import useGame from "./useGame";
import Board from "./BoardGrid";

import { BoardSize, PlayerMarker } from "../../types";

const BigBoard = () => {
    const {
        AIMode,
        toggleAIMode,
        bigBoard,
        activeBoard,
        winners,
        player,
        move,
        clear
    } = useGame();

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-3">
                <div>
                    <button
                        onClick={() => clear()}
                        className="bg-blue-500 text-lg text-white font-medium rounded-lg px-6 py-2"
                    >
                        Clear
                    </button>
                </div>
                <div className="flex justify-center items-center">
                    <h1 className="text-3xl text-white text-semibold">
                        Player {player === "Player1" ? 1 : 2}'s turn [
                        {PlayerMarker[player]}]
                    </h1>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={() => toggleAIMode(!AIMode)}
                        className={`${
                            AIMode ? "bg-blue-500" : "bg-gray-500"
                        } text-lg text-white font-semibold rounded-lg px-6 py-2 transition duration-100 ease-linear`}
                    >
                        AI
                    </button>
                </div>
            </div>
            <div className="relative overflow-hidden flex justify-center bg-gray-300/30 rounded-xl p-2">
                <div className="grid grid-cols-3">
                    {bigBoard.map((board, boardIdx) => (
                        <div
                            key={`board ${boardIdx}`}
                            className={`${
                                boardIdx % 3 ? "border-l-4 border-white" : ""
                            } ${
                                boardIdx < BoardSize * BoardSize - BoardSize
                                    ? "border-b-4 border-white"
                                    : ""
                            } p-3`}
                        >
                            <Board
                                {...{
                                    board,
                                    boardIdx,
                                    player,
                                    move
                                }}
                                winner={winners[boardIdx]}
                                active={
                                    activeBoard === -1 ||
                                    activeBoard === boardIdx
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BigBoard;
