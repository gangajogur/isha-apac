import { normalize } from '@angular-devkit/core';
import {
  apply,
  chain,
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
import { addPackagesJsonDependencies, installPackageJsonDependencies } from '../helpers/schematics-helper';
import { AppModulePath, Packages } from '../schematics.constants';

// @ts-ignore
export function setupI18n(options: BaseSchema): Rule {
  // @ts-ignore
  return async (host: Tree, context: SchematicContext) => {
    context.logger.log('info', 'Setting up internationalisation (i18n)');

    return chain([
      // schematic(SchematicCollection.SharedModule, options),
      copyResources(),
      addImportExportToModule(),
      addi18nDependencies(),
      installPackageJsonDependencies()
    ]);
  };
}

// @ts-ignore
function copyResources(): Rule {
  return () => {
    const templateSource = apply(url('./files'), [move(normalize(``))]);
    return mergeWith(templateSource, MergeStrategy.Overwrite);
  };
}

// // @ts-ignore
// function addImportExportToModule(): Rule {
//   return (host: Tree) => {
//     addModuleImportToModule(host, SharedModulePath, 'I18NModule', Packages.IshaApac.name);
//     const source = parseSourceFile(host, SharedModulePath);
//     const exportChanges = addExportToModule(source, SharedModulePath, 'I18NModule', Packages.IshaApac.name);
//     commitChange(host, SharedModulePath, exportChanges);
//     return host;
//   };
// }

// @ts-ignore
function addImportExportToModule(): Rule {
  return (host: Tree) => {
    addModuleImportToModule(host, AppModulePath, 'I18NModule', Packages.IshaApac.name);
    return host;
  };
}

// @ts-ignore
function addi18nDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    const packages = [Packages.NgxTranslate, Packages.JsYaml];
    addPackagesJsonDependencies(host, context, packages);
    return host;
  };
}
