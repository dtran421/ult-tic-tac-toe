from typing import List
from .game import BOARD_SIZE, check_win


def compress(big_board: List[str]) -> List[str]:
    for board_idx in range(BOARD_SIZE * BOARD_SIZE):
        winner, has_won = check_win(big_board[board_idx])
        if has_won:
            big_board[board_idx] = winner

    return big_board


def is_won_board(board: str) -> bool:
    """
    a board is won if, after compression, it has only one marker in it (the symbolic winning marker)
    """
    
    return len(board) == 1
