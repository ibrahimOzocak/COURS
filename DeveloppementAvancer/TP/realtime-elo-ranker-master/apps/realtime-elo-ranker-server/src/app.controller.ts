import { Controller, Get, Post, Body, Injectable, Sse, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { Player } from './player';
import { EventGateway } from './event-emitter'; // Assurez-vous que EventGateway est bien importé
import { Observable } from 'rxjs';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly eventGateway: EventGateway
  ) { }

  /* @Post('player')
  addPlayer(@Body('id') id: string): void {
    //this.appService.addPlayer(id);
    const newPlayer = this.appService.addPlayer(id);
    // Émettre une mise à jour après l'ajout du joueur
    this.eventGateway.emitRankingUpdate({
      player: { id: newPlayer.id, rank: newPlayer.rank }
    });
  } */

  @Post('player')
  async addPlayer(@Body() { id }: { id: string }): Promise<Player> {
    const newPlayer = await this.appService.addPlayer(id);
    this.eventGateway.emitRankingUpdate({
      updatedPlayers: await this.appService.getPlayers()
    });

    return newPlayer;
  }

  /* @Get('ranking')
  getPlayers(): Player[] {
    return this.appService.getPlayers();
  } */

  @Get('ranking')
  async getPlayers(): Promise<Player[]> {
    return this.appService.getPlayers();
  }

  /* @Post('match')
  playMatch(@Body('winner') winnerId: string, @Body('loser') loserId: string, @Body('draw') draw: boolean): void {
    console.log(winnerId, loserId, draw);
    this.appService.playMatch(winnerId, loserId, draw);

    // Mettre à jour les joueurs après un match
    const updatedPlayers = this.appService.getPlayers();
    // Émettre une mise à jour du classement avec les joueurs mis à jour
    this.eventGateway.emitRankingUpdate({ updatedPlayers });
  } */

  @Post('match')
  async playMatch(@Body('winner') winnerId: string, @Body('loser') loserId: string, @Body('draw') draw: boolean): Promise<void> {
    await this.appService.playMatch(winnerId, loserId, draw);
    console.log("🔥 Match joué :", winnerId, loserId, draw);
    this.eventGateway.emitRankingUpdate({
      updatedPlayers: await this.appService.getPlayers()
    });
  }

  @Get('ranking/events')
  @Sse()
  onRankingUpdate(@Request() req: Request): Observable<any> {
    // Affiche l'URL complète du client qui se connecte
    console.log("Client connecté depuis l'URL :", req.url);

    return this.eventGateway.onRankingUpdate();
  }

}
