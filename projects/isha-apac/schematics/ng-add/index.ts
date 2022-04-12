import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { BaseSchema } from '../base.schema';

// Just return the tree
export function ngAdd(options: BaseSchema): Rule {
  // @ts-ignore
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.addTask(new RunSchematicTask('setup-ide', options));
    return tree;
  };
}
