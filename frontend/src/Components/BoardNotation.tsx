const Header = ({ text }: { text: string }) => (
    <div className="flex justify-center items-center">
        <p className="text-white">{text}</p>
    </div>
);

const MiniCell = ({
    text,
    br = true,
    bb = true
}: {
    text: string;
    br?: boolean;
    bb?: boolean;
}) => {
    let borderClass = "";
    if (br) {
        borderClass = "border-r-2 ";
    }
    if (bb) {
        borderClass += "border-b-2";
    }

    return (
        <div className={`flex justify-center ${borderClass} p-2`}>
            <p className="w-full text-center text-white font-medium bg-zinc-600/40 rounded-lg p-2">
                {text}
            </p>
        </div>
    );
};

const BoardNotation = () => {
    return (
        <div className="max-w-2xl flex flex-col items-center space-y-4 pt-8 mx-auto">
            <h2 className="text-xl font-medium text-white text-center">
                Board Notation
            </h2>
            <div className="grid grid-cols-4 -ml-8">
                <div />
                <Header text="Left" />
                <Header text="Middle" />
                <Header text="Right" />
                <Header text="Top" />
                <MiniCell text="TL" />
                <MiniCell text="TM" />
                <MiniCell text="TR" br={false} />
                <Header text="Middle" />
                <MiniCell text="ML" />
                <MiniCell text="MM" />
                <MiniCell text="MR" br={false} />
                <Header text="Bottom" />
                <MiniCell text="BL" bb={false} />
                <MiniCell text="BM" bb={false} />
                <MiniCell text="BR" br={false} bb={false} />
            </div>
            <p className="text-white text-center">
                Moves are ascribed a positional indicator using row-major order
                (row first, then column). In relations to the big board, moves
                have two indicators, the first for the big board and the second
                for the smaller board. For example, a move in the middle left
                board in the top right cell would be notated as{" "}
                <span className="font-medium">ML-TR</span>.
            </p>
        </div>
    );
};

export default BoardNotation;
