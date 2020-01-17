import { Bot } from "@enitoni/gears"
import { Adapter } from "@enitoni/gears-discordjs"
import { token } from "../config.json"
import { TodoService } from "./TodoService.js"
import { todoGroup } from "./todoGroup.js"

const adapter = new Adapter({ token })
const bot = new Bot({
  adapter,
  commands: [todoGroup],
  services: [TodoService]
})

async function main() {
  await bot.start()
  console.log("Bot is running!")
}

main()
