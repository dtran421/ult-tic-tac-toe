import _ from "lodash";

import BoardGrid from "./BoardGrid";

import {
    Board,
    BOARD_LENGTH,
    BOARD_SIZE,
    Marker,
    Player,
    PlayerType,
    Winner
} from "../../types";

interface BigBoardProps {
    bigBoard: Board[];
    activeBoard: number;
    bigWinner: Winner | null;
    winners: Marker[];
}

const BigBoard = ({
    bigBoard,
    activeBoard,
    bigWinner,
    winners
}: BigBoardProps) => {
    return (
        <div className="max-w-2xl relative overflow-hidden flex justify-center bg-gray-300/30 rounded-xl p-2 mx-auto">
            <div className="grid grid-cols-3">
                {bigBoard.map((board, boardIdx) => (
                    <div
                        key={`board ${boardIdx}`}
                        className={`${
                            boardIdx % 3 ? "border-l-4 border-white" : ""
                        } ${
                            boardIdx < BOARD_LENGTH - BOARD_SIZE
                                ? "border-b-4 border-white"
                                : ""
                        } p-3`}
                    >
                        <BoardGrid
                            {...{
                                board,
                                boardIdx
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
