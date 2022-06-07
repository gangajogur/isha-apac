import { Schema as MaterialNgAddSchema } from '@angular/material/schematics/ng-add/schema';

export interface ProjectSchema extends MaterialNgAddSchema {
  // The path to create the service.
  path?: string;
}
