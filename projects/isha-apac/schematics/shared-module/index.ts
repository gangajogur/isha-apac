import { normalize } from '@angular-devkit/core';
import { apply, chain, mergeWith, move, Rule, SchematicContext, Tree, url } from '@angular-devkit/schematics';
import { addSymbolToNgModuleMetadata, insertImport, parseSourceFile } from '@angular/cdk/schematics';
import { applyToUpdateRecorder, Change } from '@schematics/angular/utility/change';
import { addPackagesJsonDependencies } from '../helpers/schematics-helper';
import { Packages } from '../schematics.constants';

// @ts-ignore
export function setupSharedModule(): Rule {
  // @ts-ignore
  return async (host: Tree, context: SchematicContext) => {
    context.logger.log('info', 'Setting up shared module');
    return chain([copyResources(), addPackageJsonDependencies(), addInectionTokenProviderToModule()]);
  };
}

function copyResources(): Rule {
  return () => {
    const templateSource = apply(url('./files'), [move(normalize(``))]);
    return mergeWith(templateSource);
  };
}

// @ts-ignore
function addPackageJsonDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    const packages = [Packages.IshaApac];
    addPackagesJsonDependencies(host, context, packages);
    return host;
  };
}

function addInectionTokenProviderToModule(): Rule {
  return (host: Tree) => {
    const modulePath = '/src/app/shared/shared.module.ts';
    const source = parseSourceFile(host, modulePath);

    const exportChanges = addSymbolToNgModuleMetadata(
      source,
      modulePath,
      'providers',
      `{provide: InjectionTokens.environment,useValue: environment}`,
      null
    );
    commitChange(host, modulePath, exportChanges);

    const injectionTokenImportChange = insertImport(source, modulePath, 'InjectionTokens', '@gangajogur/isha-apac');
    commitChange(host, modulePath, [injectionTokenImportChange]);

    const environmentImportChange = insertImport(source, modulePath, 'environment', '../../environments/environment');
    commitChange(host, modulePath, [environmentImportChange]);

    return host;
  };
}

function commitChange(host: Tree, modulePath: string, changes: Change[]) {
  const injectionTokenImportRecorder = host.beginUpdate(modulePath);
  applyToUpdateRecorder(injectionTokenImportRecorder, changes);
  host.commitUpdate(injectionTokenImportRecorder);
}
