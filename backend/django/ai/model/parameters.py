PLAYER2_SYMBOL = "O"

"""
Board metadata
"""
BOARD_SIZE = 3
BOARD_LEN = BOARD_SIZE * BOARD_SIZE


"""
Compression symbols
"""
PLAYER1_MARKER = "1"
PLAYER2_MARKER = "2"

DRAW_MARKER = "%"
EMPTY_MARKER = "@"


"""
AI strategies
    0 = random
    1 = minimax
    2 = monte carlo
"""
MODE = 0


"""
Minimax hyperparameters
"""
PLIES = 3  # needs to be odd (to account for player 1 moving first)
DEPTH = PLIES  # ==> # of plies
