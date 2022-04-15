import http from 'http'
import type { Server } from 'http'
import sirv from 'sirv'
import { DEFAULT_SERVER_HOST, DEFAULT_SERVER_PORT } from './constants'
import { getActiveFileRelativePath, getActiveFileWorkspace } from './utils'

export class HttpServer {
  private static app: Server | null = null
  private static port: number = DEFAULT_SERVER_PORT

  static async create(): Promise<string> {
    if (this.app) return `http://localhost:${this.port}/${getActiveFileRelativePath()}`

    this.app = http.createServer(sirv(getActiveFileWorkspace(), {
      dev: true,
      dotfiles: true,
      etag: true,
    }))

    return new Promise((resolve, reject) => {
      const onError = (e: Error & { code?: string }) => {
        if (e.code === 'EADDRINUSE') {
          this.app!.listen(++this.port, DEFAULT_SERVER_HOST)
        } else {
          this.app!.removeListener('error', onError)
          reject(e)
        }
      }

      this.app!.on('error', onError)

      this.app!.listen(this.port, DEFAULT_SERVER_HOST, () => {
        this.app!.removeListener('error', onError)
        resolve(`http://localhost:${this.port}/${getActiveFileRelativePath()}`)
      })
    })
  }
}
