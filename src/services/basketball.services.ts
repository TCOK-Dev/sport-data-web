import { Basketball } from '../types/basketball.types';
import { APIService } from './api.service';
import { APIResponseCode, APIResponseType } from './apiResponse';
import axios from './axios';

const API_BASKETBALL = {
  GETS: 'basketball',
  GET: 'basketball',
};

class BasketballService extends APIService<Basketball> {
  async gets(): Promise<APIResponseType<Basketball[]>> {
    try {
      const { data } = await axios.get(API_BASKETBALL.GETS);
      return data as APIResponseType<Basketball[]>;
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
  }): Promise<APIResponseType<Basketball>> {
    try {
      const { data } = await axios.get(API_BASKETBALL.GET, { params: { id } });
      return data as APIResponseType<Basketball>;
    } catch (error) {
      return {
        code: APIResponseCode.FAILED,
        message: 'Network Connection Problem',
      };
    }
  }
}

const basketballService = new BasketballService();

export default basketballService;
