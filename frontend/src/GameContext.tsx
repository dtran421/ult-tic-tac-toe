import { createContext } from "react";

import { Player } from "../types";

const GameContextObj = {
    playerTypes: {
        Player1: "Human",
        Player2: "Minimax"
    },
    player: "" as Player,
    move: (boardIdx: number, cellIdx: number) => {}
};

const GameContext = createContext(GameContextObj);

export default GameContext;
