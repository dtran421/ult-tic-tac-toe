from typing import List, Tuple

from .parameters import (
    EMPTY_MARKER,
    PLAYER1_MARKER,
    PLAYER1_WIN,
    PLAYER2_MARKER,
    PLAYER2_WIN,
    EMPTY_SYMBOL,
    DRAW_SYMBOL,
)
from .game import BOARD_LEN, is_drawn, check_win


def is_player1(big_board: str) -> bool:
    p1_markers = p2_markers = 0

    for marker in big_board:
        if marker == PLAYER1_MARKER:
            p1_markers += 1
        if marker == PLAYER2_MARKER:
            p2_markers += 1

    return p1_markers == p2_markers


def check_empty(board: str) -> bool:
    for cell_idx in range(BOARD_LEN):
        if board[cell_idx] != ".":
            return False

    return True


def compress(big_board: List[str]) -> str:
    new_big_board = ""
    for board in big_board:
        if check_empty(board):
            new_big_board += EMPTY_SYMBOL
        else:
            winner, has_won = check_win(board)
            if has_won:
                new_big_board += (
                    PLAYER1_WIN if winner == PLAYER1_MARKER else PLAYER2_WIN
                )
            elif is_drawn(board):
                new_big_board += DRAW_SYMBOL
            else:
                new_big_board += board

    return new_big_board


def decompress(big_board: str) -> List[str]:
    new_big_board = [""] * BOARD_LEN
    i = 0
    for board_i in range(BOARD_LEN):
        if is_completed_board(big_board[i]) or is_empty_board(big_board[i]):
            new_big_board[board_i] = big_board[i]
            i += 1
        else:
            new_big_board[board_i] = big_board[i : i + BOARD_LEN]
            i += BOARD_LEN

    return new_big_board


def is_empty_board(board: str) -> bool:
    return board == EMPTY_SYMBOL


def is_completed_board(board: str) -> bool:
    """
    a board is completed if, after compression, it has only one marker in it (the symbolic winning marker or drawn marker)
    """

    return board == PLAYER1_WIN or board == PLAYER2_WIN or board == DRAW_SYMBOL


def translate_board_idx(big_board: str, board_idx: int) -> int:
    new_board_idx = 0
    for _ in range(board_idx):
        if is_empty_board(big_board[new_board_idx]) or is_completed_board(
            big_board[new_board_idx]
        ):
            new_board_idx += 1
        else:
            new_board_idx += BOARD_LEN

    return new_board_idx


def get_open_cells(big_board: str, board_idx: int) -> List[Tuple[int, int]]:
    cells = []

    if board_idx == -1:
        board_idx = 0
        for board_i in range(BOARD_LEN):
            if is_completed_board(big_board[board_idx]):
                board_idx += 1
            elif is_empty_board(big_board[board_idx]):
                cells.extend([(board_i, cell_idx) for cell_idx in range(BOARD_LEN)])
                board_idx += 1
            else:
                for cell_idx in range(BOARD_LEN):
                    if big_board[board_idx + cell_idx] == EMPTY_MARKER:
                        cells.append((board_i, cell_idx))
                board_idx += BOARD_LEN

    else:
        new_board_idx = translate_board_idx(big_board, board_idx)
        if is_empty_board(big_board[new_board_idx]):
            cells = [(board_idx, cell_idx) for cell_idx in range(BOARD_LEN)]
        else:
            for cell_idx in range(BOARD_LEN):
                if big_board[new_board_idx + cell_idx] == EMPTY_MARKER:
                    cells.append((board_idx, cell_idx))

    return cells


def collapse_board(big_board: str, translated_board_idx: int) -> str:
    winner, has_won = check_win(
        big_board[translated_board_idx : translated_board_idx + BOARD_LEN]
    )
    if has_won:
        big_board = (
            big_board[:translated_board_idx]
            + (PLAYER1_WIN if winner == PLAYER1_MARKER else PLAYER2_WIN)
            + big_board[translated_board_idx + BOARD_LEN :]
        )

    elif is_drawn(big_board[translated_board_idx : translated_board_idx + BOARD_LEN]):
        big_board = (
            big_board[:translated_board_idx]
            + DRAW_SYMBOL
            + big_board[translated_board_idx + BOARD_LEN :]
        )

    return big_board
