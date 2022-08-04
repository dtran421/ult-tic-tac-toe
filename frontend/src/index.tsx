import { useState } from "react";

import BigBoard from "./Components/BigBoard";
import Board from "./Components/BoardGrid";

const Index = () => {
    return (
        <div className="w-full min-h-screen flex flex-col justify-center bg-zinc-800">
            <div className="w-full flex justify-center">
                <BigBoard />
            </div>
        </div>
    );
};

export default Index;
