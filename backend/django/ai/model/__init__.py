import math
from typing import List, Tuple


from .parameters import DEPTH
from .utils import compress, is_player1


from .random_move import random_move
from .minimax import minimax
from .evaluator import heuristic
from .mcts import monte_carlo


def determine_move(
    big_board: List[str], board_idx: int, ai_mode: str
) -> Tuple[int, int]:
    new_big_board = compress(big_board)
    print(f"compressed board: {new_big_board}")

    if ai_mode == "Random":
        return random_move(new_big_board, board_idx)

    elif ai_mode == "Minimax":
        is_maximizing = is_player1("".join(big_board))
        best_move, score = minimax(
            new_big_board, board_idx, DEPTH, -math.inf, math.inf, is_maximizing
        )

        print(f"chosen move: {best_move}")
        print(f"eval: {score}")

        return best_move

    elif ai_mode == "Monte Carlo":
        is_player_1 = is_player1("".join(big_board))
        best_move = monte_carlo(new_big_board, board_idx, is_player_1)

        print(f"chosen move: {best_move}")
        print(f"eval: {heuristic(big_board, is_player_1)}")

        return best_move

    else:
        raise Exception("Error: invalid ai mode!")
