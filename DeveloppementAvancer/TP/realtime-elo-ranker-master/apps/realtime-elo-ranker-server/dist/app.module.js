"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const event_emitter_1 = require("./event-emitter");
const event_emitter_2 = require("@nestjs/event-emitter");
const typeorm_1 = require("@nestjs/typeorm");
const player_1 = require("./player");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            event_emitter_2.EventEmitterModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'db.sqlite',
                entities: [player_1.Player],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([player_1.Player]),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, event_emitter_1.EventGateway],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map