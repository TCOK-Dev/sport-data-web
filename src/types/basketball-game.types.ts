import { BasketballGameScore } from './basketball-game-score.types';
import { Basketball } from './basketball.types';

export interface BasketballGame {
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

  league?: Basketball;
  scores?: Array<BasketballGameScore>;
}
