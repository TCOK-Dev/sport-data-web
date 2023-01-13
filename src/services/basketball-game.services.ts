import { BasketballGame } from '../types/basketball-game.types';
import { APIService } from './api.service';
import { APIResponseCode, APIResponseType } from './apiResponse';
import axios from './axios';

const API_BASKETBALL = {
  GETS: 'basketball-game',
  GET: 'basketball-game',
};

class BasketballGameService extends APIService<BasketballGame> {
  async gets(): Promise<APIResponseType<BasketballGame[]>> {
    try {
      const { data } = await axios.get(API_BASKETBALL.GETS);
      return data as APIResponseType<BasketballGame[]>;
    } catch (error) {
      return {
        code: APIResponseCode.FAILED,
        data: [],
        message: 'Network Connection Problem',
      };
    }
  }

  async get({
    id = '',
  }: {
    id?: string;
  }): Promise<APIResponseType<BasketballGame>> {
    try {
      const { data } = await axios.get(`${API_BASKETBALL.GET}/${id}`);
      return data as APIResponseType<BasketballGame>;
    } catch (error) {
      return {
        code: APIResponseCode.FAILED,
        message: 'Network Connection Problem',
      };
    }
  }
}

const basketballGameService = new BasketballGameService();

export default basketballGameService;
