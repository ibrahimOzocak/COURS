"use client";
import {
  MatchForm,
  MatchResult,
  PlayerData,
  PlayerForm,
  RankingLadder,
} from "@realtime-elo-ranker/libs/ui";
import { Poppins } from "next/font/google";
import { useCallback, useEffect, useState } from "react";
import fetchRanking from "../services/ranking/fetch-ranking";
import subscribeRankingEvents from "../services/ranking/subscribe-ranking-events";
import {
  RankingEvent,
  RankingEventType,
} from "../services/ranking/models/ranking-event";
import { motion } from "motion/react";
import postMatchResult from "../services/match/post-match-result";
import postPlayer from "../services/player/post-player";

const poppinsBold = Poppins({
  weight: "600",
  style: "normal",
  variable: "--poppins-bold",
});

const poppinsSemiBold = Poppins({
  weight: "500",
  style: "normal",
  variable: "--poppins-semi-bold",
});

/**
 * Sorts the players by rank in descending order
 *
 * @param arr - The array of players to sort
 * @returns The sorted array of players
 */
function quickSortPlayers(arr: PlayerData[]): PlayerData[] {
  if (arr.length <= 1) {
    // Already sorted
    return arr;
  }
  const p = arr.pop();
  const left = [];
  const right = [];
  for (const el of arr) {
    if (el.rank >= p!.rank) {
      left.push(el);
    } else {
      right.push(el);
    }
  }
  return [...quickSortPlayers(left), p!, ...quickSortPlayers(right)];
}

/**
 * The home page
 * 
 * @returns The home page component
 */
export default function Home() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not defined");
  }

  const [ladderData, setLadderData] = useState<PlayerData[]>([]);

  const updateLadderData = useCallback((player: PlayerData) => {

    console.log("🆕 Mise à jour du joueur reçu :", player);

    setLadderData((prevData) => {
      return quickSortPlayers(
        prevData.filter((p) => p.id !== player.id).concat(player)
      );
    });
  }, []);

  console.log("📈 Classement actuel :", API_BASE_URL, updateLadderData);
  useEffect(() => {
    console.log("🔍 Recherche du classement...");
    try {
      fetchRanking(API_BASE_URL).then(setLadderData);
    } catch (error) {
      // TODO: toast error
      console.error(error);
    }
    const eventSource = subscribeRankingEvents(API_BASE_URL);

    console.log("🔗 Connexion à l'événement SSE :", eventSource);

    eventSource.onopen = () => {
      console.log("✅ Connexion SSE réussie !");
    };

    eventSource.onmessage = (msg: MessageEvent) => {
      console.log(" ------------------------- Received message", msg.data);

      // Assure-toi que msg.data est bien formaté avant de le parser
      try {
        // msg.data peut contenir des métadonnées comme 'data:'
        // On extrait la partie JSON brute après 'data: '
        const jsonData = msg.data.startsWith("data:") ? msg.data.substring(5).trim() : msg.data;

        // Maintenant, on tente de parser ce JSON
        const event: RankingEvent = JSON.parse(jsonData); // On parse ici
        if (event.type === "Error") {
          console.error(event.message);
          return;
        }
        if (event.type === RankingEventType.RankingUpdate) {
          updateLadderData(event.player);
        }
      } catch (error) {
        console.error("Erreur lors du parsing de l'événement :", error);
      }
    };

    eventSource.onerror = (err) => {
      // TODO: toast error
      console.error(err);
      eventSource.close();
    };

    return () => eventSource.close();

  }, [API_BASE_URL, updateLadderData]);

  return (
    <div className="min-h-screen w-full">
      <motion.main
        className="flex flex-col gap-8 items-center sm:items-start max-w-full px-12 pt-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1
          className={`${poppinsBold.className} text-4xl font-bold text-center sm:text-left h-12`}
        >
          Realtime Elo Ranker
        </h1>
        <div className="w-full h-[610px] w-[95%]">
          <h2 className={`${poppinsSemiBold.className} text-2xl`}>
            Classement des joueurs
          </h2>
          <RankingLadder data={ladderData} />
        </div>
        <div className="flex mt-10 gap-12">
          <div className="flex flex-col gap-4">
            <h2 className={`${poppinsSemiBold.className} text-2xl`}>
              Déclarer un match
            </h2>
            <MatchForm
              callback={(
                adversaryA: string,
                adversaryB: string,
                result: MatchResult
              ) =>
                postMatchResult(API_BASE_URL, adversaryA, adversaryB, result)
              }
            />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className={`${poppinsSemiBold.className} text-2xl`}>
              Déclarer un joueur
            </h2>
            <PlayerForm
              callback={(playerName: string) =>
                postPlayer(API_BASE_URL, playerName)
              }
            />
          </div>
        </div>
      </motion.main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
