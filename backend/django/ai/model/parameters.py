PLAYER1_MARKER = "X"
PLAYER2_MARKER = "O"
EMPTY_MARKER = "."

"""
Board metadata
"""
BOARD_SIZE = 3
BOARD_LEN = BOARD_SIZE * BOARD_SIZE


"""
Compression symbols
"""
PLAYER1_WIN = "1"
PLAYER2_WIN = "2"

DRAW_SYMBOL = "%"
EMPTY_SYMBOL = "@"


"""
AI strategies
    0 = random
    1 = minimax
    2 = monte carlo
"""
MODE = 1


"""
Minimax hyperparameters
"""
PLIES = 3  # needs to be odd (to account for player 1 moving first)
DEPTH = PLIES  # ==> # of plies
