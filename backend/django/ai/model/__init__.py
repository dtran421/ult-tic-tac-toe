from typing import List, Tuple
from .utils import compress
from .random_move import random_move
from .minimax import minimax, DEPTH

"""
AI strategies
    0 = random
    1 = minimax
    2 = monte carlo
"""
MODE = 0


def determine_move(big_board: List[str], board_idx: int) -> Tuple[int, int]:
    big_board = compress(big_board)

    if MODE == 0:
        return random_move(big_board, board_idx)

    elif MODE == 1:
        return minimax(big_board, board_idx, DEPTH, True)
