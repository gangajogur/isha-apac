import { chain, Rule, schematic, SchematicContext, Tree } from '@angular-devkit/schematics';
import { addModuleImportToModule } from '@angular/cdk/schematics';
import { format, Options } from 'prettier';
import { CompilerOptions } from 'typescript';
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
      addProjectDependencies(),
      installPackageJsonDependencies(),
      addImportExportToModule(),
      updateTsConfigFile()
    ]);
  };
}

// @ts-ignore
function addImportExportToModule(): Rule {
  return (host: Tree) => {
    addModuleImportToModule(host, AppModulePath, 'HttpClientModule', Packages.AngularCommonHttp.name);
    addModuleImportToModule(host, AppModulePath, 'ReactiveFormsModule', Packages.AngularForms.name);
    addModuleImportToModule(host, AppModulePath, 'FlexLayoutModule', Packages.AngularFlexLayout.name);
    addModuleImportToModule(host, AppModulePath, 'FontAwesomeModule', Packages.FontAwesome.name);
    addModuleImportToModule(host, AppModulePath, 'CoreModule', Packages.IshaApac.name);
    return host;
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

function updateTsConfigFile(): Rule {
  // @ts-ignore
  return (host: Tree, context: SchematicContext) => {
    if (host.exists(TsConfigPath)) {
      const currentTsConfigJson = host.read(TsConfigPath)?.toString('utf-8') || '';
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

      const prettierConfig = host.read(PrettierPath)?.toString('utf-8') || '';
      const prettierOptions = JSON.parse(prettierConfig) as Options;
      prettierOptions.parser = 'json';

      const formattedText = format(JSON.stringify(json, null, 2), prettierOptions);
      host.overwrite(TsConfigPath, formattedText);
    }
    return host;
  };
}
