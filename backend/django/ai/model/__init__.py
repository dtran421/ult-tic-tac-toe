import math
from typing import List, Tuple


from .parameters import DEPTH
from .utils import compress, decompress, is_player1
from .game import make_move


from .random_move import random_move
from .minimax import minimax
from .evaluator import heuristic
from .mcts import monte_carlo


def determine_move(
    big_board: List[str], board_idx: int, ai_mode: str
) -> Tuple[int, int]:
    is_player_1 = is_player1("".join(big_board))
    new_big_board = compress(big_board)
    # print(f"compressed board: {new_big_board}")

    if ai_mode == "Random":
        move = random_move(new_big_board, board_idx)

        new_big_board, _ = make_move(new_big_board, move[0], move[1], is_player_1)
        score = heuristic(decompress(new_big_board), is_player_1)

        return move, score

    elif ai_mode == "Minimax":
        best_move, score = minimax(
            new_big_board, board_idx, DEPTH, -math.inf, math.inf, is_player_1
        )

        return best_move, score

    elif ai_mode == "Monte Carlo":
        best_move = monte_carlo(new_big_board, board_idx, is_player_1)

        new_big_board, _ = make_move(
            new_big_board, best_move[0], best_move[1], is_player_1
        )
        score = heuristic(decompress(new_big_board), is_player_1)

        return best_move, score

    else:
        raise Exception("Error: invalid ai mode!")
