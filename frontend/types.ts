export const BOARD_SIZE = 3;
export const BOARD_LENGTH = BOARD_SIZE * BOARD_SIZE;

export type Player = "Player1" | "Player2";
export type Winner = Player | "DRAW";
export type Board = Marker[];

export enum PlayerMarker {
    Player1 = "X",
    Player2 = "O",
    DRAW = "-"
}
export type Marker = PlayerMarker | "";
