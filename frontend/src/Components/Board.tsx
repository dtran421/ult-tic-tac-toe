import useGame from "./useGame";

import { BoardIndex } from "../../types";

const Board = () => {
    const { player, board, winner, winningMarker, move } = useGame();

    return (
        <div className="relative overflow-hidden flex justify-center bg-gray-300/30 rounded-xl p-4">
            {winner && (
                <div className="absolute top-1/2 left-1/2 w-full h-full flex justify-center items-center bg-gray-900/70 -translate-x-1/2 -translate-y-1/2">
                    <h1 className="text-9xl text-red-500">{winningMarker}</h1>
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
                                <button
                                    onClick={() =>
                                        move(i as BoardIndex, j as BoardIndex)
                                    }
                                    className={`w-40 h-40 ${
                                        player === "Player1"
                                            ? "hover:bg-green-400/50"
                                            : "hover:bg-red-400/50"
                                    } disabled:bg-transparent text-white text-7xl font-semibold rounded-xl transition duration-200 ease-linear`}
                                    disabled={marker !== "" || winner !== null}
                                >
                                    {marker}
                                </button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Board;
