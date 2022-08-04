import Cell from "./Cell";

import { Board, BoardSize, Player, PlayerMarker, Winner } from "../../types";

interface BoardProps {
    board: Board;
    boardIdx: number;
    active: boolean;
    winner: Winner | null;
    player: Player;
    move: (boardIdx: number, cellIdx: number) => void;
}

const BoardGrid = ({
    board,
    boardIdx,
    active,
    winner,
    player,
    move
}: BoardProps) => {
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
                            winner === "Player1"
                                ? "text-sky-500"
                                : "text-rose-500"
                        }`}
                    >
                        {PlayerMarker[winner]}
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
                            player,
                            winner,
                            move
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default BoardGrid;
