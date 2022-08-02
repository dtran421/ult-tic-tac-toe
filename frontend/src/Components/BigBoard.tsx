import _ from "lodash";

import useGame from "./useGame";
import Board from "./Board";

import { BoardIndex, PlayerMarker } from "../../types";

const BigBoard = () => {
    const { board, winner, winningMarker, move, clear } = useGame();

    return (
        <div className="max-w-5xl space-y-4 mx-auto">
            <div className="flex">
                <button
                    onClick={() => clear()}
                    className="bg-blue-500 text-white font-medium rounded-lg px-6 py-3"
                >
                    Clear
                </button>
            </div>
            <div className="relative overflow-hidden flex justify-center bg-gray-300/30 rounded-xl p-4">
                {winner && (
                    <div className="absolute top-1/2 left-1/2 w-full h-full flex justify-center items-center bg-gray-900/70 -translate-x-1/2 -translate-y-1/2">
                        <h1 className="text-9xl text-red-500">
                            {winningMarker}
                        </h1>
                    </div>
                )}
                <div className={`grid grid-cols-3 divide-y-4`}>
                    {board.map((row, i) => (
                        <div
                            id={`row ${i}`}
                            key={`row ${i}`}
                            className="flex col-span-3 py-4 divide-x-4"
                        >
                            {row.map((marker, j) => (
                                <div
                                    id={`cell ${i} ${j}`}
                                    key={`cell ${i} ${j}`}
                                    className="px-4"
                                >
                                    <Board />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BigBoard;
