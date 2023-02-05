import { Tree } from '@angular-devkit/schematics';
import { format, Options } from 'prettier';
import { BaseSchema } from '../base.schema';
import { getQualifiedPath } from './path.helper';

/**
 *
 * @param host Schematics host object
 * @param options Schema object
 * @param json json string to be formatted
 * @param prettierFilePath relative path of the prettier file
 * @returns prettier formatted json
 */
export function getPrettierFormattedText(host: Tree, options: BaseSchema, json: any, prettierFilePath: string) {
  const prettierPath = getQualifiedPath(options, prettierFilePath);
  if (!host.exists(prettierPath)) {
    return JSON.stringify(json, null, 2);
  }
  const prettierConfig = host.read(prettierPath)?.toString('utf-8') || '';
  const prettierOptions = JSON.parse(prettierConfig) as Options;
  prettierOptions.parser = 'json';

  const formattedText = format(JSON.stringify(json, null, 2), prettierOptions);
  return formattedText;
}
