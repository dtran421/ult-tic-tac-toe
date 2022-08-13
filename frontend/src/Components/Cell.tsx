import { useContext, useEffect, useState } from "react";

import {
    BOARD_LENGTH,
    BOARD_SIZE,
    Marker,
    Player,
    PlayerMarker,
    PlayerType
} from "../../types";
import { GameContext } from "../Contexts";

interface CellProps {
    boardIdx: number;
    cellIdx: number;
    marker: Marker;
    active: boolean;
    winner: Marker;
}

const Cell = ({ boardIdx, cellIdx, marker, active, winner }: CellProps) => {
    const { playerTypes, player, move } = useContext(GameContext);

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
                    if (displayMarker === "") {
                        setDisplayMarker(PlayerMarker[player]);
                    }
                }}
                onMouseLeave={() => {
                    setTimeout(() => setDisplayMarker(marker), 150);
                }}
                className={`w-12 h-12 ${
                    player === "Player1"
                        ? "hover:bg-sky-400"
                        : "hover:bg-rose-400"
                } enabled:opacity-0 enabled:hover:opacity-100 disabled:opacity-100 disabled:bg-transparent text-white text-3xl font-semibold rounded-xl transition duration-100 ease-linear`}
                disabled={
                    marker !== "" ||
                    winner !== "" ||
                    !active ||
                    playerTypes[player] !== "Human"
                }
            >
                {displayMarker}
            </button>
        </div>
    );
};

export default Cell;
