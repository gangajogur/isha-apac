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
    name: '@isha-apac/ngx-cli-library',
    version: '0.0.51'
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
    version: '14.1.2'
  },
  AngularMaterial: {
    name: '@angular/material',
    version: '^14.2.5'
  },
  AngularCommonHttp: {
    name: '@angular/common/http',
    version: '~14.2.7'
  },
  AngularForms: {
    name: '@angular/forms',
    version: '~14.2.7'
  },
  AngularFlexLayout: {
    name: '@angular/flex-layout',
    version: '14.0.0-beta.41'
  },
  FontAwesome: {
    name: '@fortawesome/angular-fontawesome',
    version: '^0.11.1'
  }
};

export const SharedModulePath = '/src/app/shared/shared.module.ts';
export const SharedModuleImportPath = './shared/shared.module';
export const AppModulePath = '/src/app/app.module.ts';
export const MaterialModuleImportPath = './material.module';
export const TsConfigPath = '/tsconfig.json';
export const AngularJsonPath = '/angular.json';
export const PrettierPath = '/.prettierrc';

export const SchematicCollection = {
  SetupIde: 'setup-ide',
  SetupEsLint: 'setup-eslint',
  EsLintSchematicPrivate: 'eslint-schematic-private',
  SetupProject: 'setup-project',
  SetupToastNotification: 'setup-toast-notification',
  SetupAngularMaterial: 'setup-angular-material',
  MaterialSchematicPrivate: 'angular-material-schematic-private',
  SetupI18n: 'setup-i18n',
  SharedModule: 'shared-module'
};
