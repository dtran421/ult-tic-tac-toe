from typing import List, Tuple

from .parameters import PLAYER1_MARKER, PLAYER2_MARKER, EMPTY_MARKER, DRAW_MARKER
from .game import BOARD_LEN, is_drawn, check_win


def check_empty(board: str) -> bool:
    for cell_idx in range(BOARD_LEN):
        if board[cell_idx] != ".":
            return False

    return True


def compress(big_board: List[str]) -> str:
    for board_idx in range(BOARD_LEN):
        if check_empty(big_board[board_idx]):
            big_board[board_idx] = EMPTY_MARKER
        else:
            winner, has_won = check_win(big_board[board_idx])
            if has_won:
                big_board[board_idx] = (
                    PLAYER1_MARKER if winner == "X" else PLAYER2_MARKER
                )
            elif is_drawn(big_board[board_idx]):
                big_board[board_idx] = DRAW_MARKER

    return "".join(big_board)


def decompress(big_board: str, board_idx: int) -> List[str]:
    new_big_board = [""] * BOARD_LEN
    i = 0
    for board_i in range(BOARD_LEN):
        if is_completed_board(big_board[board_idx]):
            new_big_board[board_i] = big_board[i]
            i += 1
        else:
            i += BOARD_LEN

    return new_big_board


def is_empty_board(board: str) -> bool:
    return board == EMPTY_MARKER


def is_completed_board(board: str) -> bool:
    """
    a board is completed if, after compression, it has only one marker in it (the symbolic winning marker or drawn marker)
    """

    return board == PLAYER1_MARKER or board == PLAYER2_MARKER or board == DRAW_MARKER


def translate_board_idx(big_board: str, board_idx: int) -> int:
    new_board_idx = 0
    for _ in range(board_idx):
        if is_empty_board(big_board[board_idx]) or is_completed_board(
            big_board[new_board_idx]
        ):
            new_board_idx += 1
        else:
            new_board_idx += BOARD_LEN

    return new_board_idx


def get_open_cells(big_board: str) -> List[Tuple[int, int]]:
    cells = []
    board_idx = 0
    for board_i in range(BOARD_LEN):
        if is_completed_board(big_board[board_idx]):
            board_idx += 1
        else:
            if is_empty_board(big_board[board_idx]):
                cells.extend([(board_i, cell_idx) for cell_idx in range(BOARD_LEN)])
            else:
                for cell_idx in range(BOARD_LEN):
                    cells.append((board_i, cell_idx))
            board_idx += BOARD_LEN

    return cells


def collapse_board(big_board: str) -> str:
    board_idx = 0
    for _ in range(BOARD_LEN):
        winner, has_won = check_win(big_board[board_idx])
        if has_won:
            big_board = big_board[:board_idx] + (
                PLAYER1_MARKER if winner == "X" else PLAYER2_MARKER
            ) + big_board[board_idx + BOARD_LEN:]
            board_idx += 1

        elif is_drawn(big_board[board_idx]):
            big_board[board_idx] = DRAW_MARKER
            board_idx += 1

        else:
            board_idx += BOARD_LEN

    return big_board