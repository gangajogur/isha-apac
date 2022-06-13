export interface PackageInfo {
  name: string;
  version: string;
}

export interface PackagesList {
  IshaApac: PackageInfo;
  NgxTranslate: PackageInfo;
  JsYaml: PackageInfo;
  EsLintSchematics: PackageInfo;
  AngularMaterial: PackageInfo;
  AngularCommonHttp: PackageInfo;
  AngularForms: PackageInfo;
  FontAwesome: PackageInfo;
  AngularFlexLayout: PackageInfo;
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
  },
  AngularMaterial: {
    name: '@angular/material',
    version: '^13.2.0'
  },
  AngularCommonHttp: {
    name: '@angular/common/http',
    version: '~13.2.0'
  },
  AngularForms: {
    name: '@angular/forms',
    version: '~13.2.0'
  },
  AngularFlexLayout: {
    name: '@angular/flex-layout',
    version: '13.0.0-beta.38'
  },
  FontAwesome: {
    name: '@fortawesome/angular-fontawesome',
    version: '^0.10.1'
  }
};

export const SharedModulePath = '/src/app/shared/shared.module.ts';
export const AppModulePath = '/src/app/app.module.ts';
export const TsConfigPath = '/tsconfig.json';
export const PrettierPath = '/.prettierrc';

export const SchematicCollection = {
  SetupIde: 'setup-ide',
  SetupEsLint: 'setup-eslint',
  EsLintSchematicPrivate: 'eslint-schematic-private',
  SetupProject: 'setup-project',
  MaterialSchematicPrivate: 'angular-material-schematic-private',
  SetupI18n: 'setup-i18n',
  SharedModule: 'shared-module'
};
