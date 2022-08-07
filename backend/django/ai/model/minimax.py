from typing import List
from . import evaluator

DEPTH = 5


def minimax(
    big_board: List[str], board_idx: int, depth: int, is_maximizing: bool
) -> int:
    if depth == 0:
        return evaluator.heuristic(big_board)
    if is_maximizing:
        return
    else:
        return
