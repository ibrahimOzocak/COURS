import { Injectable } from '@nestjs/common';
import { Player } from './player';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Player)
    private player: Repository<Player>,
  ) { }

  /* addPlayer(id: string): Player {
    const newPlayer = new Player(id, 1000);
    this.players.push(newPlayer);
    return newPlayer;
  } */

  async addPlayer(id: string): Promise<Player> {
    const newPlayer = this.player.create({ id, rank: 1000 });
    return this.player.save(newPlayer);
  }

  /* getPlayers(): { id: string, rank: number }[] {
    return this.players
      .map(player => ({ id: player.id, rank: player.rank }))
      .sort((a, b) => b.rank - a.rank);
  } */

  async getPlayers(): Promise<Player[]> {
    return this.player.find({ order: { rank: 'DESC' } });
  }

  /* playMatch(player1Id: string, player2Id: string, draw: boolean): void {
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
    } else if (draw === false) {
      score1 = 1;
      score2 = 0;
    } else {
      score1 = 0;
      score2 = 1;
    }

    player1.rank = player1.rank + k * (score1 - expectedScore1);
    player2.rank = player2.rank + k * (score2 - expectedScore2);
  } */

  async playMatch(player1Id: string, player2Id: string, draw: boolean): Promise<void> {
    const player1 = await this.player.findOne({ where: { id: player1Id } });
    const player2 = await this.player.findOne({ where: { id: player2Id } });

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
    } else if (draw === false) {
      score1 = 1;
      score2 = 0;
    } else {
      score1 = 0;
      score2 = 1;
    }

    player1.rank = player1.rank + k * (score1 - expectedScore1);
    player2.rank = player2.rank + k * (score2 - expectedScore2);


    await this.player.save([player1, player2]);
  }

}