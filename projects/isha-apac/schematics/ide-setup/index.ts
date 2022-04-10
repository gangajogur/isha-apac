import { normalize } from '@angular-devkit/core';
import { apply, chain, mergeWith, move, Rule, SchematicContext, Tree, url } from '@angular-devkit/schematics';
import { MergeStrategy } from '@angular-devkit/schematics/src/tree/interface';

export function setupIde(): Rule {
  // @ts-ignore
  return async (host: Tree, context: SchematicContext) => {
    context.logger.log('info', 'Setting the VSCode IDE');
    const templateSource = apply(url('../../../../.vscode'), [move(normalize(`./.vscode`))]);
    return chain([mergeWith(templateSource, MergeStrategy.Overwrite)]);
  };
}
