import { BaseRecord } from './base.types';

export interface PictureRecord extends BaseRecord {
  file: string;
  description: string;
}
