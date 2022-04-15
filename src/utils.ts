import * as path from 'path'
import { window, workspace } from 'vscode'
import { apps } from 'open'
import type { Uri } from 'vscode'
import type { AppName, Options } from 'open'

function getBrowserOption(name: string) {
  return {
    app: {
      name: apps[name as AppName] || name,
    },
  }
}

const browserMap = new Map<string, Pick<Options, 'app'> | undefined>([
  ['System Default', undefined],
  ['Chrome', getBrowserOption('chrome')],
  ['Firefox', getBrowserOption('firefox')],
  ['Opera', getBrowserOption('opera')],
  ['Safari', getBrowserOption('safari')],
  ['Edge', getBrowserOption('edge')],
])

export function getOpenOptions(name: string) {
  return browserMap.get(name) as Options
}

export function getConfig<T = any>(key: string): T | undefined {
  return workspace.getConfiguration().get<T>(key)
}

export function getActiveFileWorkspace() {
  const workspaceFolder = workspace.getWorkspaceFolder(window?.activeTextEditor?.document?.uri as Uri)
  return workspaceFolder?.uri.fsPath as string
}

export function getActiveFilePath() {
  return window?.activeTextEditor?.document?.fileName as string
}

export function getActiveFileRelativePath() {
  return encodeURIComponent(path.relative(getActiveFileWorkspace(), getActiveFilePath())).replace('%2F', '/')
}
