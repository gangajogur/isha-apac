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
import { format, Options } from 'prettier';
import { BaseSchema } from '../base.schema';
import { cleanseJson } from '../helpers/schematics-helper';
import { AngularJsonPath, AppModulePath, Packages, PrettierPath } from '../schematics.constants';

// @ts-ignore
export function setupToastNotification(options: BaseSchema): Rule {
  // @ts-ignore
  return async (host: Tree, context: SchematicContext) => {
    context.logger.log('info', 'Adding toast notification capabilities');
    return chain([copyResources(), addImportExportToModule(), updateAngularJsonFile(options)]);
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
function updateAngularJsonFile(options: BaseSchema): Rule {
  // @ts-ignore
  return (host: Tree, context: SchematicContext) => {
    if (host.exists(AngularJsonPath)) {
      const currentAngularJson = host.read(AngularJsonPath)?.toString('utf-8') || '';
      const angular = JSON.parse(cleanseJson(currentAngularJson));
      // console.log('App Detection & your options: \n', options);
      // angular['projects'][options.project]['architect']['build']['options']['stylePreprocessorOptions'] = {
      //   includePaths: ['src/scss/']
      // };
      // angular['projects'][options.project]['architect']['build']['options']['es5BrowserSupport'] = true;
      angular['projects'][options?.project]['architect']['build']['options']['styles'].push(
        'src/assets/toast-notification.scss'
      );
      angular['projects'][options?.project]['architect']['test']['options']['styles'].push(
        'src/assets/toast-notification.scss'
      );

      const prettierConfig = host.read(PrettierPath)?.toString('utf-8') || '';
      const prettierOptions = JSON.parse(prettierConfig) as Options;
      prettierOptions.parser = 'json';

      const formattedText = format(JSON.stringify(angular, null, 2), prettierOptions);
      host.overwrite(AngularJsonPath, formattedText);
    }
    return host;
  };
}
