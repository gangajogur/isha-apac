import { normalize } from '@angular-devkit/core';
import { apply, chain, mergeWith, move, Rule, SchematicContext, Tree, url } from '@angular-devkit/schematics';
import { addSymbolToNgModuleMetadata, insertImport, parseSourceFile } from '@angular/cdk/schematics';
import { commitChange } from '../helpers/schematics-helper';
import { Packages, SharedModulePath } from '../schematics.constants';

// @ts-ignore
export function setupSharedModule(): Rule {
  // @ts-ignore
  return async (host: Tree, context: SchematicContext) => {
    context.logger.log('info', 'Setting up shared module');
    return chain([copyResources(), copyOptionalFiles(), addInectionTokenProviderToModule()]);
  };
}

function copyResources(): Rule {
  return () => {
    const templateSource = apply(url('./files'), [move(normalize(``))]);
    return mergeWith(templateSource);
  };
}

function copyOptionalFiles(): Rule {
  return (host: Tree) => {
    if (host.exists(SharedModulePath)) {
      return;
    }
    const templateSource = apply(url('./files-optional'), [move(normalize(``))]);
    return mergeWith(templateSource);
  };
}

function addInectionTokenProviderToModule(): Rule {
  return (host: Tree) => {
    if (!host.exists(SharedModulePath)) {
      return;
    }

    const source = parseSourceFile(host, SharedModulePath);

    const exportChanges = addSymbolToNgModuleMetadata(
      source,
      SharedModulePath,
      'providers',
      `{provide: InjectionTokens.environment,useValue: environment}`,
      null
    );
    commitChange(host, SharedModulePath, exportChanges);

    const injectionTokenImportChange = insertImport(
      source,
      SharedModulePath,
      'InjectionTokens',
      Packages.IshaApac.name
    );
    commitChange(host, SharedModulePath, [injectionTokenImportChange]);

    const environmentImportChange = insertImport(
      source,
      SharedModulePath,
      'environment',
      '../../environments/environment'
    );
    commitChange(host, SharedModulePath, [environmentImportChange]);

    return host;
  };
}
