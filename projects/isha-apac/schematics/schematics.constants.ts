export interface PackageInfo {
  name: string;
  version: string;
}

export interface PackagesList {
  IshaApac: PackageInfo;
  NgxTranslate: PackageInfo;
  JsYaml: PackageInfo;
  EsLintSchematics: PackageInfo;
}

export const Packages: PackagesList = {
  IshaApac: {
    name: '@gangajogur/isha-apac',
    version: '0.0.47'
  },
  NgxTranslate: {
    name: '@ngx-translate/core',
    version: '^14.0.0'
  },
  JsYaml: {
    name: 'js-yaml',
    version: '^4.1.0'
  },
  EsLintSchematics: {
    name: '@angular-eslint/schematics',
    version: '13.2.1'
  }
};

export const SharedModulePath = '/src/app/shared/shared.module.ts';
