import { Rule, Tree } from '@angular-devkit/schematics';
import { format, Options } from 'prettier';
import { BaseSchema } from '../base.schema';
import { AngularJsonPath, PrettierPath } from '../schematics.constants';
import { cleanseJson } from './schematics-helper';

// @ts-ignore
export function addFilesToStyles(options: BaseSchema, filePaths: string[], host: Tree): Rule {
  // @ts-ignore
  if (host.exists(AngularJsonPath)) {
    const angular = getAngularJsonFile(host);
    // console.log('App Detection & your options: \n', options);
    // angular['projects'][options.project]['architect']['build']['options']['stylePreprocessorOptions'] = {
    //   includePaths: ['src/scss/']
    // };
    // angular['projects'][options.project]['architect']['build']['options']['es5BrowserSupport'] = true;
    angular['projects'][options?.project]['architect']['build']['options']['styles'].push(...filePaths);
    angular['projects'][options?.project]['architect']['test']['options']['styles'].push(...filePaths);

    const formattedText = getPrettierFormattedText(host, angular);
    host.overwrite(AngularJsonPath, formattedText);
  }
}

function getAngularJsonFile(host: Tree) {
  const currentAngularJson = host.read(AngularJsonPath)?.toString('utf-8') || '';
  const angular = JSON.parse(cleanseJson(currentAngularJson));
  return angular;
}

function getPrettierFormattedText(host: Tree, angularJson: any) {
  const prettierConfig = host.read(PrettierPath)?.toString('utf-8') || '';
  const prettierOptions = JSON.parse(prettierConfig) as Options;
  prettierOptions.parser = 'json';

  const formattedText = format(JSON.stringify(angularJson, null, 2), prettierOptions);
  return formattedText;
}
