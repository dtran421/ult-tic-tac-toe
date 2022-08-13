import time


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


def backprop(node: TSNode, sim_winner: str):
    if node.parent:
        node.update_stats(sim_winner)
        backprop(node.parent, sim_winner)


def select_best_move(root: TSNode):
    best_move, max_sims = None, 0
    for move in root.children:
        node = root.children[move]
        if node.num_sims > max_sims:
            best_move = move

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
