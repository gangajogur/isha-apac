import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { NgAddSchema } from './schema';

// Just return the tree
export function ngAdd(options: NgAddSchema): Rule {
  // @ts-ignore
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.addTask(new RunSchematicTask('setup-ide', options));
    context.addTask(new RunSchematicTask('shared-module', options));
    if (options.i18n) {
      context.addTask(new RunSchematicTask('setup-i18n', options));
    }
    return tree;
  };
}
