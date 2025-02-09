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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const event_emitter_1 = require("./event-emitter");
const rxjs_1 = require("rxjs");
let AppController = class AppController {
    constructor(appService, eventGateway) {
        this.appService = appService;
        this.eventGateway = eventGateway;
    }
    async addPlayer({ id }) {
        const newPlayer = await this.appService.addPlayer(id);
        this.eventGateway.emitRankingUpdate({
            updatedPlayers: await this.appService.getPlayers()
        });
        return newPlayer;
    }
    async getPlayers() {
        return this.appService.getPlayers();
    }
    async playMatch(winnerId, loserId, draw) {
        await this.appService.playMatch(winnerId, loserId, draw);
        console.log("🔥 Match joué :", winnerId, loserId, draw);
        this.eventGateway.emitRankingUpdate({
            updatedPlayers: await this.appService.getPlayers()
        });
    }
    onRankingUpdate(req) {
        console.log("Client connecté depuis l'URL :", req.url);
        return this.eventGateway.onRankingUpdate();
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Post)('player'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "addPlayer", null);
__decorate([
    (0, common_1.Get)('ranking'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getPlayers", null);
__decorate([
    (0, common_1.Post)('match'),
    __param(0, (0, common_1.Body)('winner')),
    __param(1, (0, common_1.Body)('loser')),
    __param(2, (0, common_1.Body)('draw')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "playMatch", null);
__decorate([
    (0, common_1.Get)('ranking/events'),
    (0, common_1.Sse)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], AppController.prototype, "onRankingUpdate", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [app_service_1.AppService,
        event_emitter_1.EventGateway])
], AppController);
//# sourceMappingURL=app.controller.js.map