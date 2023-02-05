import { chain, Rule, schematic, SchematicContext, Tree } from '@angular-devkit/schematics';
import { addModuleImportToModule } from '@angular/cdk/schematics';
import { CompilerOptions } from 'typescript';
import { getPrettierFormattedText } from '../helpers/json.formatter';
import { getQualifiedPath } from '../helpers/path.helper';
import { addPackagesJsonDependencies, cleanseJson, installPackageJsonDependencies } from '../helpers/schematics-helper';
import { AppModulePath, Packages, PrettierPath, SchematicCollection, TsConfigPath } from '../schematics.constants';
import { ProjectSchema } from './schema';

// @ts-ignore
export function setupProject(options: ProjectSchema): Rule {
  // @ts-ignore
  return async (host: Tree, context: SchematicContext) => {
    context.logger.log('info', 'Setting the Angular Material');
    return chain([
      schematic(SchematicCollection.SetupIde, options),
      schematic(SchematicCollection.SetupToastNotification, options),
      schematic(SchematicCollection.SetupAngularMaterial, options),
      addProjectDependencies(options),
      installPackageJsonDependencies(),
      addImportExportToModule(options),
      updateTsConfigFile(options)
    ]);
  };
}

// @ts-ignore
function addImportExportToModule(options: ProjectSchema): Rule {
  return (host: Tree) => {
    const appModulePath = getQualifiedPath(options, AppModulePath);
    addModuleImportToModule(host, appModulePath, 'HttpClientModule', Packages.AngularCommonHttp.name);
    addModuleImportToModule(host, appModulePath, 'ReactiveFormsModule', Packages.AngularForms.name);
    addModuleImportToModule(host, appModulePath, 'FlexLayoutModule', Packages.AngularFlexLayout.name);
    addModuleImportToModule(host, appModulePath, 'FontAwesomeModule', Packages.FontAwesome.name);
    addModuleImportToModule(host, appModulePath, 'CoreModule', Packages.IshaApac.name);
    return host;
  };
}

// @ts-ignore
function addProjectDependencies(options: ProjectSchema): Rule {
  return (host: Tree, context: SchematicContext) => {
    const packages = [Packages.AngularFlexLayout, Packages.FontAwesome];
    addPackagesJsonDependencies(host, context, options, packages);
    return host;
  };
}

function updateTsConfigFile(options: ProjectSchema): Rule {
  // @ts-ignore
  return (host: Tree, context: SchematicContext) => {
    const tsConfigPath = getQualifiedPath(options, TsConfigPath);
    if (host.exists(tsConfigPath)) {
      const currentTsConfigJson = host.read(tsConfigPath)?.toString('utf-8') || '';
      const json = JSON.parse(cleanseJson(currentTsConfigJson));
      const compilerOptions = json['compilerOptions'] as CompilerOptions;
      compilerOptions.paths = {
        ...compilerOptions.paths,
        ...{
          '@environment': ['"./src/environments/environment.ts"'],
          '@app/*': ['./src/app/*'],
          '@testing/*': ['./src/testing/*']
        }
      };

      const formattedText = getPrettierFormattedText(host, options, json, PrettierPath);
      host.overwrite(tsConfigPath, formattedText);
    }
    return host;
  };
}
