import { normalize } from '@angular-devkit/core';
import {
  apply,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  schematic,
  SchematicContext,
  Tree,
  url
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addExportToModule, addModuleImportToModule, parseSourceFile } from '@angular/cdk/schematics';
import { BaseSchema } from '../base.schema';
import { addPackagesJsonDependencies, commitChange } from '../helpers/schematics-helper';
import { Packages, SharedModulePath } from '../schematics.constants';

// @ts-ignore
export function setupI18n(options: BaseSchema): Rule {
  // @ts-ignore
  return async (host: Tree, context: SchematicContext) => {
    context.logger.log('info', 'Setting up internationalisation (i18n)');

    return chain([
      schematic('shared-module', options),
      copyResources(),
      addImportExportToModule(),
      addPackageJsonDependencies(),
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

// @ts-ignore
function addImportExportToModule(): Rule {
  return (host: Tree) => {
    addModuleImportToModule(host, SharedModulePath, 'I18NModule', Packages.IshaApac.name);
    const source = parseSourceFile(host, SharedModulePath);
    const exportChanges = addExportToModule(source, SharedModulePath, 'I18NModule', Packages.IshaApac.name);
    commitChange(host, SharedModulePath, exportChanges);
    return host;
  };
}

// @ts-ignore
function addPackageJsonDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    const packages = [Packages.IshaApac, Packages.NgxTranslate, Packages.JsYaml];
    addPackagesJsonDependencies(host, context, packages);
    return host;
  };
}

// @ts-ignore
function installPackageJsonDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.logger.log('info', `🔍 Installing packages...`);
    return host;
  };
}
