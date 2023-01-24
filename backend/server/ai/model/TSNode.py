import math
import random
from typing import Tuple, Union

from .parameters import PLAYER1_MARKER, PLAYER2_MARKER
from .utils import decompress, get_open_cells
from .game import check_game_draw, check_game_win, is_drawn, make_move


class TSNode:
    # exploration parameter, theoretically equal to √2, can be chosen empirically
    explore_param = math.sqrt(2)

    def __init__(
        self,
        parent: "TSNode" | None,
        big_board: str,
        board_idx: int,
        is_player_1: bool,
    ):
        self.parent = parent
        self.children: dict[Tuple[int, int], "TSNode"] = {}

        self.big_board = big_board
        self.board_idx = board_idx
        self.is_player_1 = is_player_1

        # number of wins
        self.wins = 0
        # number of simulations
        self.num_sims = 0

    def expand(self) -> Union["TSNode", None]:
        possible_moves = get_open_cells(self.big_board, self.board_idx)
        uninitialized_moves = [
            (board_idx, cell_idx)
            for board_idx, cell_idx in possible_moves
            if (board_idx, cell_idx) not in self.children
        ]
        if not uninitialized_moves:
            return None
        board_i, cell_i = random.choice(uninitialized_moves)

        new_big_board, new_board_idx = make_move(
            self.big_board, board_i, cell_i, self.is_player_1
        )
        new_child = TSNode(self, new_big_board, new_board_idx, not self.is_player_1)
        self.children[(board_i, cell_i)] = new_child

        return new_child

    def is_fully_expanded(self) -> bool:
        possible_moves = get_open_cells(self.big_board, self.board_idx)
        return len(possible_moves) == 0 and len(self.children) == len(possible_moves)

    def compute_ucb(self) -> float:
        """
        computes the Upper Confidence Bound applied to trees
        """
        if not self.parent:
            raise Exception("Cannot compute UCB for root!")

        # exploitation component (score avg = agg. score / # sims)
        exploit_comp = self.wins / self.num_sims

        # exploration component
        explore_comp = TSNode.explore_param * math.sqrt(
            (math.log(self.parent.num_sims) / self.num_sims)
        )

        return exploit_comp + explore_comp

    def update_stats(self, sim_winner: str):
        self.num_sims += 1

        if (sim_winner == PLAYER1_MARKER and self.is_player_1) or (
            sim_winner == PLAYER2_MARKER and not self.is_player_1
        ):
            self.wins += 1
        elif not sim_winner:
            self.wins += 0.5

    def select_best_child(self) -> "TSNode":
        best_child, max_uct = None, -math.inf
        for node in self.children.values():
            child_uct = node.compute_ucb()
            if child_uct >= max_uct:
                best_child, max_uct = node, child_uct

        if not best_child:
            raise Exception("Best child can't be empty")

        return best_child

    def choose_random_child(self) -> "TSNode":
        possible_moves = get_open_cells(self.big_board, self.board_idx)
        board_i, cell_i = random.choice(possible_moves)

        new_big_board, new_board_idx = make_move(
            self.big_board, board_i, cell_i, self.is_player_1
        )
        return TSNode(self, new_big_board, new_board_idx, not self.is_player_1)

    def is_terminal(self) -> Tuple[bool, str]:
        decompressed_big_board = decompress(self.big_board)
        has_won, winner = check_game_win(decompressed_big_board)
        return has_won or check_game_draw(decompressed_big_board), winner
