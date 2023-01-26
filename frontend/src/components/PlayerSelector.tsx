import { Dispatch, SetStateAction, useContext } from "react";

import { Player, PlayerType, PLAYER_TYPES } from "../../types";
import { PlayerContext } from "../Contexts";

interface PlayerButtonProps {
    text: string;
    active: boolean;
    player: Player;
}

const PlayerButton = ({ text, active, player }: PlayerButtonProps) => {
    const { playerTypes, setPlayerType, toggleAIPlay } =
        useContext(PlayerContext);

    let buttonClass = "";
    if (active) {
        buttonClass =
            "font-medium " +
            (player === "Player1" ? "bg-sky-500/90" : "bg-rose-500/90");
    } else {
        buttonClass = player === "Player1" ? "bg-sky-700/50" : "bg-rose-700/50";
    }

    return (
        <button
            onClick={() => {
                setPlayerType({
                    ...playerTypes,
                    [player]: text as PlayerType
                });
                if (player === "Player1") {
                    toggleAIPlay({
                        Player1: text === "Human",
                        Player2: text === "Human"
                    });
                } else {
                    toggleAIPlay({
                        Player1: false,
                        Player2: false
                    });
                }
            }}
            className={`text-sm text-white ${buttonClass} rounded-lg py-2 transition duration-150 ease-in`}
        >
            {text}
        </button>
    );
};

interface PlayerSelectorType {
    player: Player;
}

const PlayerSelector = ({ player }: PlayerSelectorType) => {
    const { playerTypes } = useContext(PlayerContext);
    const activeType = playerTypes[player];

    return (
        <div
            className={`grid grid-cols-2 ${
                player === "Player1" ? "bg-sky-900/30" : "bg-rose-900/30"
            } rounded-lg gap-4 p-2`}
        >
            {PLAYER_TYPES.map((type) => (
                <PlayerButton
                    key={type}
                    {...{ player }}
                    text={type}
                    active={type === activeType}
                />
            ))}
        </div>
    );
};

export default PlayerSelector;
