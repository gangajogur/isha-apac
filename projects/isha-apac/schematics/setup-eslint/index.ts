import { chain, externalSchematic, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { BaseSchema } from '../base.schema';
import { ngAddExternal } from '../helpers/schematics-helper';
import { Packages } from '../schematics.constants';

// @ts-ignore
export function setupEsLint(options: BaseSchema): Rule {
  // @ts-ignore
  return async (host: Tree, context: SchematicContext) => {
    context.logger.log('info', 'Setting the ESLint');
    return chain([addEsLint(options)]);
  };
}

export function eslintSchematicPrivate(options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    console.log('Running dependency schematics...\n');
    return chain([externalSchematic(Packages.EsLintSchematics.name, 'ng-add', options)]);
  };
}

// @ts-ignore
function addEsLint(options): Rule {
  // @ts-ignore
  return (host: Tree, context: SchematicContext) => {
    const packages = [Packages.EsLintSchematics];
    // ensure this matches to the schematic name in collection.json
    const privateSchematicName = 'eslint-schematic-private';
    return ngAddExternal(packages, privateSchematicName, options);
  };
}
