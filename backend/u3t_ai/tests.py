from django.test import TestCase

from .model import game


def print_test_header(test_name: str):
    print("\n----------------------------------------------------------------------")
    print(f"TEST SUITE: {test_name}")
    print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n")


class GameTests(TestCase):
    print("GameTests\n")

    def test_is_board_full(self):
        print_test_header("is_board_full")

        cases = {
            "empty": [".........", False],
            "full": ["XOOOXXOXO", True],
            "not_full_1": ["XOO.X.OXO", False],
            "not_full_2": ["XOO.X.OX.", False],
            "not_full_3": ["X.O.X.OX.", False],
        }

        for type, data in cases.items():
            print(f"TEST: {type}")

            board, expected = data
            self.assertEqual(game.is_board_full(board), expected)

    def test_check_win(self):
        print_test_header("check_win")

        cases = {
            "empty": [".........", [False, "", False]],
            "not_full_1": ["XOO.X.OXO", [False, "", False]],
            "not_full_2": ["XOO.X.OX.", [False, "", False]],
            "not_full_3": ["X.O.X.OX.", [False, "", False]],
            #
            "draw": ["XOOOXXOXO", [False, "", True]],
            #
            "p1_win_row_1": ["XXXOOXOXO", [True, "X", False]],
            "p1_win_row_2": ["XOOXXXOXO", [True, "X", False]],
            "p1_win_row_3": ["OOOOXOXXX", [True, "X", False]],
            #
            "p1_win_col_1": ["XOXXOOXXO", [True, "X", False]],
            "p1_win_col_2": ["OXOXXOOXX", [True, "X", False]],
            "p1_win_col_3": ["OXXOOXXOX", [True, "X", False]],
            #
            "p1_win_neg_diag": ["XOXOXOOXX", [True, "X", False]],
            "p1_win_pos_diag": ["OOXOXOXXX", [True, "X", False]],
            #
            "p2_win_row_1": ["OOOXXOXXO", [True, "O", False]],
            "p2_win_row_2": ["XOOOOOOXX", [True, "O", False]],
            "p2_win_row_3": ["XXOOXOOOO", [True, "O", False]],
            #
            "p2_win_col_1": ["OXOOXXOOX", [True, "O", False]],
            "p2_win_col_2": ["XOXOOXXOO", [True, "O", False]],
            "p2_win_col_3": ["XXOXOOXXO", [True, "O", False]],
            #
            "p2_win_neg_diag": ["OOXOOXXOO", [True, "O", False]],
            "p2_win_pos_diag": ["XXOXOXOXO", [True, "O", False]],
        }

        for type, data in cases.items():
            print(f"TEST: {type}")

            board, expected = data
            has_won, winner, is_drawn = game.check_win(board)

            self.assertEqual(has_won, expected[0])
            self.assertEqual(winner, expected[1])
            self.assertEqual(is_drawn, expected[2])
