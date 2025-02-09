import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, fromEvent } from 'rxjs';

@Injectable()
export class EventGateway {
  constructor(private readonly eventEmitter: EventEmitter2) { }

  /**
   * Émettre une mise à jour du classement (pour l'ajout et la mise à jour après un match)
   */
  emitRankingUpdate(update: any) {
    console.log("🚀 [NestJS] Émission d'un événement SSE :", update);

    // Cas 1 : Mise à jour du classement après un match (tableau `updatedPlayers`)
    if (update.updatedPlayers && Array.isArray(update.updatedPlayers)) {
      console.log("Manita", update.updatedPlayers);
      update.updatedPlayers.forEach((player: { id: any; rank: any; }) => {
        console.log("sortie foreach", player.id, player.rank);
        this.eventEmitter.emit('rankingUpdate', {
          type: 'RankingUpdate',
          player: { id: player.id, rank: player.rank }
        });
      });
      return;
    }

    // Cas 2 : Ajout d'un nouveau joueur (utilisation directe de `update`)
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

    // Si on arrive ici, `update` est invalide
    console.error("Erreur : Format d'événement `rankingUpdate` invalide :", update);
  }

  /* onRankingUpdate(): Observable<any> {
    console.log("👀 [NestJS] Un client SSE s'est abonné aux mises à jour.");

    return fromEvent(this.eventEmitter, 'rankingUpdate');
  } */

  onRankingUpdate(): Observable<any> {
    console.log("👀 [NestJS] Un client SSE s'est abonné aux mises à jour.");

    return new Observable((subscriber) => {
      this.eventEmitter.on('rankingUpdate', (event) => {
        console.log("📡 Événement capté :", event);

        // Envoyer l'événement au format SSE correct
        subscriber.next(`data: ${JSON.stringify(event)}\n\n`);
      });
    });
  }

  // Émettre un événement quand un match se termine
  emitMatchFinished(update: any) {
    console.log("Émission d'une mise à jour de match terminé :", update);
    this.eventEmitter.emit('matchFinished', update);
  }

  // Écouter l'événement en temps réel pour SSE
  onMatchFinished(): Observable<any> {
    return fromEvent(this.eventEmitter, 'matchFinished'); // SSE en temps réel
  }

}