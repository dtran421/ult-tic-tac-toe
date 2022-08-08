import math

from .game import make_move
from .utils import get_open_cells
from .evaluator import heuristic


def minimax(big_board: str, board_idx: int, depth: int, is_maximizing: bool) -> int:
    if depth == 0:
        return heuristic(big_board, board_idx)

    score = -math.inf if is_maximizing else math.inf
    if is_maximizing:
        for board_idx, cell_idx in get_open_cells(big_board):
            score = max(
                score,
                minimax(
                    make_move(big_board, board_idx, cell_idx),
                    depth - 1,
                    not is_maximizing,
                ),
            )
    else:
        for board_idx, cell_idx in get_open_cells(big_board):
            score = min(
                score,
                minimax(
                    make_move(big_board, board_idx, cell_idx),
                    depth - 1,
                    not is_maximizing,
                ),
            )
    return score
