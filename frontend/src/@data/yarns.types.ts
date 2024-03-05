import { BaseRecord } from './base.types';

export interface YarnRecord extends BaseRecord {
  code: string;
  manufacturer: string;
  type: string;
  size: string[];
  pictures: string[];
  color: string;
  quantity: number;
  weight: number;
}
