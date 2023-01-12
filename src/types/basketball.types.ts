import { BasketballGame } from './basketball-game.types';

export interface Basketball {
  id: number;
  title: string;

  games?: Array<BasketballGame>;
}
