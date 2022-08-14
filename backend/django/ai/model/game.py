from typing import List, Tuple


from .parameters import (
    BOARD_LEN,
    BOARD_SIZE,
    EMPTY_MARKER,
    PLAYER1_MARKER,
    PLAYER1_WIN,
    PLAYER2_WIN,
    PLAYER2_MARKER,
)


def is_drawn(board: str) -> bool:
    """
    Determines if a small board is drawn. Must be called after check_win since
    it checks if there are any more empty cells.
    """
    for cell_idx in range(BOARD_LEN):
        if board[cell_idx] == EMPTY_MARKER:
            return False

    return True


def check_win(board: str) -> Tuple[bool, str]:
    """
    Determines if a small board is won.

    Returns a bool has_won and str winner indicating the marker ("X" or "O") of the winning player.
    """
    has_won = False
    winner = ""

    # check rows
    for r in range(0, BOARD_LEN, BOARD_SIZE):
        if board[r] != EMPTY_MARKER:
            check = True
            for c in range(1, BOARD_SIZE):
                check &= board[r] == board[r + c]
            has_won |= check
            winner = board[r] if check else winner

    # check cols
    for c in range(BOARD_SIZE):
        if board[c] != EMPTY_MARKER:
            check = True
            for r in range(BOARD_SIZE, BOARD_LEN, BOARD_SIZE):
                check &= board[c] == board[c + r]
            has_won |= check
            winner = board[c] if check else winner

    # check neg diag
    if board[0] != EMPTY_MARKER:
        check = True
        for d in range(BOARD_SIZE + 1, BOARD_LEN, BOARD_SIZE + 1):
            check &= board[0] == board[d]
        has_won |= check
        winner = board[0] if check else winner

    # check pos diag
    if board[BOARD_SIZE - 1] != EMPTY_MARKER:
        check = True
        for d in range(2 * BOARD_SIZE - 2, BOARD_LEN - BOARD_SIZE + 1, BOARD_SIZE - 1):
            check &= board[BOARD_SIZE - 1] == board[d]
        has_won |= check
        winner = board[BOARD_SIZE - 1] if check else winner

    return has_won, winner


def check_game_draw(big_board: List[str]) -> Tuple[bool, str]:
    """
    Determines if a (decompressed) big board is drawn. Must be called after check_game_win since
    it checks if there are any more empty boards.
    """
    from .utils import is_completed_board

    for board_idx in range(BOARD_LEN):
        if not is_completed_board(big_board[board_idx]):
            return False

    return True


def check_game_win(big_board: List[str]) -> Tuple[bool, str]:
    """
    Determines if a (decompressed) big board is won.

    Returns a bool has_won and str winner indicating the marker ("X" or "O") of the winning player, or "" if drawn or otherwise.
    """
    has_won = False
    winner = ""

    # check rows
    for r in range(0, BOARD_LEN, BOARD_SIZE):
        if big_board[r] == PLAYER1_WIN or big_board[r] == PLAYER2_WIN:
            check = True
            for c in range(1, BOARD_SIZE):
                check &= big_board[r] == big_board[r + c]
            has_won |= check
            winner = big_board[r] if check else winner

    # check cols
    for c in range(BOARD_SIZE):
        if big_board[c] == PLAYER1_WIN or big_board[c] == PLAYER2_WIN:
            check = True
            for r in range(BOARD_SIZE, BOARD_LEN, BOARD_SIZE):
                check &= big_board[c] == big_board[c + r]
            has_won |= check
            winner = big_board[c] if check else winner

    # check neg diag
    if big_board[0] == PLAYER1_WIN or big_board[0] == PLAYER2_WIN:
        check = True
        for d in range(BOARD_SIZE + 1, BOARD_LEN, BOARD_SIZE + 1):
            check &= big_board[0] == big_board[d]
        has_won |= check
        winner = big_board[0] if check else winner

    # check pos diag
    if (
        big_board[BOARD_SIZE - 1] == PLAYER1_WIN
        or big_board[BOARD_SIZE - 1] == PLAYER2_WIN
    ):
        check = True
        for d in range(2 * BOARD_SIZE - 2, BOARD_LEN - BOARD_SIZE + 1, BOARD_SIZE - 1):
            check &= big_board[BOARD_SIZE - 1] == big_board[d]
        has_won |= check
        winner = big_board[BOARD_SIZE - 1] if check else winner

    return has_won, winner


def make_move(
    big_board: str, board_idx: int, cell_idx: int, is_player_1: bool
) -> Tuple[str, int]:
    from .utils import (
        translate_board_idx,
        collapse_board,
        is_completed_board,
        is_empty_board,
    )

    translated_board_idx = translate_board_idx(big_board, board_idx)
    translated_cell_idx = translated_board_idx + cell_idx

    if is_empty_board(big_board[translated_board_idx]):
        big_board = (
            big_board[:translated_board_idx]
            + (EMPTY_MARKER * cell_idx)
            + (PLAYER1_MARKER if is_player_1 else PLAYER2_MARKER)
            + (EMPTY_MARKER * (BOARD_LEN - cell_idx - 1))
            + big_board[translated_board_idx + 1 :]
        )
    else:
        big_board = (
            big_board[:translated_cell_idx]
            + (PLAYER1_MARKER if is_player_1 else PLAYER2_MARKER)
            + big_board[translated_cell_idx + 1 :]
        )

    new_big_board = collapse_board(big_board, translated_board_idx)
    translated_board_idx = translate_board_idx(new_big_board, cell_idx)
    new_board_idx = (
        -1 if is_completed_board(new_big_board[translated_board_idx]) else cell_idx
    )

    return new_big_board, new_board_idx
