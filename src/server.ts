import Koa from 'koa'
import serve from 'koa-static'
import portfinder from 'portfinder'
import { DEFAULT_SERVER_PORT } from './constants'
import { getActiveFileRelativePath, getActiveFileWorkspace } from './utils'

export class Server {
  private static app: Koa | null = null
  private static port: number = DEFAULT_SERVER_PORT

  static async create(): Promise<string> {
    if (this.app) return `http://localhost:${this.port}/${getActiveFileRelativePath()}`

    this.app = new Koa()
    this.port = await portfinder.getPortPromise({ port: this.port })
    this.app.use(serve(getActiveFileWorkspace()))

    return new Promise((resolve) => {
      this.app!.listen(this.port, () => {
        resolve(`http://localhost:${this.port}/${getActiveFileRelativePath()}`)
      })
    })
  }
}
