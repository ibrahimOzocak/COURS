"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventGateway = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const rxjs_1 = require("rxjs");
let EventGateway = class EventGateway {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    emitRankingUpdate(update) {
        console.log("🚀 [NestJS] Émission d'un événement SSE :", update);
        if (update.updatedPlayers && Array.isArray(update.updatedPlayers)) {
            console.log("Manita", update.updatedPlayers);
            update.updatedPlayers.forEach((player) => {
                console.log("sortie foreach", player.id, player.rank);
                this.eventEmitter.emit('rankingUpdate', {
                    type: 'RankingUpdate',
                    player: { id: player.id, rank: player.rank }
                });
            });
            return;
        }
        if (update.player) {
            console.log("bonjour", update.player);
            this.eventEmitter.emit('rankingUpdate', {
                type: 'RankingUpdate',
                player: { id: update.player.id, rank: update.player.rank }
            });
            console.log("👀 👀 👀 👀", {
                type: 'RankingUpdate',
                player: { id: update.player.id, rank: update.player.rank }
            });
            return;
        }
        console.error("Erreur : Format d'événement `rankingUpdate` invalide :", update);
    }
    onRankingUpdate() {
        console.log("👀 [NestJS] Un client SSE s'est abonné aux mises à jour.");
        return new rxjs_1.Observable((subscriber) => {
            this.eventEmitter.on('rankingUpdate', (event) => {
                console.log("📡 Événement capté :", event);
                subscriber.next(`data: ${JSON.stringify(event)}\n\n`);
            });
        });
    }
    emitMatchFinished(update) {
        console.log("Émission d'une mise à jour de match terminé :", update);
        this.eventEmitter.emit('matchFinished', update);
    }
    onMatchFinished() {
        return (0, rxjs_1.fromEvent)(this.eventEmitter, 'matchFinished');
    }
};
exports.EventGateway = EventGateway;
exports.EventGateway = EventGateway = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], EventGateway);
//# sourceMappingURL=event-emitter.js.map