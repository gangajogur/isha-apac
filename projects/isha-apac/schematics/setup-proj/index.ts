import { normalize } from '@angular-devkit/core';
import {
  apply,
  chain,
  externalSchematic,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  Tree,
  url
} from '@angular-devkit/schematics';
import { addModuleImportToModule } from '@angular/cdk/schematics';
import {
  addPackagesJsonDependencies,
  installPackageJsonDependencies,
  ngAddExternal
} from '../helpers/schematics-helper';
import { AppModulePath, Packages } from '../schematics.constants';
import { ProjectSchema } from './schema';

// @ts-ignore
export function setupProject(options: ProjectSchema): Rule {
  // @ts-ignore
  return async (host: Tree, context: SchematicContext) => {
    context.logger.log('info', 'Setting the Angular Material');
    return chain([
      addAngularMaterial(options),
      copyResources(),
      addProjectDependencies(),
      installPackageJsonDependencies(),
      addImportExportToModule()
    ]);
  };
}

export function angularMaterialSchematicPrivate(options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    console.log('Running dependency schematics...\n');
    const materialOptions: ProjectSchema = {
      ...options,
      theme: 'custom',
      animations: 'enabled',
      typography: true
    };
    return chain([externalSchematic(Packages.AngularMaterial.name, 'ng-add', materialOptions)]);
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
    addModuleImportToModule(host, AppModulePath, 'HttpClientModule', Packages.AngularCommonHttp.name);
    addModuleImportToModule(host, AppModulePath, 'ReactiveFormsModule', Packages.AngularForms.name);
    addModuleImportToModule(host, AppModulePath, 'FlexLayoutModule', Packages.AngularFlexLayout.name);
    addModuleImportToModule(host, AppModulePath, 'FontAwesomeModule', Packages.FontAwesome.name);
    // const source = parseSourceFile(host, SharedModulePath);
    // const exportChanges = addExportToModule(source, SharedModulePath, 'I18NModule', Packages.IshaApac.name);
    // commitChange(host, SharedModulePath, exportChanges);
    return host;
  };
}

// @ts-ignore
function addAngularMaterial(options): Rule {
  // @ts-ignore
  return (host: Tree, context: SchematicContext) => {
    const packages = [Packages.AngularMaterial];
    // ensure this matches to the schematic name in collection.json
    const privateSchematicName = 'angular-material-schematic-private';
    return ngAddExternal(packages, privateSchematicName, options);
  };
}

// @ts-ignore
function addProjectDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    const packages = [Packages.AngularFlexLayout, Packages.FontAwesome];
    addPackagesJsonDependencies(host, context, packages);
    return host;
  };
}
