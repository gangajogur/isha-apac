import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { MergeStrategy } from '@angular-devkit/schematics/src/tree/interface';
import { BaseSchema } from '../base.schema';
import { moveFiles } from '../helpers/schematics-helper';

// @ts-ignore
export function setupIde(options: BaseSchema): Rule {
  // @ts-ignore
  return async (host: Tree, context: SchematicContext) => {
    context.logger.log('info', 'Setting the VSCode IDE');
    // note that the ./files are managed in postbuild script of package.json
    // const templateSource = apply(url('./files'), [move(normalize(getQualifiedPath(options, `./`)))]);
    // return chain([mergeWith(templateSource, MergeStrategy.Overwrite)]);

    return moveFiles(options, './', MergeStrategy.Overwrite);
  };
}
