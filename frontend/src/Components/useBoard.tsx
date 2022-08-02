import { useState } from "react";

import { Board, BoardIndex, BoardSize, Marker } from "../../types";

const useBoard = () => {
    const [board, setBoard] = useState<Board>([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]);

    const checkWin = (board: Board) => {
        let hasWon = false;

        // check rows
        for (let r = 0; r < BoardSize; r++) {
            if (
                board[r][0] &&
                board[r][0] === board[r][1] &&
                board[r][1] === board[r][2]
            ) {
                hasWon = true;
            }
        }

        // check cols
        for (let c = 0; c < BoardSize; c++) {
            if (
                board[0][c] &&
                board[0][c] === board[1][c] &&
                board[1][c] === board[2][c]
            ) {
                hasWon = true;
            }
        }

        // check neg diag
        if (
            board[0][0] &&
            board[0][0] === board[1][1] &&
            board[1][1] === board[2][2]
        ) {
            hasWon = true;
        }

        // check pos diag
        if (
            board[2][0] &&
            board[2][0] === board[1][1] &&
            board[1][1] === board[0][2]
        ) {
            hasWon = true;
        }

        return hasWon;
    };

    const makeMove = (
        playerMarker: Marker,
        r: BoardIndex,
        c: BoardIndex
    ): boolean => {
        const newBoard = board.map((row, i) =>
            row.map((marker, j) => {
                if (!marker && r == i && c == j) {
                    return playerMarker;
                } else {
                    return marker;
                }
            })
        );
        setBoard(newBoard);
        return checkWin(newBoard);
    };

    return { board, setBoard, makeMove };
};

export default useBoard;
