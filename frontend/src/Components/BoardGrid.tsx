import { useContext } from "react";

import Cell from "./Cell";

import { Board, Marker, Player, PlayerMarker, PlayerType } from "../../types";
import GameContext from "../GameContext";

interface BoardProps {
    board: Board;
    boardIdx: number;
    active: boolean;
    winner: Marker;
}

const BoardGrid = ({ board, boardIdx, active, winner }: BoardProps) => {
    const { player } = useContext(GameContext);
    return (
        <div
            className={`relative overflow-hidden flex justify-center bg-gray-300/30 rounded-xl p-2 border-4 ${
                active && !winner
                    ? player === "Player1"
                        ? "border-sky-400/70"
                        : "border-rose-400/70"
                    : "border-transparent"
            } transition duration-150 ease-in`}
        >
            {winner && (
                <div className="absolute top-1/2 left-1/2 w-full h-full flex justify-center items-center bg-gray-900/70 -translate-x-1/2 -translate-y-1/2">
                    <h1
                        className={`text-5xl ${
                            winner === PlayerMarker.Player1
                                ? "text-sky-500"
                                : "text-rose-500"
                        }`}
                    >
                        {winner}
                    </h1>
                </div>
            )}
            <div className="grid grid-cols-3">
                {board.map((marker, cellIdx) => (
                    <Cell
                        key={`cell ${cellIdx}`}
                        {...{
                            boardIdx,
                            cellIdx,
                            marker,
                            active,
                            winner
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default BoardGrid;
