import { useEffect, useState } from "react";

import {
    BOARD_LENGTH,
    BOARD_SIZE,
    Marker,
    Player,
    PlayerMarker
} from "../../types";

interface CellProps {
    boardIdx: number;
    cellIdx: number;
    marker: Marker;
    active: boolean;
    player: Player;
    AIMode: boolean;
    winner: Marker;
    move: (boardIdx: number, cellIdx: number) => void;
}

const Cell = ({
    boardIdx,
    cellIdx,
    marker,
    active,
    player,
    AIMode,
    winner,
    move
}: CellProps) => {
    const [displayMarker, setDisplayMarker] = useState(marker);
    useEffect(() => {
        setDisplayMarker(marker);
    }, [marker]);

    return (
        <div
            className={`flex justify-center items-center ${
                cellIdx % 3 ? "border-l-2 border-white" : ""
            } ${
                cellIdx < BOARD_LENGTH - BOARD_SIZE
                    ? "border-b-2 border-white"
                    : ""
            } p-1`}
        >
            <button
                onClick={() => {
                    move(boardIdx, cellIdx);
                }}
                onMouseEnter={() => {
                    setDisplayMarker(PlayerMarker[player]);
                }}
                onMouseLeave={() => {
                    setDisplayMarker(marker);
                }}
                className={`w-12 h-12 ${
                    player === "Player1"
                        ? "hover:bg-sky-400"
                        : "hover:bg-rose-400"
                } disabled:bg-transparent text-white text-3xl font-semibold rounded-xl transition duration-200 ease-linear`}
                disabled={
                    marker !== "" ||
                    winner !== "" ||
                    !active ||
                    (AIMode && player === "Player2")
                }
            >
                {displayMarker}
            </button>
        </div>
    );
};

export default Cell;
