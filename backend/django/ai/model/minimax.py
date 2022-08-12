import math
from typing import Tuple

from .parameters import DEPTH, PLAYER1_WIN
from .game import check_game_win, make_move
from .utils import get_open_cells, decompress
from .evaluator import heuristic, heuristics_sort


def minimax(
    big_board: str,
    board_idx: int,
    depth: int,
    alpha: int,
    beta: int,
    is_maximizing: bool,
) -> Tuple[int, int]:
    decompressed_big_board = decompress(big_board)
    has_won, winner = check_game_win(decompressed_big_board)

    if has_won:
        return None, math.inf if winner == PLAYER1_WIN else -math.inf

    if depth == 0:
        score = heuristic(decompressed_big_board, is_maximizing)
        return None, score

    decompressed_big_board = None

    possible_moves = get_open_cells(big_board, board_idx)
    # this implies the game is drawn, since no valid moves remain
    if not possible_moves:
        return None, -20 if is_maximizing else 20

    if depth >= DEPTH - 1:
        possible_moves = heuristics_sort(big_board, possible_moves, is_maximizing)

    best_move = possible_moves[0]
    score = -math.inf if is_maximizing else math.inf

    for board_i, cell_i in possible_moves:
        new_big_board, new_board_idx = make_move(
            big_board, board_i, cell_i, is_maximizing
        )

        _, new_score = minimax(
            new_big_board,
            new_board_idx,
            depth - 1,
            alpha,
            beta,
            not is_maximizing,
        )

        if (is_maximizing and new_score > score) or (
            not is_maximizing and new_score < score
        ):
            score = new_score
            best_move = (board_i, cell_i)

        if (is_maximizing and score >= beta) or (not is_maximizing and score <= alpha):
            break

        if depth == DEPTH and board_idx != -1:
            print(f"move: {(board_i, cell_i)}, eval: {new_score}")

        if is_maximizing:
            alpha = max(alpha, score)
        else:
            beta = min(beta, score)

    return best_move, score
