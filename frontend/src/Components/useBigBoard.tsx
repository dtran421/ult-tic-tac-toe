import _ from "lodash";
import { useState } from "react";

import { Board, BoardSize, Player, PlayerMarker, Winner } from "../../types";

const useBigBoard = () => {
    const [bigBoard, setBigBoard] = useState<Board[]>(
        _.fill(
            Array(BoardSize * BoardSize),
            _.fill(Array(BoardSize * BoardSize), "")
        )
    );
    const [winners, setWinners] = useState<(Winner | null)[]>(
        _.fill(Array(BoardSize * BoardSize), null)
    );

    const isDrawn = (board: Board, boardIdx: number) => {
        for (let cellIdx = 0; cellIdx < BoardSize * BoardSize; cellIdx++) {
            if (!board[cellIdx]) {
                return false;
            }
        }
        setWinners((winners) => {
            winners[boardIdx] = "DRAW";
            return winners;
        });
        return true;
    };

    const checkWin = (board: Board, boardIdx: number, player: Player) => {
        let hasWon = false;

        // check rows
        for (let r = 0; r < BoardSize * BoardSize; r += BoardSize) {
            if (board[r]) {
                let check = true;
                for (let c = 1; c < BoardSize; c++) {
                    check &&= board[r] == board[r + c];
                }
                hasWon ||= check;
            }
        }

        // check cols
        for (let c = 0; c < BoardSize; c++) {
            if (board[c]) {
                let check = true;
                for (
                    let r = BoardSize;
                    r < BoardSize * BoardSize;
                    r += BoardSize
                ) {
                    check &&= board[c] == board[c + r];
                }
                hasWon ||= check;
            }
        }

        // check neg diag
        if (board[0]) {
            let check = true;
            for (
                let d = BoardSize + 1;
                d < BoardSize * BoardSize + 1;
                d += BoardSize + 1
            ) {
                check &&= board[0] == board[d];
            }
            hasWon ||= check;
        }

        // check pos diag
        if (board[BoardSize - 1]) {
            let check = true;
            for (
                let d = 2 * BoardSize - 2;
                d < BoardSize * BoardSize - BoardSize + 1;
                d += BoardSize - 1
            ) {
                check &&= board[BoardSize - 1] == board[d];
            }
            hasWon ||= check;
        }

        setWinners((winners) => {
            winners[boardIdx] = hasWon ? player : null;
            return winners;
        });
        return hasWon;
    };

    const makeMove = (player: Player, boardIdx: number, cellIdx: number) => {
        const newBigBoard = bigBoard.map((board, i) => {
            if (boardIdx == i) {
                board = board.map((marker, j) => {
                    if (!marker && cellIdx == j) {
                        return PlayerMarker[player];
                    } else {
                        return marker;
                    }
                });
            }
            return board;
        });
        setBigBoard(newBigBoard);
        if (!isDrawn(newBigBoard[boardIdx], boardIdx)) {
            return checkWin(newBigBoard[boardIdx], boardIdx, player);
        }
        return true;
    };

    const resetBoard = () => {
        setBigBoard(
            _.fill(
                Array(BoardSize * BoardSize),
                _.fill(Array(BoardSize * BoardSize), "")
            )
        );
        setWinners(_.fill(Array(BoardSize * BoardSize), null));
    };

    return { bigBoard, winners, resetBoard, makeMove };
};

export default useBigBoard;
