const { readdirSync } = require('fs');
const slashs = [];

module.exports = (client) => {
    let count = 0;
    readdirSync('./slashs').forEach(dir => {
        const commands = readdirSync(`./slashs/${dir}`).filter(file => file.endsWith('.js'));
        for (const file of commands) {
            const pull = require(`../slashs/${dir}/${file}`)
            if (pull.name) {
                client.interactions.set(pull.name, pull);
                slashs.push(pull);
                count++;
            } else {
                continue;
            }
        }
    });
    client.once('ready', async () => {
        await client.application.commands.set(slashs);
    })
    console.log(`${count} slashCommand was loaded!`);
}