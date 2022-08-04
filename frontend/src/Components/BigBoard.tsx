import _ from "lodash";

import BoardGrid from "./BoardGrid";

import { Board, BoardSize, Player, Winner } from "../../types";

interface BigBoardProps {
    player: Player;
    bigBoard: Board[];
    activeBoard: number;
    winners: (Winner | null)[];
    move: (boardIdx: number, cellIdx: number) => void;
}

const BigBoard = ({
    player,
    bigBoard,
    activeBoard,
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
                                activeBoard === -1 || activeBoard === boardIdx
                            }
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BigBoard;
