import { virtualFs, workspaces } from '@angular-devkit/core';
import { SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { applyToUpdateRecorder, Change } from '@schematics/angular/utility/change';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { BaseSchema } from '../base.schema';
import { PackageInfo } from '../schematics.constants';
export function createHost(tree: Tree): workspaces.WorkspaceHost {
  return {
    async readFile(path: string): Promise<string> {
      const data = tree.read(path);
      if (!data) {
        throw new SchematicsException('File not found.');
      }
      return virtualFs.fileBufferToString(data);
    },
    async writeFile(path: string, data: string): Promise<void> {
      return tree.overwrite(path, data);
    },
    async isDirectory(path: string): Promise<boolean> {
      return !tree.exists(path) && tree.getDir(path).subfiles.length > 0;
    },
    async isFile(path: string): Promise<boolean> {
      return tree.exists(path);
    }
  };
}

export async function getProjectPath(tree: Tree, baseSchema: BaseSchema) {
  if (baseSchema?.path) {
    return baseSchema?.path;
  }

  const project = await getProject(tree, baseSchema);
  const projectType = project.extensions['projectType'] === 'application' ? 'app' : 'lib';
  return `${project.sourceRoot}/${projectType}`;
}

export async function getProject(tree: Tree, baseSchema: BaseSchema): Promise<workspaces.ProjectDefinition> {
  const workspace = await getWorkspace(tree);
  const projectName = await getProjectName(tree, baseSchema);
  const project = baseSchema.project != null ? workspace.projects.get(projectName) : null;
  return project as workspaces.ProjectDefinition;
}

export async function getProjectName(tree: Tree, baseSchema: BaseSchema) {
  const workspace = await getWorkspace(tree);
  console.log(JSON.stringify(baseSchema));
  console.log(JSON.stringify(workspace));
  let projectName = '';
  if (!baseSchema.project && typeof workspace.extensions['defaultProject'] === 'string') {
    projectName = workspace.extensions['defaultProject'];
  }

  const project = baseSchema.project != null ? workspace.projects.get(projectName) : null;
  if (!project) {
    throw new SchematicsException(`Invalid project name: ${projectName}`);
  }

  return projectName;
}

export async function getWorkspace(tree: Tree): Promise<workspaces.WorkspaceDefinition> {
  const host = createHost(tree);
  const { workspace } = await workspaces.readWorkspace('/', host);
  return workspace;
}

export function addPackagesJsonDependencies(host: Tree, context: SchematicContext, packages: PackageInfo[]) {
  const dependencies: NodeDependency[] = packages.map(
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
}

export function commitChange(host: Tree, modulePath: string, changes: Change[]) {
  const changeRecorder = host.beginUpdate(modulePath);
  applyToUpdateRecorder(changeRecorder, changes);
  host.commitUpdate(changeRecorder);
}
