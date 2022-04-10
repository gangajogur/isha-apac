import { Rule, schematic, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { BaseSchema } from '../base.schema';

// Just return the tree
export function ngAdd(options: BaseSchema): Rule {
  // @ts-ignore
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    schematic('ide-setup', options);
    return tree;
  };
}
