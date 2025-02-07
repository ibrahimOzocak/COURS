import { AppService } from './app.service';
import { Player } from './player';
import { EventGateway } from './event-emitter';
import { Observable } from 'rxjs';
export declare class AppController {
    private readonly appService;
    private readonly eventGateway;
    constructor(appService: AppService, eventGateway: EventGateway);
    addPlayer(id: string): void;
    getPlayers(): Player[];
    playMatch(winnerId: string, loserId: string, draw: boolean): void;
    onRankingUpdate(req: Request): Observable<any>;
}
