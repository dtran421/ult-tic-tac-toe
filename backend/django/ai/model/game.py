from typing import List, Tuple


BOARD_SIZE = 3


def is_drawn(board: List[str]) -> bool:
    for cell_idx in range(BOARD_SIZE * BOARD_SIZE):
        if not board[cell_idx]:
            return False

    return True


def check_win(board: List[str]) -> Tuple[str, bool]:
    winner = ""
    has_won = False

    # check rows
    for r in range(0, BOARD_SIZE * BOARD_SIZE, BOARD_SIZE):
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
            for r in range(BOARD_SIZE, BOARD_SIZE * BOARD_SIZE, BOARD_SIZE):
                check &= board[c] == board[c + r]
            has_won |= check
            winner = board[c] if check else winner

    # check neg diag
    if board[0] != ".":
        check = True
        for d in range(BOARD_SIZE + 1, BOARD_SIZE * BOARD_SIZE + 1, BOARD_SIZE + 1):
            check &= board[0] == board[d]
        has_won |= check
        winner = board[0] if check else winner

    # check pos diag
    if board[BOARD_SIZE - 1] != ".":
        check = True
        for d in range(
            2 * BOARD_SIZE - 2, BOARD_SIZE * BOARD_SIZE - BOARD_SIZE + 1, BOARD_SIZE - 1
        ):
            check &= board[BOARD_SIZE - 1] == board[d]
        has_won |= check
        winner = board[BOARD_SIZE - 1] if check else winner

    return winner, has_won
