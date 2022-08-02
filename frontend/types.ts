export const BoardSize = 3;

export type Player = "Player1" | "Player2";
export type Board = Marker[][];
export type BoardIndex = 0 | 1 | 2;

export enum PlayerMarker {
    Player1 = "X",
    Player2 = "O"
}
export type Marker = PlayerMarker.Player1 | PlayerMarker.Player2 | "";
