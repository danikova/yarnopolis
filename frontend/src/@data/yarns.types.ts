import { ExpandedBaseRecord } from './base.types';
import { ColorRecord } from './colors.types';
import { ManufacturerRecord } from './manufacturers.types';
import { PictureRecord } from './pictures.type';
import { SizeRecord } from './sizes.types';
import { YarnCodeRecord } from './yarnCodes.types';
import { YarnTypeRecord } from './yarnTypes.types';

export interface YarnRecord
  extends ExpandedBaseRecord<{
    hook_size: SizeRecord[];
    yarn_size: SizeRecord;
    pictures: PictureRecord;
    color: ColorRecord;
    type: YarnTypeRecord;
    manufacturer: ManufacturerRecord;
    code: YarnCodeRecord;
  }> {
  code: string;
  manufacturer: string;
  type: string;
  hook_size: string[];
  yarn_size: string;
  pictures: string;
  color: string;
  quantity: number;
  weight: number;
}
