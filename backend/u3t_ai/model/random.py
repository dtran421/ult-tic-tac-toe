from typing import Tuple
import random
from .utils import get_open_cells


def random_move(big_board: str, board_idx: int) -> Tuple[int, int]:
    possible_cells = get_open_cells(big_board, board_idx)

    try:
        return random.choice(possible_cells)
    except IndexError:
        print("Error: no possible moves in current board")
        return board_idx, -1
