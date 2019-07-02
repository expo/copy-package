import fs from "fs-extra"
import { join } from "./path"
import findWorkspaceRoot from "find-yarn-workspace-root"

export type PackageManager = "yarn" | "npm" | "npm-shrinkwrap"

export const detectPackageManager = (
  appRootPath: string,
): PackageManager => {
  const yarnLockExists = fs.existsSync(join(appRootPath, "yarn.lock"))
  if (yarnLockExists || findWorkspaceRoot()) {
    return "yarn"
  }

  return "npm";
}