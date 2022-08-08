from typing import List, Tuple

from .parameters import DEPTH, MODE
from .utils import compress
from .random_move import random_move
from .minimax import minimax


def determine_move(big_board: List[str], board_idx: int) -> Tuple[int, int]:
    big_board = compress(big_board)
    print(big_board)

    if MODE == 0:
        return random_move(big_board, board_idx)

    elif MODE == 1:
        return minimax(big_board, board_idx, DEPTH, False)
