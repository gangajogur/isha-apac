import { normalize } from '@angular-devkit/core';
import {
  apply,
  chain,
  externalSchematic,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  Tree,
  url
} from '@angular-devkit/schematics';
import { addModuleImportToModule } from '@angular/cdk/schematics';
import { BaseSchema } from '../base.schema';
import { addFilesToStyles } from '../helpers/angular-json.helper';
import { ngAddExternal } from '../helpers/schematics-helper';
import { AppModulePath, MaterialModuleImportPath, Packages, SchematicCollection } from '../schematics.constants';

// @ts-ignore
export function setupAngularMaterial(options: BaseSchema): Rule {
  // @ts-ignore
  return async (host: Tree, context: SchematicContext) => {
    context.logger.log('info', 'Adding toast notification capabilities');
    return chain([
      addAngularMaterial(options),
      copyResources(),
      addStylesToAngularJsonFile(options),
      addImportExportToModule()
    ]);
  };
}

// @ts-ignore
export function angularMaterialSchematicPrivate(options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const materialOptions: BaseSchema = {
      ...options,
      theme: 'custom',
      animations: 'enabled',
      typography: true
    };
    return chain([externalSchematic(Packages.AngularMaterial.name, 'ng-add', materialOptions)]);
  };
}

// @ts-ignore
function addAngularMaterial(options: BaseSchema): Rule {
  // @ts-ignore
  return (host: Tree, context: SchematicContext) => {
    const packages = [Packages.AngularMaterial];
    return ngAddExternal(packages, SchematicCollection.MaterialSchematicPrivate, options);
  };
}

// @ts-ignore
function copyResources(): Rule {
  return () => {
    const templateSource = apply(url('./files'), [move(normalize(``))]);
    return mergeWith(templateSource, MergeStrategy.Overwrite);
  };
}

// @ts-ignore
function addStylesToAngularJsonFile(options: BaseSchema): Rule {
  // @ts-ignore
  return (host: Tree, context: SchematicContext) => {
    addFilesToStyles(options, ['src/assets/scss/theme.scss'], host);
    return host;
  };
}

// @ts-ignore
function addImportExportToModule(): Rule {
  return (host: Tree) => {
    addModuleImportToModule(host, AppModulePath, 'MaterialModule', MaterialModuleImportPath);
    return host;
  };
}
