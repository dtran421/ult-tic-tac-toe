import { PlayerMarker } from "../types";
import BigBoard from "./Components/BigBoard";
import useGame from "./Components/useGame";

const Index = () => {
    const {
        AIMode,
        toggleAIMode,
        bigBoard,
        activeBoard,
        winners,
        player,
        move,
        clear
    } = useGame();

    return (
        <div className="w-full min-h-screen flex flex-col justify-center bg-zinc-800">
            <div className="w-full flex justify-center">
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <div>
                            <button
                                onClick={() => clear()}
                                className="bg-blue-500 text-lg text-white font-medium rounded-lg px-6 py-2"
                            >
                                Clear
                            </button>
                        </div>
                        <div className="flex justify-center items-center space-x-4">
                            <h1 className="text-3xl text-white text-semibold">
                                Player {player === "Player1" ? 1 : 2}'s turn
                            </h1>
                            <span
                                className={`flex items-center text-2xl text-white text-medium ${
                                    player === "Player1"
                                        ? "bg-sky-500"
                                        : "bg-rose-500"
                                } rounded-xl px-3 py-1`}
                            >
                                {PlayerMarker[player]}
                            </span>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => toggleAIMode(!AIMode)}
                                className={`${
                                    AIMode ? "bg-blue-500" : "bg-gray-500"
                                } text-lg text-white font-semibold rounded-lg px-6 py-2 transition duration-100 ease-linear`}
                            >
                                AI
                            </button>
                        </div>
                    </div>
                    <BigBoard
                        {...{ player, bigBoard, activeBoard, winners, move }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Index;
