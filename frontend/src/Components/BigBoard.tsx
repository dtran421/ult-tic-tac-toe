import _ from "lodash";

import BoardGrid from "./BoardGrid";

import { Board, BoardSize, Marker, Player } from "../../types";

interface BigBoardProps {
    player: Player;
    bigBoard: Board[];
    activeBoard: number;
    bigWinner: Player | null;
    winners: Marker[];
    move: (boardIdx: number, cellIdx: number) => void;
}

const BigBoard = ({
    player,
    bigBoard,
    activeBoard,
    bigWinner,
    winners,
    move
}: BigBoardProps) => {
    return (
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
                        <BoardGrid
                            {...{
                                board,
                                boardIdx,
                                player,
                                move
                            }}
                            winner={winners[boardIdx]}
                            active={
                                !bigWinner &&
                                (activeBoard === -1 || activeBoard === boardIdx)
                            }
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BigBoard;
