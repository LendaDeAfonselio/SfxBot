//Packages and dependencies
const Discord = require('discord.js');
const fs = require('fs');

//Instances
const client = new Discord.Client();
const auth = require('./auth.json');

client.commands = new Discord.Collection();

//Gets all command names by the name of their file
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//Gets all the names of the sfxs
const sfxFiles = fs.readdirSync('./soundEffects').filter(file => file.endsWith('.mp3'));

//Retrieves all commands
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

//Ready
client.once('ready', () => {
    client.user.setActivity(" BITCONNEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEECT!");
});

/****************** Basic functions ******************************/
//reconnect
client.once('reconnecting', () => {
    console.log('Reconnecting!');
});

//Disconnect
client.once('disconnect', () => {
    console.log('Disconnect!');
});

/*************************** Dinamic Commands ************************/
client.on('message', message => {
    var args = message.content.slice(auth.prefix.length).split(/ +/);
    var command = args.shift();
    if (!message.content.startsWith(auth.prefix) || !client.commands.has(command)) return;

    else {
        try {
            console.log(sfxFiles);
            client.commands.get(command).execute(message, args, sfxFiles, function(data){
                if(data != null){
                    sfxFiles.push(data);
                }
            });
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
    }
});

//Login
client.login(auth.token);