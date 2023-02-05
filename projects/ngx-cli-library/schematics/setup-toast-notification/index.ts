import { chain, MergeStrategy, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { addModuleImportToModule } from '@angular/cdk/schematics';
import { BaseSchema } from '../base.schema';
import { addFilesToStyles } from '../helpers/angular-json.helper';
import { getQualifiedPath } from '../helpers/path.helper';
import { moveFiles } from '../helpers/schematics-helper';
import { AppModulePath, Packages } from '../schematics.constants';

// @ts-ignore
export function setupToastNotification(options: BaseSchema): Rule {
  // @ts-ignore
  return async (host: Tree, context: SchematicContext) => {
    context.logger.log('info', 'Adding toast notification capabilities');
    return chain([
      copyResources(options),
      addImportExportToModule(context, options),
      addStylesToAngularJsonFile(options)
    ]);
  };
}

// @ts-ignore
function copyResources(options: BaseSchema): Rule {
  return () => {
    // const templateSource = apply(url('./files'), [move(normalize(getQualifiedPath(options, '')))]);
    // return mergeWith(templateSource, MergeStrategy.Overwrite);
    return moveFiles(options, '', MergeStrategy.Overwrite);
  };
}

// @ts-ignore
function addImportExportToModule(context: SchematicContext, options: BaseSchema): Rule {
  return (host: Tree) => {
    addModuleImportToModule(host, getQualifiedPath(options, AppModulePath), 'CoreModule', Packages.IshaApac.name);
    return host;
  };
}

// @ts-ignore
function addStylesToAngularJsonFile(options: BaseSchema): Rule {
  // @ts-ignore
  return (host: Tree, context: SchematicContext) => {
    addFilesToStyles(options, ['src/assets/scss/toast-notification.scss'], host);
    return host;
  };
}
