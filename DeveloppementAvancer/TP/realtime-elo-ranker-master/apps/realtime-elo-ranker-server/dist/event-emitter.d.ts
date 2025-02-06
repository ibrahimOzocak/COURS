import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable } from 'rxjs';
export declare class EventGateway {
    private readonly eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    emitRankingUpdate(update: any): void;
    onRankingUpdate(): Observable<any>;
    emitMatchFinished(update: any): void;
    onMatchFinished(): Observable<any>;
}
