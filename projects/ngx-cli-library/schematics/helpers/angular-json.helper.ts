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
    const props = ['build', 'test'];
    props.forEach(prop => {
      const items = angular['projects'][options?.project]['architect'][prop]['options']['styles'] as string[];
      const missingPaths = filePaths.filter(a => !items.some(b => b === a));
      items.push(...missingPaths);
    });

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
  if (!host.exists(PrettierPath)) {
    return JSON.stringify(angularJson, null, 2);
  }
  const prettierConfig = host.read(PrettierPath)?.toString('utf-8') || '';
  const prettierOptions = JSON.parse(prettierConfig) as Options;
  prettierOptions.parser = 'json';

  const formattedText = format(JSON.stringify(angularJson, null, 2), prettierOptions);
  return formattedText;
}
