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
import { addExportToModule, addModuleImportToModule, parseSourceFile } from '@angular/cdk/schematics';
import { InsertChange } from '@schematics/angular/utility/change';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { Packages } from '../schematics.constants';

// @ts-ignore
export function setupI18n(): Rule {
  // @ts-ignore
  return async (host: Tree, context: SchematicContext) => {
    context.logger.log('info', 'Setting up internationalisation (i18n)');
    return chain([
      copyResources(),
      addImportExportToModule(),
      addPackageJsonDependencies(),
      installPackageJsonDependencies()
    ]);
  };
}

function copyResources(): Rule {
  return () => {
    const templateSource = apply(url('./files'), [move(normalize(``))]);
    return mergeWith(templateSource, MergeStrategy.Overwrite);
  };
}

function addImportExportToModule(): Rule {
  return (host: Tree) => {
    const modulePath = '/src/app/shared/shared.module.ts';
    addModuleImportToModule(host, modulePath, 'I18NModule', '../i18n/i18n.module');
    const exportRecorder = host.beginUpdate(modulePath);
    const source = parseSourceFile(host, modulePath);
    const exportChanges = addExportToModule(source, modulePath, 'I18NModule', '../i18n/i18n.module');
    for (const change of exportChanges) {
      if (change instanceof InsertChange) {
        exportRecorder.insertLeft(change.pos, change.toAdd);
      }
    }
    host.commitUpdate(exportRecorder);
    return host;
  };
}

function addPackageJsonDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    const dependencies: NodeDependency[] = Packages.map(
      pkg =>
        ({
          type: NodeDependencyType.Default,
          version: pkg.version,
          name: pkg.name
        } as NodeDependency)
    );

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
