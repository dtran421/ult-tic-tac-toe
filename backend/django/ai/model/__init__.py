from typing import List, Tuple

from .parameters import DEPTH
from .utils import compress, is_player1
from .random_move import random_move
from .minimax import minimax


def determine_move(
    big_board: List[str], board_idx: int, ai_mode: str
) -> Tuple[int, int]:
    new_big_board = compress(big_board)
    print(f"compressed board: {new_big_board}")

    if ai_mode == "Random":
        return random_move(new_big_board, board_idx)

    elif ai_mode == "Minimax":
        is_maximizing = is_player1("".join(big_board))
        _, best_move = minimax(new_big_board, board_idx, DEPTH, is_maximizing)
        return best_move

    else:
        print("error: invalid ai mode!")
