from typing import List, Tuple

from .parameters import DEPTH, MODE
from .utils import compress, decompress
from .random_move import random_move
from .minimax import minimax


def determine_move(big_board: List[str], board_idx: int) -> Tuple[int, int]:
    big_board = compress(big_board)
    print(f"compressed board: {big_board}")

    if MODE == 0:
        return random_move(big_board, board_idx)

    elif MODE == 1:
        _, best_move = minimax(big_board, board_idx, DEPTH, False)
        return best_move
