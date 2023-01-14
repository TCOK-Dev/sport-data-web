import { BasketballGame } from './basketball-game.types';

export interface BasketballGameScore {
  id: number;
  title: string;
  quarter: string;
  clock: number;
  playedTime: number;
  awayTeam: string;
  homeTeam: string;
  awayScore: number;
  homeScore: number;
  awaySpread: string;
  homeSpread: string;
  awayOverUnder: string;
  homeOverUnder: string;

  game?: BasketballGame;
}
