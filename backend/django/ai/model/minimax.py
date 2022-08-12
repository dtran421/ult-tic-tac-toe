import math
from typing import Tuple

from .parameters import DEPTH
from .game import make_move
from .utils import get_open_cells
from .evaluator import heuristic


def minimax(
    big_board: str, board_idx: int, depth: int, is_maximizing: bool
) -> Tuple[int, int]:
    if depth == 0:
        score = heuristic(big_board, is_maximizing)
        return score, None

    possible_moves = get_open_cells(big_board, board_idx)
    best_move = possible_moves[0]
    score = -math.inf if is_maximizing else math.inf

    for board_i, cell_i in possible_moves:
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
            best_move = (board_i, cell_i)

    if depth == DEPTH:
        print(big_board, board_idx, score)

    return score, best_move
