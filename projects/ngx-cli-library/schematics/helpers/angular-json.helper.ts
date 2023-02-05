import { Rule, Tree } from '@angular-devkit/schematics';
import { BaseSchema } from '../base.schema';
import { AngularJsonPath, PrettierPath } from '../schematics.constants';
import { getPrettierFormattedText } from './json.formatter';
import { getQualifiedPath } from './path.helper';
import { cleanseJson } from './schematics-helper';

// @ts-ignore
export function addFilesToStyles(options: BaseSchema, filePaths: string[], host: Tree): Rule {
  const angularJsonPath = AngularJsonPath;
  // @ts-ignore
  if (host.exists(angularJsonPath)) {
    const angular = getAngularJsonFile(host);
    // console.log('App Detection & your options: \n', options);
    // angular['projects'][options.project]['architect']['build']['options']['stylePreprocessorOptions'] = {
    //   includePaths: ['src/scss/']
    // };
    // angular['projects'][options.project]['architect']['build']['options']['es5BrowserSupport'] = true;
    const props = ['build', 'test'];
    props.forEach(prop => {
      const items = angular['projects'][options?.project]['architect'][prop]['options']['styles'] as string[];
      const missingPaths = filePaths.filter(a => !items.some(b => b === a)).map(a => getQualifiedPath(options, a));
      items.push(...missingPaths);
    });

    const formattedText = getPrettierFormattedText(host, options, angular, PrettierPath);
    host.overwrite(angularJsonPath, formattedText);
  }
}

function getAngularJsonFile(host: Tree) {
  const angularJsonPath = AngularJsonPath;
  const currentAngularJson = host.read(angularJsonPath)?.toString('utf-8') || '';
  const angular = JSON.parse(cleanseJson(currentAngularJson));
  return angular;
}
