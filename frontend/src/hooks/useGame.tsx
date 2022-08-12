import { useEffect, useState } from "react";
import _ from "lodash";

import useBigBoard from "./useBigBoard";

import {
    Board,
    BOARD_LENGTH,
    Marker,
    Player,
    PlayerMarker,
    PlayerType,
    Winner
} from "../../types";

const useGame = () => {
    const [playerTypes, setPlayerType] = useState<{
        [key in Player]: PlayerType;
    }>({
        Player1: "Human",
        Player2: "Minimax"
    });

    const [player, togglePlayer] = useState<Player>("Player1");
    const [canAIPlay, toggleAIPlay] = useState({
        Player1: true,
        Player2: true
    });

    const [bigWinner, setBigWinner] = useState<Winner | null>(null);
    const [activeBoard, setActiveBoard] = useState<number>(-1);

    const {
        bigBoard,
        winners,
        checkDraw,
        checkWin,
        updateBoard,
        resetBoard,
        makeMove
    } = useBigBoard();

    useEffect(() => {
        const [hasWon, winner] = checkWin(winners);
        if (hasWon) {
            setBigWinner(
                winner === PlayerMarker.Player1 ? "Player1" : "Player2"
            );
        }
        if (checkDraw(winners)) {
            setBigWinner("DRAW");
        }
    }, [bigBoard]);

    useEffect(() => {
        if (
            !bigWinner &&
            playerTypes[player] !== "Human" &&
            canAIPlay[player]
        ) {
            (async () => {
                const res = await fetch("http://127.0.0.1:8000/ai/", {
                    method: "POST",
                    headers: { "Content-Type": "text/plain" },
                    body: `${bigBoard
                        .map((board) =>
                            board.map((marker) => marker || ".").join("")
                        )
                        .join("#")}$${activeBoard}$${playerTypes[player]}`
                });
                const body = (await res.text())
                    .split("$")
                    .map((val) => parseInt(val));
                const [boardIdx, cellIdx] = body;

                if (boardIdx == -1 || cellIdx === -1) {
                    console.error("Error: invalid move attempt");
                    return;
                }

                move(boardIdx, cellIdx);
            })();
        }
    }, [playerTypes, player, bigWinner, canAIPlay]);

    const move = (boardIdx: number, cellIdx: number) => {
        const finishedBoard = makeMove(player, boardIdx, cellIdx);
        if (finishedBoard) {
            setActiveBoard(
                boardIdx !== cellIdx && !winners[cellIdx] ? cellIdx : -1
            );
        } else {
            setActiveBoard(!winners[cellIdx] ? cellIdx : -1);
        }

        togglePlayer(player === "Player1" ? "Player2" : "Player1");
    };

    const updatePlayer = (newBigBoard: Board[]) => {
        let p1Markers = 0;
        let p2Markers = 0;

        newBigBoard.forEach((board) =>
            board.forEach((marker) => {
                if (marker === PlayerMarker.Player1) {
                    p1Markers += 1;
                }
                if (marker === PlayerMarker.Player2) {
                    p2Markers += 1;
                }
            })
        );

        togglePlayer(p1Markers === p2Markers ? "Player1" : "Player2");
    };

    const loadBoard = (ubsfBoard: string) => {
        const params = ubsfBoard.split("$");
        const [bigBoardStr, boardIdx] = [params[0], parseInt(params[1])];

        if (
            bigBoardStr.length !=
                BOARD_LENGTH * BOARD_LENGTH + (BOARD_LENGTH - 1) ||
            boardIdx < -1 ||
            boardIdx >= BOARD_LENGTH
        ) {
            console.error("Error: invalid ubsf string!");
        }

        const newBigBoard = bigBoardStr
            .split("#")
            .map((board) =>
                board
                    .split("")
                    .map((char) =>
                        char === PlayerMarker.Player1 ||
                        char === PlayerMarker.Player2
                            ? char
                            : ""
                    )
            );

        updatePlayer(newBigBoard);
        updateBoard(newBigBoard);
        setActiveBoard(boardIdx);
    };

    const clear = () => {
        resetBoard();
        setActiveBoard(-1);
        togglePlayer("Player1");
        setBigWinner(null);
    };

    return {
        playerTypes,
        setPlayerType,
        canAIPlay,
        toggleAIPlay,
        bigBoard,
        activeBoard,
        bigWinner,
        winners,
        player,
        move,
        loadBoard,
        clear
    };
};

export default useGame;
