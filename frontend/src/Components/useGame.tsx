import { useState } from "react";
import _ from "lodash";

import useBigBoard from "./useBigBoard";

import { Player } from "../../types";

const useGame = () => {
    const [AIMode, toggleAIMode] = useState(true);

    const [player, togglePlayer] = useState<Player>("Player1");
    const [bigWinner, setBigWinner] = useState<Player | null>(null);
    const [activeBoard, setActiveBoard] = useState<number>(-1);

    const { bigBoard, winners, resetBoard, makeMove } = useBigBoard();

    const move = (boardIdx: number, cellIdx: number) => {
        if (makeMove(player, boardIdx, cellIdx)) {
            setActiveBoard(boardIdx !== cellIdx ? cellIdx : -1);
        } else {
            setActiveBoard(!winners[cellIdx] ? cellIdx : -1);
        }

        togglePlayer(player === "Player1" ? "Player2" : "Player1");
    };

    const clear = () => {
        resetBoard();
        setActiveBoard(-1);
        togglePlayer("Player1");
    };

    return {
        AIMode,
        toggleAIMode,
        bigBoard,
        activeBoard,
        winners,
        player,
        move,
        clear
    };
};

export default useGame;
