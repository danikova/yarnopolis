import { ExpandedBaseRecord } from './base.types';
import { ColorRecord } from './colors.types';
import { ManufacturerRecord } from './manufacturers.types';
import { PictureRecord } from './pictures.type';
import { YarnTypeRecord } from './yarnTypes.types';

export interface YarnRecord
  extends ExpandedBaseRecord<{
    pictures: PictureRecord;
    color: ColorRecord;
    type: YarnTypeRecord;
    manufacturer: ManufacturerRecord;
  }> {
  code: string;
  manufacturer: string;
  type: string;
  hook_size_min: number;
  hook_size_max: number;
  yarn_size: number;
  pictures: string;
  color: string;
  weight: number;
}
