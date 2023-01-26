import { useContext, useEffect, useState } from "react";

import PlayerSelector from "./PlayerSelector";

import { Player } from "../../types";
import { PlayerContext } from "../Contexts";

interface PlayerModuleProps {
    player: Player;
    isPlaying: boolean;
    canAIPlay: { [key in Player]: boolean };
}

const PlayerModule = ({ player, isPlaying, canAIPlay }: PlayerModuleProps) => {
    const { playerTypes } = useContext(PlayerContext);
    const [time, setTime] = useState(0);

    useEffect(() => {
        if (isPlaying && canAIPlay[player]) {
            if (playerTypes[player] === "Monte Carlo") {
                if (time === 0) {
                    setTime(20);
                }
                setTimeout(() => setTime(time - 1), 1000);
            }
        } else {
            setTime(0);
        }
    }, [isPlaying, canAIPlay, time, playerTypes, player]);

    return (
        <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
                <h2 className="text-white font-semibold">
                    {player === "Player1" ? "Player 1" : "Player 2"}
                </h2>
                {playerTypes[player] === "Monte Carlo" && (
                    <p className="bg-zinc-700/60 text-white rounded-lg px-3 py-1">
                        0:{time.toString().padStart(2, "0")}
                    </p>
                )}
            </div>
            <PlayerSelector {...{ player }} />
        </div>
    );
};

export default PlayerModule;
