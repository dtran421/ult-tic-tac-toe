import _ from "lodash";
import { useState } from "react";

import {
    Board,
    BOARD_LENGTH,
    BOARD_SIZE,
    Marker,
    Player,
    PlayerMarker
} from "../../types";

const useBigBoard = () => {
    const [bigBoard, setBigBoard] = useState<Board[]>(
        _.fill(Array(BOARD_LENGTH), _.fill(Array(BOARD_LENGTH), ""))
    );
    const [winners, setWinners] = useState<Marker[]>(
        _.fill(Array(BOARD_LENGTH), "")
    );

    const checkDraw = (board: Board) => {
        for (let cellIdx = 0; cellIdx < BOARD_LENGTH; cellIdx++) {
            if (!board[cellIdx]) {
                return false;
            }
        }
        return true;
    };

    const checkWin = (board: Board): [boolean, Marker] => {
        let hasWon = false;
        let winner: Marker = "";

        // check rows
        for (let r = 0; r < BOARD_LENGTH; r += BOARD_SIZE) {
            if (
                board[r] == PlayerMarker.Player1 ||
                board[r] == PlayerMarker.Player2
            ) {
                let check = true;
                for (let c = 1; c < BOARD_SIZE; c++) {
                    check &&= board[r] == board[r + c];
                }
                hasWon ||= check;
                winner = check ? board[r] : winner;
            }
        }

        // check cols
        for (let c = 0; c < BOARD_SIZE; c++) {
            if (
                board[c] == PlayerMarker.Player1 ||
                board[c] == PlayerMarker.Player2
            ) {
                let check = true;
                for (let r = BOARD_SIZE; r < BOARD_LENGTH; r += BOARD_SIZE) {
                    check &&= board[c] == board[c + r];
                }
                hasWon ||= check;
                winner = check ? board[c] : winner;
            }
        }

        // check neg diag
        if (
            board[0] == PlayerMarker.Player1 ||
            board[0] == PlayerMarker.Player2
        ) {
            let check = true;
            for (
                let d = BOARD_SIZE + 1;
                d < BOARD_LENGTH;
                d += BOARD_SIZE + 1
            ) {
                check &&= board[0] == board[d];
            }
            hasWon ||= check;
            winner = check ? board[0] : winner;
        }

        // check pos diag
        if (
            board[BOARD_SIZE - 1] == PlayerMarker.Player1 ||
            board[BOARD_SIZE - 1] == PlayerMarker.Player2
        ) {
            let check = true;
            for (
                let d = 2 * BOARD_SIZE - 2;
                d < BOARD_LENGTH - BOARD_SIZE + 1;
                d += BOARD_SIZE - 1
            ) {
                check &&= board[BOARD_SIZE - 1] == board[d];
            }
            hasWon ||= check;
            winner = check ? board[BOARD_SIZE - 1] : winner;
        }

        return [hasWon, winner];
    };

    const checkBoardDraw = (board: Board, boardIdx: number) => {
        const isDrawn = checkDraw(board);
        if (isDrawn) {
            setWinners((winners) => {
                winners[boardIdx] = PlayerMarker.DRAW;
                return winners;
            });
        }
        return isDrawn;
    };

    const checkBoardWin = (board: Board, boardIdx: number) => {
        const [hasWon, winner] = checkWin(board);
        if (hasWon) {
            setWinners((winners) => {
                winners[boardIdx] = winner;
                return winners;
            });
        }
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

        return (
            checkBoardWin(newBigBoard[boardIdx], boardIdx) ||
            checkBoardDraw(newBigBoard[boardIdx], boardIdx)
        );
    };

    const updateBoard = (newBigBoard: Board[]) => {
        setBigBoard(newBigBoard);

        setWinners((winners) => {
            _.times(BOARD_LENGTH, (boardIdx: number) => {
                const [_, winner] = checkWin(newBigBoard[boardIdx]);
                winners[boardIdx] = winner;
            });
            return winners;
        });
    };

    const resetBoard = () => {
        setBigBoard(
            _.fill(Array(BOARD_LENGTH), _.fill(Array(BOARD_LENGTH), ""))
        );
        setWinners(_.fill(Array(BOARD_LENGTH), ""));
    };

    return {
        bigBoard,
        winners,
        checkDraw,
        checkWin,
        updateBoard,
        resetBoard,
        makeMove
    };
};

export default useBigBoard;
