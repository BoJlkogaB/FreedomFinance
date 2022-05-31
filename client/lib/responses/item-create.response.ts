import { AddItemError } from '../errors/add-item.error';

export interface ItemCreateResponse {
  status: number,
  errors: AddItemError,
}