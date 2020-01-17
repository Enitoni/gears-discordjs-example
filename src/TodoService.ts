import { Service } from "@enitoni/gears-discordjs"
import { User } from "discord.js"
import { JSONStorage } from "./JSONStorage"

const storage = new JSONStorage<Record<string, string[]>>("reminders.json", {})

export class TodoService extends Service {
  public async getOrCreateList(user: User) {
    const existingList = storage.data[user.id]

    if (existingList) {
      return existingList
    }

    const newList: string[] = []
    await storage.save({ ...storage.data, [user.id]: [] })

    return newList
  }

  public async add(user: User, reminder: string) {
    const list = await this.getOrCreateList(user)
    list.push(reminder)

    await storage.save({ ...storage.data, [user.id]: list })
  }

  public async clear(user: User, index: number) {
    const list = await this.getOrCreateList(user)
    list.splice(index, 1)

    await storage.save({ ...storage.data, [user.id]: list })
  }

  public async serviceDidInitialize() {
    await storage.restore()
  }
}
