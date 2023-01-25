import numpy as np

from .model.parameters import PLAYER1_MARKER, PLAYER1_WIN, PLAYER2_MARKER, PLAYER2_WIN

from .model import determine_move
from .model.utils import decompress, compress, is_completed_board
from .model.game import check_game_draw, check_game_win

NUM_EPOCHS = 5


def run_simulation():
    is_player_1 = True
    player1, player2 = "Random", "Monte Carlo"

    init_board = ".........#.........#.........#.........#.........#.........#.........#.........#.........$-1"
    params = init_board.split("$")
    big_board = params[0].split("#")
    board_idx = int(params[1])

    decompressed_big_board = decompress(compress(big_board))
    has_won, winner = check_game_win(decompressed_big_board)

    results = np.zeros(NUM_EPOCHS)
    for epoch in range(1, NUM_EPOCHS + 1):
        while not has_won:
            (board_i, cell_i), _ = determine_move(
                big_board, board_idx, player1 if is_player_1 else player2
            )

            marker = PLAYER1_MARKER if is_player_1 else PLAYER2_MARKER

            old_board_i = big_board[board_i]
            new_board_i = old_board_i[:cell_i] + marker + old_board_i[cell_i + 1:]
            big_board[board_i] = new_board_i  # type: ignore

            decompressed_big_board = decompress(compress(big_board))
            completed_board = is_completed_board(decompressed_big_board[cell_i])
            board_idx = cell_i if not completed_board else -1

            has_won, winner = check_game_win(decompressed_big_board)
            has_won |= check_game_draw(decompressed_big_board)
            is_player_1 = not is_player_1

        results[epoch - 1] = int(winner) if winner != "" else 0

        if epoch % 100 == 0:
            print(f"[epoch {epoch}]")
            print(f"Player 1 wins: {np.count_nonzero(results == int(PLAYER1_WIN))}")
            print(f"Player 2 wins: {np.count_nonzero(results == int(PLAYER2_WIN))}")
            print(f"Draws: {epoch - np.count_nonzero(results[:epoch])}", "\n")

    print("[results]")
    print(f"Player 1 wins: {np.count_nonzero(results == int(PLAYER1_WIN))}")
    print(f"Player 2 wins: {np.count_nonzero(results == int(PLAYER2_WIN))}")
    print(f"Draws: {results.size - np.count_nonzero(results)}")
