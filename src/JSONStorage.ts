import { promises as fs } from "fs"
import * as path from "path"

const DIR = "storage"

export class JSONStorage<T> {
  public data: T
  private path: string

  constructor(name: string, defaultValue: T) {
    this.path = path.join(DIR, name)
    this.data = defaultValue
  }

  public async restore() {
    try {
      const readData = await fs.readFile(this.path, "utf8")
      const parsedData = JSON.parse(readData)

      this.data = parsedData
    } catch (e) {
      await this.save(this.data)
    }
  }

  public async save(data: T) {
    this.data = data
    const stringifiedData = JSON.stringify(data)
    await fs.writeFile(this.path, stringifiedData)
  }
}
