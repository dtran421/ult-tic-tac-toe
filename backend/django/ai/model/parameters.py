"""
Board markers (in ubsf input)
"""
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
Minimax hyperparameters
"""
PLIES = 6
DEPTH = PLIES  # ==> # of plies


"""
Monte Carlo hyperparameters
"""
SEARCH_TIME = 10 # ==> secs to search
