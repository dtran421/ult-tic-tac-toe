from typing import List
import random
from .utils import is_empty_board, is_completed_board, translate_board_idx
from .game import BOARD_LEN


def random_move(big_board: str, board_idx: int):
    possible_cells = []

    if board_idx == -1:
        possible_boards = []
        board_idx = 0
        for board_i in range(BOARD_LEN):
            is_empty = is_empty_board(big_board[board_idx])
            if is_empty or not is_completed_board(big_board[board_idx]):
                possible_boards.append(board_i)
                board_idx += 1 if is_empty else BOARD_LEN
            else:
                board_idx += 1

        try:
            board_idx = random.choice(possible_boards)
        except:
            print("Error: no empty boards left")
            return -1, -1

    translated_board_idx = translate_board_idx(big_board, board_idx)

    if is_empty_board(big_board[translated_board_idx]):
        possible_cells = range(BOARD_LEN)
    else:
        for cell_idx in range(BOARD_LEN):
            if big_board[translated_board_idx + cell_idx] == ".":
                possible_cells.append(cell_idx)

    try:
        return board_idx, random.choice(possible_cells)
    except:
        print("Error: no possible moves in current board")
        return board_idx, -1
