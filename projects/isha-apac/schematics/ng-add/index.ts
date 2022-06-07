import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { NgAddSchema } from './schema';

// Just return the tree
export function ngAdd(options: NgAddSchema): Rule {
  // @ts-ignore
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    if (options.i18n) {
      context.addTask(new RunSchematicTask('setup-i18n', options));
    }
    context.addTask(new RunSchematicTask('shared-module', options));
    context.addTask(new RunSchematicTask('setup-eslint', options));
    context.addTask(new RunSchematicTask('setup-project', options));
    context.addTask(new RunSchematicTask('setup-ide', options));
    return tree;
  };
}
