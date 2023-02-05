import { BaseSchema } from '../base.schema';

export function getQualifiedPath(options: BaseSchema, relativePath: string) {
  return `${options.path}/${relativePath}`;
}
