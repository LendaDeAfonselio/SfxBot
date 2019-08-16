const auth = require('./../auth.json');
const Discord = require('discord.js');

module.exports = {
    name: 'list',
    description: 'List of all stored sfxs',
    usage: auth.prefix + 'list',
    execute(message, args, sfxList) {
        const embed = new Discord.RichEmbed()
            .setTitle("The sound effects available are the following:")
            .setColor(0x00AE86)
            .setThumbnail("https://s.yimg.com/ny/api/res/1.2/So65mDfUlUAoCWX8AGFMsw--~A/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9ODAw/http://media.zenfs.com/en-US/homerun/ccn_656/4d1bc5769467a05729237bdb02557fd6")
            .setTimestamp()
            .addBlankField(true)
            .setURL("")
            .addField(sfxList.join("\n"));
        message.channel.send({ embed });
    }
};