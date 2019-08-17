const fs = require("fs");
const auth = require('./../auth.json');
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'DMs the requiree a list with all the available commands',
    usage: auth.prefix + 'help',

    execute(message, args, client) {
        fs.readdir("./Commands/", (err, files) => {
            if (err) console.error(err);
            let jsfiles = files.filter(f => f.split(".").pop() === "js");
            if (jsfiles.length <= 0) {
                message.channel.send("No commands to load!");
                return;
            }

            const embed = new Discord.RichEmbed()
                .setTitle("A list of my commands:")
                .setColor(0xff80d5)
                .setTimestamp();
            jsfiles.forEach((f) => {
                let props = require(`./${f}`);
                var namelist = props.name;
                var desclist = props.description;
                var usage = props.usage;
                embed.addField(`Command - **${namelist}**`, `Description - ${desclist} \nUsage - ${usage}\n\n`);
            });
            embed.setFooter("Note - It's a work in progress, as so it might be subject to changes.");
            message.author.send({ embed });
        });
    },
};