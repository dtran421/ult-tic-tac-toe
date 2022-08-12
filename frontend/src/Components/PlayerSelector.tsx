import { Dispatch, SetStateAction } from "react";
import { Player, PlayerType, PLAYER_TYPES } from "../../types";

interface PlayerButtonProps {
    text: string;
    active: boolean;
    player: Player;
    setPlayerType: Dispatch<SetStateAction<{ [key in Player]: PlayerType }>>;
    toggleAIPlay: Dispatch<SetStateAction<{ [key in Player]: boolean }>>;
}

const PlayerButton = ({
    text,
    active,
    player,
    setPlayerType,
    toggleAIPlay
}: PlayerButtonProps) => {
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
                setPlayerType((playerTypes) => ({
                    ...playerTypes,
                    [player]: text as PlayerType
                }));
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
    activeType: PlayerType;
    setPlayerType: Dispatch<SetStateAction<{ [key in Player]: PlayerType }>>;
    toggleAIPlay: Dispatch<SetStateAction<{ [key in Player]: boolean }>>;
}

const PlayerSelector = ({
    player,
    activeType,
    setPlayerType,
    toggleAIPlay
}: PlayerSelectorType) => {
    return (
        <div
            className={`grid grid-cols-2 ${
                player === "Player1" ? "bg-sky-900/30" : "bg-rose-900/30"
            } rounded-lg gap-4 p-2`}
        >
            {PLAYER_TYPES.map((type) => (
                <PlayerButton
                    key={type}
                    {...{ player, setPlayerType, toggleAIPlay }}
                    text={type}
                    active={type === activeType}
                />
            ))}
        </div>
    );
};

export default PlayerSelector;
