import time
from typing import Tuple, Union


from .parameters import SEARCH_TIME
from .TSNode import TSNode


def traverse(root: TSNode):
    while root.is_fully_expanded():
        root = root.select_best_child()

    return root.expand() or root


def rollout_policy(node: TSNode):
    return node.choose_random_child()


def simulate(node: TSNode):
    is_terminal_node, winner = node.is_terminal()
    while not is_terminal_node:
        node = rollout_policy(node)
        is_terminal_node, winner = node.is_terminal()

    return winner


def backprop(node: Union[TSNode, None], sim_winner: str):
    while node:
        node.update_stats(sim_winner)
        node = node.parent


def select_best_move(root: TSNode) -> Tuple[int, int]:
    best_move, max_sims = None, 0
    # print(root.num_sims)
    for move in root.children:
        node = root.children[move]
        # print(f"move: {move}, ratio: {node.wins} / {node.num_sims}")
        if node.num_sims > max_sims:
            best_move, max_sims = move, node.num_sims

    if not best_move:
        raise Exception("Best move must exist!")

    return best_move


def monte_carlo(big_board: str, board_idx: int, is_player_1: bool):
    root = TSNode(None, big_board, board_idx, is_player_1)

    start_time, curr_time = time.time(), time.time()
    while curr_time - start_time < SEARCH_TIME:
        leaf_node = traverse(root)
        sim_winner = simulate(leaf_node)
        backprop(leaf_node, sim_winner)

        curr_time = time.time()

    return select_best_move(root)
