import { BaseRecord } from './base.types';

export interface ColorRecord extends BaseRecord {
  hue: number;
  saturation: number;
  lightness: number;
}
