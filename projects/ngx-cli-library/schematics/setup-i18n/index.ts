import { chain, MergeStrategy, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { addModuleImportToModule } from '@angular/cdk/schematics';
import { BaseSchema } from '../base.schema';
import { getQualifiedPath } from '../helpers/path.helper';
import { addPackagesJsonDependencies, installPackageJsonDependencies, moveFiles } from '../helpers/schematics-helper';
import { AppModulePath, Packages } from '../schematics.constants';

// @ts-ignore
export function setupI18n(options: BaseSchema): Rule {
  // @ts-ignore
  return async (host: Tree, context: SchematicContext) => {
    context.logger.log('info', 'Setting up internationalisation (i18n)');

    return chain([
      // schematic(SchematicCollection.SharedModule, options),
      copyResources(options),
      addImportExportToModule(options),
      addi18nDependencies(options),
      installPackageJsonDependencies()
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
function addImportExportToModule(options: BaseSchema): Rule {
  return (host: Tree) => {
    addModuleImportToModule(host, getQualifiedPath(options, AppModulePath), 'I18NModule', Packages.IshaApac.name);
    return host;
  };
}

// @ts-ignore
function addi18nDependencies(options: BaseSchema): Rule {
  return (host: Tree, context: SchematicContext) => {
    const packages = [Packages.NgxTranslate, Packages.JsYaml];
    addPackagesJsonDependencies(host, context, options, packages);
    return host;
  };
}
