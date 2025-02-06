"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const player_1 = require("./player");
let AppService = class AppService {
    constructor() {
        this.players = [];
    }
    addPlayer(id) {
        const newPlayer = new player_1.Player(id, 1000);
        this.players.push(newPlayer);
        return newPlayer;
    }
    getPlayers() {
        return this.players
            .map(player => ({ id: player.id, rank: player.rank }))
            .sort((a, b) => b.rank - a.rank);
    }
    playMatch(player1Id, player2Id, draw) {
        console.log(player1Id, player2Id, draw);
        const player1 = this.players.find(player => player.id === player1Id);
        const player2 = this.players.find(player => player.id === player2Id);
        if (!player1 || !player2) {
            throw new Error('One or both players not found');
        }
        const k = 32;
        const expectedScore1 = 1 / (1 + Math.pow(10, (player2.rank - player1.rank) / 400));
        const expectedScore2 = 1 / (1 + Math.pow(10, (player1.rank - player2.rank) / 400));
        let score1, score2;
        if (draw === true) {
            score1 = 0.5;
            score2 = 0.5;
        }
        else if (draw === false) {
            score1 = 1;
            score2 = 0;
        }
        else {
            score1 = 0;
            score2 = 1;
        }
        player1.rank = player1.rank + k * (score1 - expectedScore1);
        player2.rank = player2.rank + k * (score2 - expectedScore2);
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map