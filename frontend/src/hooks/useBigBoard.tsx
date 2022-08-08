import _ from "lodash";
import { useState } from "react";

import { Board, BoardSize, Marker, Player, PlayerMarker } from "../../types";

const useBigBoard = () => {
    const [bigBoard, setBigBoard] = useState<Board[]>(
        _.fill(
            Array(BoardSize * BoardSize),
            _.fill(Array(BoardSize * BoardSize), "")
        )
    );
    const [winners, setWinners] = useState<Marker[]>(
        _.fill(Array(BoardSize * BoardSize), "")
    );

    const isDrawn = (board: Board, boardIdx: number) => {
        for (let cellIdx = 0; cellIdx < BoardSize * BoardSize; cellIdx++) {
            if (!board[cellIdx]) {
                return false;
            }
        }
        setWinners((winners) => {
            winners[boardIdx] = PlayerMarker.DRAW;
            return winners;
        });
        return true;
    };

    const checkWin = (board: Board) => {
        let hasWon = false;

        // check rows
        for (let r = 0; r < BoardSize * BoardSize; r += BoardSize) {
            if (
                board[r] == PlayerMarker.Player1 ||
                board[r] == PlayerMarker.Player2
            ) {
                let check = true;
                for (let c = 1; c < BoardSize; c++) {
                    check &&= board[r] == board[r + c];
                }
                hasWon ||= check;
            }
        }

        // check cols
        for (let c = 0; c < BoardSize; c++) {
            if (
                board[c] == PlayerMarker.Player1 ||
                board[c] == PlayerMarker.Player2
            ) {
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
        if (
            board[0] == PlayerMarker.Player1 ||
            board[0] == PlayerMarker.Player2
        ) {
            let check = true;
            for (
                let d = BoardSize + 1;
                d < BoardSize * BoardSize;
                d += BoardSize + 1
            ) {
                check &&= board[0] == board[d];
            }
            hasWon ||= check;
        }

        // check pos diag
        if (
            board[BoardSize - 1] == PlayerMarker.Player1 ||
            board[BoardSize - 1] == PlayerMarker.Player2
        ) {
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

        return hasWon;
    };

    const checkBoardWin = (board: Board, boardIdx: number, player: Player) => {
        const hasWon = checkWin(board);
        setWinners((winners) => {
            if (hasWon) {
                winners[boardIdx] = PlayerMarker[player];
            }
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
            return checkBoardWin(newBigBoard[boardIdx], boardIdx, player);
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
        setWinners(_.fill(Array(BoardSize * BoardSize), ""));
    };

    return { bigBoard, winners, checkWin, resetBoard, makeMove };
};

export default useBigBoard;
