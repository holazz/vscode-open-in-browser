import type { ExtensionContext } from 'vscode'
import { commands } from 'vscode'
import open from 'open'
import { getActiveFilePath, getConfig, getOpenOptions } from './utils'
import { Server } from './server'

export function activate(ctx: ExtensionContext) {
  ctx.subscriptions.push(
    commands.registerCommand('open-in-browser.open', async () => {
      const { defaultBrowser, useLocalServer } = getConfig('open-in-browser')
      const target = useLocalServer ? await Server.create() : getActiveFilePath()
      open(target, getOpenOptions(defaultBrowser))
    })
  )
}

export function deactivate() {}
