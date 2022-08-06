import { useEffect, useState } from "react";
import _ from "lodash";

import useBigBoard from "./useBigBoard";

import { Player } from "../../types";

const useGame = () => {
    const [AIMode, toggleAIMode] = useState(true);

    const [player, togglePlayer] = useState<Player>("Player1");
    // TODO: implement check for game win
    const [bigWinner, setBigWinner] = useState<Player | null>(null);
    const [activeBoard, setActiveBoard] = useState<number>(-1);

    const { bigBoard, winners, resetBoard, makeMove } = useBigBoard();

    useEffect(() => {
        if (AIMode && player === "Player2") {
            (async () => {
                const res = await fetch("http://127.0.0.1:8000/ai/", {
                    method: "POST",
                    headers: { "Content-Type": "text/plain" },
                    body: `${bigBoard
                        .map((board) =>
                            board.map((marker) => marker || ".").join("")
                        )
                        .join("#")}$${activeBoard}`
                });
                const body = await res.text();

                console.log(body);
            })();
        }
    }, [player]);

    const move = (boardIdx: number, cellIdx: number) => {
        if (makeMove(player, boardIdx, cellIdx)) {
            setActiveBoard(
                boardIdx !== cellIdx && !winners[cellIdx] ? cellIdx : -1
            );
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
