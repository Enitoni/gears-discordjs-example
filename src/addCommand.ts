import { CommandBuilder } from "@enitoni/gears-discordjs"
import { matchPrefixes } from "@enitoni/gears"
import { TodoService } from "./TodoService"

export const addCommand = new CommandBuilder()
  .match(matchPrefixes("add"))
  .use(async context => {
    const { manager, content, message } = context
    const service = manager.getService(TodoService)

    await service.add(message.author, content)
    return message.channel.send("Your reminder has been added!")
  })
  .done()
