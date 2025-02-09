import { Player } from './player';
import { Repository } from 'typeorm';
export declare class AppService {
    private player;
    constructor(player: Repository<Player>);
    addPlayer(id: string): Promise<Player>;
    getPlayers(): Promise<Player[]>;
    playMatch(player1Id: string, player2Id: string, draw: boolean): Promise<void>;
}
