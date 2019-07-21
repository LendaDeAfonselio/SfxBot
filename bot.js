//Packages and dependencies
const Discord = require('discord.js');

//Instancias
const client = new Discord.Client();
const auth = require('./auth.json');

//Para listar sfx pode ser fix
// for (const file of commandFiles) {
//     const command = require(`./${file}`);
//     client.commands.set(command.name, command);
// }

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
    // 
});