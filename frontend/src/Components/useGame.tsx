import { useState } from "react";

import useBoard from "./useBoard";

import { BoardIndex, Marker, Player, PlayerMarker } from "../../types";

const useGame = () => {
    const [player, togglePlayer] = useState<Player>("Player1");
    const [[winner, winningMarker], setWinner] = useState<
        [Player | null, Marker]
    >([null, ""]);

    const { board, setBoard, makeMove } = useBoard();

    const move = (r: BoardIndex, c: BoardIndex) => {
        if (makeMove(PlayerMarker[player], r, c)) {
            setWinner([player, PlayerMarker[player]]);
        } else {
            togglePlayer(player === "Player1" ? "Player2" : "Player1");
        }
    };

    const clear = () => {
        setBoard([
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]);
        setWinner([null, ""]);
        togglePlayer("Player1");
    };

    return { player, winner, winningMarker, board, move, clear };
};

export default useGame;
