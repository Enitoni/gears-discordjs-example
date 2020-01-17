import { CommandBuilder } from "@enitoni/gears-discordjs"
import { matchPrefixes } from "@enitoni/gears"
import { TodoService } from "./TodoService"

export const clearCommand = new CommandBuilder()
  .match(matchPrefixes("clear"))
  .use(async context => {
    const { manager, content, message } = context
    const service = manager.getService(TodoService)

    const index = Number(content) - 1
    const list = await service.getOrCreateList(message.author)

    if (isNaN(index) || index < 0 || index >= list.length) {
      return message.channel.send(
        `Specify a number between 1 and ${list.length}`
      )
    }

    service.clear(message.author, index)
    return message.channel.send("OK, the reminder was cleared.")
  })
  .done()
