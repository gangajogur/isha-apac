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
import { addFilesToStyles } from '../helpers/angular-json.helper';
import { AppModulePath, Packages } from '../schematics.constants';

// @ts-ignore
export function setupToastNotification(options: BaseSchema): Rule {
  // @ts-ignore
  return async (host: Tree, context: SchematicContext) => {
    context.logger.log('info', 'Adding toast notification capabilities');
    return chain([copyResources(), addImportExportToModule(), addStylesToAngularJsonFile(options)]);
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
    addModuleImportToModule(host, AppModulePath, 'CoreModule', Packages.IshaApac.name);
    return host;
  };
}

// @ts-ignore
function addStylesToAngularJsonFile(options: BaseSchema): Rule {
  // @ts-ignore
  return (host: Tree, context: SchematicContext) => {
    addFilesToStyles(options, ['src/assets/toast-notification.scss'], host);
    return host;
  };
}
