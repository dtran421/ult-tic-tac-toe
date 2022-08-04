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
                        ? "border-blue-400/70"
                        : "border-red-400/70"
                    : "border-transparent"
            } transition duration-150 ease-in`}
        >
            {winner && (
                <div className="absolute top-1/2 left-1/2 w-full h-full flex justify-center items-center bg-gray-900/70 -translate-x-1/2 -translate-y-1/2">
                    <h1 className="text-5xl text-red-500">
                        {PlayerMarker[winner]}
                    </h1>
                </div>
            )}
            <div className="grid grid-cols-3">
                {board.map((marker, cellIdx) => (
                    <div
                        key={`cell ${cellIdx}`}
                        className={`flex justify-center items-center ${
                            cellIdx % 3 ? "border-l-2 border-white" : ""
                        } ${
                            cellIdx < BoardSize * BoardSize - BoardSize
                                ? "border-b-2 border-white"
                                : ""
                        } p-1`}
                    >
                        <button
                            onClick={() => {
                                move(boardIdx, cellIdx);
                            }}
                            className={`w-12 h-12 ${
                                player === "Player1"
                                    ? "hover:bg-blue-400/50"
                                    : "hover:bg-red-400/50"
                            } disabled:bg-transparent text-white text-3xl font-semibold rounded-xl transition duration-200 ease-linear`}
                            disabled={
                                marker !== "" || winner !== null || !active
                            }
                        >
                            {marker}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BoardGrid;
