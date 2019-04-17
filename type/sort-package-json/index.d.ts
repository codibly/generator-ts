declare module "sort-package-json" {
  function sortPackageJson<T extends object = any>(json: T): T;

  export = sortPackageJson;
}
