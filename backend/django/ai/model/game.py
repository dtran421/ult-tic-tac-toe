from typing import List, Tuple


from .parameters import (
    BOARD_LEN,
    BOARD_SIZE,
    EMPTY_MARKER,
    PLAYER1_MARKER,
    PLAYER2_MARKER,
    PLAYER2_SYMBOL,
)


def is_drawn(board: str) -> bool:
    for cell_idx in range(BOARD_LEN):
        if board[cell_idx] == ".":
            return False

    return True


def check_win(board: str) -> Tuple[str, bool]:
    winner = ""
    has_won = False

    # check rows
    for r in range(0, BOARD_LEN, BOARD_SIZE):
        if board[r] != ".":
            check = True
            for c in range(1, BOARD_SIZE):
                check &= board[r] == board[r + c]
            has_won |= check
            winner = board[r] if check else winner

    # check cols
    for c in range(BOARD_SIZE):
        if board[c] != ".":
            check = True
            for r in range(BOARD_SIZE, BOARD_LEN, BOARD_SIZE):
                check &= board[c] == board[c + r]
            has_won |= check
            winner = board[c] if check else winner

    # check neg diag
    if board[0] != ".":
        check = True
        for d in range(BOARD_SIZE + 1, BOARD_LEN, BOARD_SIZE + 1):
            check &= board[0] == board[d]
        has_won |= check
        winner = board[0] if check else winner

    # check pos diag
    if board[BOARD_SIZE - 1] != ".":
        check = True
        for d in range(2 * BOARD_SIZE - 2, BOARD_LEN - BOARD_SIZE + 1, BOARD_SIZE - 1):
            check &= board[BOARD_SIZE - 1] == board[d]
        has_won |= check
        winner = board[BOARD_SIZE - 1] if check else winner

    return winner, has_won


def check_game_win(big_board: List[str]):
    winner = ""
    has_won = False

    # check rows
    for r in range(0, BOARD_LEN, BOARD_SIZE):
        if big_board[r] == PLAYER1_MARKER or big_board[r] == PLAYER2_MARKER:
            check = True
            for c in range(1, BOARD_SIZE):
                check &= big_board[r] == big_board[r + c]
            has_won |= check
            winner = big_board[r] if check else winner

    # check cols
    for c in range(BOARD_SIZE):
        if big_board[c] == PLAYER1_MARKER or big_board[c] == PLAYER2_MARKER:
            check = True
            for r in range(BOARD_SIZE, BOARD_LEN, BOARD_SIZE):
                check &= big_board[c] == big_board[c + r]
            has_won |= check
            winner = big_board[c] if check else winner

    # check neg diag
    if big_board[0] == PLAYER1_MARKER or big_board[0] == PLAYER2_MARKER:
        check = True
        for d in range(BOARD_SIZE + 1, BOARD_LEN, BOARD_SIZE + 1):
            check &= big_board[0] == big_board[d]
        has_won |= check
        winner = big_board[0] if check else winner

    # check pos diag
    if (
        big_board[BOARD_SIZE - 1] == PLAYER1_MARKER
        or big_board[BOARD_SIZE - 1] == PLAYER2_MARKER
    ):
        check = True
        for d in range(2 * BOARD_SIZE - 2, BOARD_LEN - BOARD_SIZE + 1, BOARD_SIZE - 1):
            check &= big_board[BOARD_SIZE - 1] == big_board[d]
        has_won |= check
        winner = big_board[BOARD_SIZE - 1] if check else winner

    return winner, has_won


def make_move(big_board: str, board_idx: int, cell_idx: int) -> str:
    from .utils import translate_board_idx, collapse_board

    translated_board_idx = translate_board_idx(big_board, board_idx)
    translated_cell_idx = translated_board_idx + cell_idx

    if big_board[board_idx] == EMPTY_MARKER:
        big_board = (
            big_board[:board_idx]
            + ("." * cell_idx)
            + PLAYER2_SYMBOL
            + ("." * (BOARD_LEN - cell_idx - 1))
            + big_board[board_idx + 1 :]
        )
    else:
        big_board = (
            big_board[:translated_cell_idx]
            + PLAYER2_SYMBOL
            + big_board[translated_cell_idx + 1 :]
        )

    return collapse_board(big_board)
