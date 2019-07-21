const auth = require('./../auth.json');
const audioFiles = "./"; //TODO UPDATE

module.exports = {
    name: 'sfx',
    description: 'Plays the sound effect passed as an argument if stored',
    usage: auth.prefix + 'sfx <name>',
    execute(message, args, queue, spotifyApi) {
        const serverQueue = queue.get(message.guild.id);

        if(!serverQueue){
            var vc = message.member.voiceChannel;
            if (!vc) {
                return message.reply("You have to be in a voice channel to activate a sound effect");
            }
            else {
                vc.join()
                    .then(connection => {
                        const dispatcher = connection.playFile(audioFiles + args[0] + ".mp3");
                        dispatcher.on("end", end => {
                            vc.leave();
                        });
                    })
                    .catch(console.error);
            }
        }else{
            message.channel.send("Can't play sfx with music already playing");
        }
    }
};