import { normalize } from '@angular-devkit/core';
import {
  apply,
  chain,
  externalSchematic,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  Tree,
  url
} from '@angular-devkit/schematics';
import { MergeStrategy } from '@angular-devkit/schematics/src/tree/interface';
import { BaseSchema } from '../base.schema';

export function setupIde(options: BaseSchema): Rule {
  // @ts-ignore
  return async (host: Tree, context: SchematicContext) => {
    context.logger.log('info', 'Setting the VSCode IDE');
    // note that the ./files are managed in postbuild script of package.json
    const templateSource = apply(url('./files'), [move(normalize(`./`))]);
    return chain([
      externalSchematic('@angular-eslint/schematics', 'ng-add', {
        project: options.project
      }),
      mergeWith(templateSource, MergeStrategy.Overwrite)
    ]);
  };
}
