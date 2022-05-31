import { API_URL } from '../api-url';
import $api from '../http';
import { AxiosResponse } from 'axios';
import { ItemEntity } from '../entities/item.entity';
import { ItemCreateResponse } from '../responses/item-create.response';

export default class StockService {
  static async create(dto: any) {
    try {
      return (await $api.post(API_URL, dto)).data;
    } catch (e) {
      return {} as ItemCreateResponse;
    }
  }

  static async getAll(): Promise<AxiosResponse<ItemEntity[]>> {
    return (await $api.get(API_URL)).data.response;
  }
}