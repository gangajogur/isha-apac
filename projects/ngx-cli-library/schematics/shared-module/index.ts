import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { addSymbolToNgModuleMetadata, insertImport, parseSourceFile } from '@angular/cdk/schematics';
import { BaseSchema } from '../base.schema';
import { getQualifiedPath } from '../helpers/path.helper';
import { commitChange, moveFiles } from '../helpers/schematics-helper';
import { Packages, SharedModulePath } from '../schematics.constants';

// @ts-ignore
export function setupSharedModule(options: BaseSchema): Rule {
  // @ts-ignore
  return async (host: Tree, context: SchematicContext) => {
    context.logger.log('info', 'Setting up shared module');
    return chain([copyResources(options), copyOptionalFiles(options), addInectionTokenProviderToModule(options)]);
  };
}

function copyResources(options: BaseSchema): Rule {
  return () => {
    // const templateSource = apply(url('./files'), [move(normalize(getQualifiedPath(options, '')))]);
    // return mergeWith(templateSource);
    return moveFiles(options);
  };
}

function copyOptionalFiles(options: BaseSchema): Rule {
  return (host: Tree) => {
    const sharedModulePath = getQualifiedPath(options, SharedModulePath);
    if (host.exists(sharedModulePath)) {
      return;
    }
    // const templateSource = apply(url('./files-optional'), [move(normalize(getQualifiedPath(options, '')))]);
    // return mergeWith(templateSource);
    return moveFiles(options);
  };
}

function addInectionTokenProviderToModule(options: BaseSchema): Rule {
  return (host: Tree) => {
    const sharedModulePath = getQualifiedPath(options, SharedModulePath);
    if (!host.exists(sharedModulePath)) {
      return;
    }

    const source = parseSourceFile(host, sharedModulePath);

    const exportChanges = addSymbolToNgModuleMetadata(
      source,
      sharedModulePath,
      'providers',
      `{provide: InjectionTokens.environment,useValue: environment}`,
      null
    );
    commitChange(host, sharedModulePath, exportChanges);

    const injectionTokenImportChange = insertImport(
      source,
      sharedModulePath,
      'InjectionTokens',
      Packages.IshaApac.name
    );
    commitChange(host, sharedModulePath, [injectionTokenImportChange]);

    const environmentImportChange = insertImport(
      source,
      sharedModulePath,
      'environment',
      '../../environments/environment'
    );
    commitChange(host, sharedModulePath, [environmentImportChange]);

    return host;
  };
}
