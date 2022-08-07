export const BoardSize = 3;

export type Player = "Player1" | "Player2";
export type Board = Marker[];

export enum PlayerMarker {
    Player1 = "X",
    Player2 = "O",
    DRAW = "-"
}
export type Marker = PlayerMarker | "";
