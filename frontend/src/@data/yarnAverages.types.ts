import { BaseRecord } from './base.types';

export interface YarnAverageRecord extends BaseRecord {
  manufacturer_name: string;
  avg_hook_size_min: number;
  avg_hook_size_max: number;
  avg_yarn_size: number;
}
