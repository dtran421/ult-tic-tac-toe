import math
from typing import List

from .parameters import (
    BOARD_LEN,
    BOARD_SIZE,
    DRAW_SYMBOL,
    EMPTY_SYMBOL,
    PLAYER1_MARKER,
    PLAYER1_WIN,
    PLAYER2_MARKER,
    PLAYER2_WIN,
)
from .utils import decompress
from .game import check_game_win, check_win


def compute_board_score_potential(p1_markers: int, p2_markers: int) -> int:
    score = 0

    if p2_markers == 2:
        score -= 5

    if p1_markers == 1 and p2_markers == 1:
        score -= 20

    return score


def compute_board_potential(board: str) -> int:
    score = 0

    # check rows
    p1_markers = p2_markers = 0
    for r in range(0, BOARD_LEN, BOARD_SIZE):
        for c in range(BOARD_SIZE):
            p1_markers += 1 if board[r + c] == PLAYER1_MARKER else 0
            p2_markers += 1 if board[r + c] == PLAYER2_MARKER else 0
    score += compute_board_score_potential(p1_markers, p2_markers)

    # check cols
    p1_markers = p2_markers = 0
    for c in range(BOARD_SIZE):
        for r in range(0, BOARD_LEN, BOARD_SIZE):
            p1_markers += 1 if board[c + r] == PLAYER1_MARKER else 0
            p2_markers += 1 if board[c + r] == PLAYER2_MARKER else 0
    score += compute_board_score_potential(p1_markers, p2_markers)

    # check neg diag
    p1_markers = p2_markers = 0
    for d in range(0, BOARD_LEN, BOARD_SIZE + 1):
        p1_markers += 1 if board[d] == PLAYER1_MARKER else 0
        p2_markers += 1 if board[d] == PLAYER2_MARKER else 0
    score += compute_board_score_potential(p1_markers, p2_markers)

    # check pos diag
    p1_markers = p2_markers = 0
    for d in range(BOARD_SIZE - 1, BOARD_LEN - BOARD_SIZE + 1, BOARD_SIZE - 1):
        p1_markers += 1 if board[d] == PLAYER1_MARKER else 0
        p2_markers += 1 if board[d] == PLAYER2_MARKER else 0
    score += compute_board_score_potential(p1_markers, p2_markers)

    return score


def compute_game_score_potential(p1_boards: int, p2_boards: int) -> int:
    score = (p2_boards - p1_boards) * 100

    if p2_boards == 2:
        score -= 200
        if p1_boards == 1:
            score += 150

    if p1_boards == 2 and p2_boards == 1:
        score -= 150

    return score


def compute_win_potential(big_board: List[str]) -> int:
    score = 0

    # check rows
    p1_boards = p2_boards = 0
    for r in range(0, BOARD_LEN, BOARD_SIZE):
        for c in range(BOARD_SIZE):
            p1_boards += 1 if big_board[r + c] == PLAYER1_WIN else 0
            p2_boards += 1 if big_board[r + c] == PLAYER2_WIN else 0
    score += compute_game_score_potential(p1_boards, p2_boards)

    # check cols
    p1_boards = p2_boards = 0
    for c in range(BOARD_SIZE):
        for r in range(0, BOARD_LEN, BOARD_SIZE):
            p1_boards += 1 if big_board[c + r] == PLAYER1_WIN else 0
            p2_boards += 1 if big_board[c + r] == PLAYER2_WIN else 0
    score += compute_game_score_potential(p1_boards, p2_boards)

    # check neg diag
    p1_boards = p2_boards = 0
    for d in range(0, BOARD_LEN, BOARD_SIZE + 1):
        p1_boards += 1 if big_board[d] == PLAYER1_WIN else 0
        p2_boards += 1 if big_board[d] == PLAYER2_WIN else 0
    score += compute_game_score_potential(p1_boards, p2_boards)

    # check pos diag
    p1_boards = p2_boards = 0
    for d in range(BOARD_SIZE - 1, BOARD_LEN - BOARD_SIZE + 1, BOARD_SIZE - 1):
        p1_boards += 1 if big_board[d] == PLAYER1_WIN else 0
        p2_boards += 1 if big_board[d] == PLAYER2_WIN else 0
    score += compute_game_score_potential(p1_boards, p2_boards)

    return score


def heuristic(big_board: str) -> int:
    """
    sign of returned value based on Player 1 (maximizing player = positive), AI is Player 2 (minimizing player = negative)
    """
    big_board = decompress(big_board)

    score = 0

    winner, has_won = check_game_win(big_board)
    if has_won:
        return math.inf if winner == PLAYER1_WIN else -math.inf

    for board_idx in range(BOARD_LEN):
        if big_board[board_idx] == PLAYER1_WIN:
            score += 100
        elif big_board[board_idx] == PLAYER2_WIN:
            score -= 100
        elif (
            big_board[board_idx] != DRAW_SYMBOL and big_board[board_idx] != EMPTY_SYMBOL
        ):
            winner, has_won = check_win(big_board[board_idx])
            if has_won:
                score = score + (100 if winner == PLAYER1_WIN else -100)
            else:
                score += compute_board_potential(big_board[board_idx])

    score += compute_win_potential(big_board)

    if score <= 0:
        score -= 20

    return score
