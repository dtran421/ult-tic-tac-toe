from typing import List
import random
from .utils import is_won_board
from .game import BOARD_SIZE


def random_move(big_board: List[str], board_idx: int):
    possible_cells = []

    if board_idx == -1:
        possible_boards = []
        for board_idx in range(BOARD_SIZE * BOARD_SIZE):
            if not is_won_board(big_board[board_idx]):
                possible_boards.append(board_idx)

        try:
            board_idx = random.choice(possible_boards)
        except:
            print("Error: no empty boards left")
            return -1, -1

        for cell_idx in range(BOARD_SIZE * BOARD_SIZE):
            if big_board[board_idx][cell_idx] == ".":
                possible_cells.append(cell_idx)

    else:
        for cell_idx in range(BOARD_SIZE * BOARD_SIZE):
            if big_board[board_idx][cell_idx] == ".":
                possible_cells.append(cell_idx)

    try:
        return board_idx, random.choice(possible_cells)
    except:
        print("Error: no possible moves in current board")
        return board_idx, -1
