import math
from typing import Tuple

from .game import make_move
from .utils import get_open_cells, decompress
from .evaluator import heuristic


def minimax(
    big_board: str, board_idx: int, depth: int, is_maximizing: bool
) -> Tuple[int, int]:
    print(big_board, board_idx)

    if depth == 0:
        return heuristic(big_board), None

    best_board_idx, best_cell_idx = board_idx, -1
    score = -math.inf if is_maximizing else math.inf

    for board_i, cell_i in get_open_cells(big_board, board_idx):
        new_big_board, new_board_idx = make_move(
            big_board, board_i, cell_i, is_maximizing
        )

        new_score, _ = minimax(
            new_big_board,
            new_board_idx,
            depth - 1,
            not is_maximizing,
        )

        if (is_maximizing and new_score > score) or (
            not is_maximizing and new_score < score
        ):
            score = new_score
            best_board_idx, best_cell_idx = board_i, cell_i

    return score, (best_board_idx, best_cell_idx)
