/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { APIResponseCode, APIResponseType } from './apiResponse';

export class APIService<T = any> {
  async gets(p?: any): Promise<APIResponseType<T[]>> {
    return new Promise((resolve, reject) => {
      resolve({
        code: APIResponseCode.FAILED,
        message: 'Not Defined (development)',
      });
    });
  }

  async get({ id = '' }: { id?: string }): Promise<APIResponseType<T>> {
    return new Promise((resolve, reject) => {
      resolve({
        code: APIResponseCode.FAILED,
        message: 'Not Defined (development)',
      });
    });
  }

  async save({ data }: { data?: T }): Promise<APIResponseType<string>> {
    return new Promise((resolve, reject) => {
      resolve({
        code: APIResponseCode.FAILED,
        message: 'Not Defined (development)',
      });
    });
  }

  async delete({ id = '' }: { id?: string }): Promise<APIResponseType<T>> {
    return new Promise((resolve, reject) => {
      resolve({
        code: APIResponseCode.FAILED,
        message: 'Not Defined (development)',
      });
    });
  }
}

const apiService = new APIService();

export default apiService;
