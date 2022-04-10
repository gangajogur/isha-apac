import { normalize } from '@angular-devkit/core';
import { apply, chain, mergeWith, move, Rule, url } from '@angular-devkit/schematics';
import { MergeStrategy } from '@angular-devkit/schematics/src/tree/interface';

export function setupIde(): Rule {
  return async () => {
    const templateSource = apply(url('../../../../.vscode'), [move(normalize(`./.vscode`))]);
    return chain([mergeWith(templateSource, MergeStrategy.Overwrite)]);
  };
}
