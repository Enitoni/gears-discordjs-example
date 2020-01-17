import { CommandBuilder } from "@enitoni/gears-discordjs"
import { matchAlways } from "@enitoni/gears"
import { TodoService } from "./TodoService"

export const listCommand = new CommandBuilder()
  .match(matchAlways())
  .use(async context => {
    const { manager, message } = context

    const service = manager.getService(TodoService)
    const list = await service.getOrCreateList(message.author)

    if (list.length === 0) {
      return message.channel.send(`No reminders for ${message.author}.`)
    }

    const reminders = list
      .map((reminder, index) => `${index + 1}. ${reminder}`)
      .join("\n")

    return message.channel.send(reminders)
  })
  .done()
