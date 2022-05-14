import { normalize } from '@angular-devkit/core';
import { apply, chain, mergeWith, move, Rule, SchematicContext, Tree, url } from '@angular-devkit/schematics';

// @ts-ignore
export function setupSharedModule(): Rule {
  // @ts-ignore
  return async (host: Tree, context: SchematicContext) => {
    context.logger.log('info', 'Setting up shared module');
    return chain([copyResources()]);
  };
}

function copyResources(): Rule {
  return () => {
    const templateSource = apply(url('./files'), [move(normalize(``))]);
    return mergeWith(templateSource);
  };
}
