import { ExpandedBaseRecord } from './base.types';
import { ColorRecord } from './colors.types';
import { ManufacturerRecord } from './manufacturers.types';
import { PictureRecord } from './pictures.type';
import { SizeRecord } from './sizes.types';
import { YarnTypeRecord } from './yarnTypes.types';

export interface YarnRecord
  extends ExpandedBaseRecord<{
    size: SizeRecord[];
    pictures: PictureRecord;
    color: ColorRecord;
    type: YarnTypeRecord;
    manufacturer: ManufacturerRecord;
  }> {
  code: string;
  manufacturer: string;
  type: string;
  size: string[];
  pictures: string;
  color: string;
  quantity: number;
  weight: number;
}
