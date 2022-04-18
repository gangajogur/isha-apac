import { normalize } from '@angular-devkit/core';
import {
  apply,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  Tree,
  url
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addModuleImportToModule } from '@angular/cdk/schematics';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';

// @ts-ignore
export function setupI18n(): Rule {
  // @ts-ignore
  return async (host: Tree, context: SchematicContext) => {
    context.logger.log('info', 'Setting up internationalisation (i18n)');
    return chain([copyResources(), addModuleImport(), addPackageJsonDependencies(), installPackageJsonDependencies()]);
  };
}

function copyResources(): Rule {
  return () => {
    const templateSource = apply(url('./files'), [move(normalize(``))]);
    return mergeWith(templateSource, MergeStrategy.Overwrite);
  };
}

function addModuleImport(): Rule {
  return (host: Tree) => {
    // const projectPath = await getProjectPath(host, schema);
    addModuleImportToModule(host, `/src/app/app.module.ts`, 'I18NModule', './i18n/i18n.module');
    return host;
  };
}

function addPackageJsonDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    const dependencies: NodeDependency[] = [
      { type: NodeDependencyType.Default, version: '^14.0.0', name: '@ngx-translate/core' },
      { type: NodeDependencyType.Default, version: '^4.1.0', name: 'js-yaml' }
    ];

    dependencies.forEach(dependency => {
      addPackageJsonDependency(host, dependency);
      context.logger.log('info', `✅️ Added "${dependency.name}" into ${dependency.type}`);
    });

    return host;
  };
}

function installPackageJsonDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.logger.log('info', `🔍 Installing packages...`);

    return host;
  };
}
