import TelegramBot from "node-telegram-bot-api";
import { Octokit } from "@octokit/rest";
const octokit = new Octokit({ auth: 'ccf1c7d9cea9e29b6fd8b7432c71d88e1950e201'});
export const handleGithub = (bot: TelegramBot) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    return async (msg: any) => {
        const chatId = msg.chat.id;
        const users = await
            octokit.users.listFollowingForUser({ username: 'buhe', per_page: 10});
        // console.log(JSON.stringify(orgs));
        
        await users.data.forEach(async u => {
            // console.log(u!.login)
            let names = '';
            const orgs = await octokit.activity.listReposStarredByUser({
                username: u!.login,
                per_page: 1
            });
            
            orgs.data.forEach(o => {
                names = names + o.html_url;
            });
            bot.sendMessage(chatId, names);
            // console.log(names);
        })
        
        // send back the matched "whatever" to the chat
    }

}