import type { ExtensionContext } from 'vscode'
import { commands } from 'vscode'
import open from 'open'
import { getActiveFilePath, getActiveFileWorkspace, getConfig, getOpenOptions } from './utils'
import { HttpServer } from './server'

export function activate(ctx: ExtensionContext) {
  ctx.subscriptions.push(
    commands.registerCommand('open-in-browser.open', async () => {
      const { defaultBrowser, useLocalServer } = getConfig('open-in-browser')
      const target = useLocalServer && getActiveFileWorkspace() ? await HttpServer.create() : getActiveFilePath()
      open(target, getOpenOptions(defaultBrowser))
    })
  )
}

export function deactivate() {}
