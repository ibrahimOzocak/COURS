import { Player } from './player';
export declare class AppService {
    private players;
    addPlayer(id: string): Player;
    getPlayers(): {
        id: string;
        rank: number;
    }[];
    playMatch(player1Id: string, player2Id: string, draw: boolean): void;
}
