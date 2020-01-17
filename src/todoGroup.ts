import { CommandGroupBuilder } from "@enitoni/gears-discordjs"
import { matchPrefixes } from "@enitoni/gears"
import { addCommand } from "./addCommand"
import { listCommand } from "./listCommand"
import { clearCommand } from "./clearCommand"

export const todoGroup = new CommandGroupBuilder()
  .match(matchPrefixes("!todo"))
  .setCommands(addCommand, clearCommand, listCommand)
  .done()
