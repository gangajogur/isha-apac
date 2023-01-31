import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { SchematicCollection } from '../schematics.constants';
import { NgAddSchema } from './schema';

// Just return the tree
export function ngAdd(options: NgAddSchema): Rule {
  // @ts-ignore
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    if (options.i18n) {
      context.addTask(new RunSchematicTask(SchematicCollection.SetupI18n, options));
    }
    context.addTask(new RunSchematicTask(SchematicCollection.SharedModule, options));
    context.addTask(new RunSchematicTask(SchematicCollection.SetupEsLint, options));
    context.addTask(new RunSchematicTask(SchematicCollection.SetupProject, options));
    context.addTask(new RunSchematicTask(SchematicCollection.SetupIde, options));
    return tree;
  };
}
