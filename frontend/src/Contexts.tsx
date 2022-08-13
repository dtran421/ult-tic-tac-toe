import { createContext } from "react";

import { Player, PlayerType } from "../types";

const GameContextObj = {
    playerTypes: {
        Player1: "Human",
        Player2: "Minimax"
    },
    player: "" as Player,
    move: (boardIdx: number, cellIdx: number) => {}
};

const PlayerContextObj = {
    playerTypes: {
        Player1: "Human" as PlayerType,
        Player2: "Minimax" as PlayerType
    },
    setPlayerType: (_: { Player1: PlayerType; Player2: PlayerType }) => {},
    toggleAIPlay: (_: { Player1: boolean; Player2: boolean }) => {}
};

export const GameContext = createContext(GameContextObj);
export const PlayerContext = createContext(PlayerContextObj);
