import { BaseSchema } from '../base.schema';

export interface NgAddSchema extends BaseSchema {
  createNewAngularApp: boolean;
  i18n: boolean;
}
