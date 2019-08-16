const auth = require('./../auth.json');
const audioFiles = "./SoundEffects/"; //TODO UPDATE

module.exports = {
    name: 'sfx',
    description: 'Plays the sound effect passed as an argument if stored',
    usage: auth.prefix + 'sfx <name>',
    execute(message, args, sfxList) {
        var nameOfFile = args[0] + ".mp3";
        var vc = message.member.voiceChannel;
        if (!vc) {
            return message.reply("You have to be in a voice channel to activate a sound effect");
        }
        if (!sfxList.includes(nameOfFile)) {
            return message.reply("The sfx " + args[0] + " doesn't exist, for a list of all sfxs available do " + auth.prefix + "list");
        }
        else {
            vc.join()
                .then(connection => {
                    const dispatcher = connection.playFile(audioFiles + nameOfFile);
                    dispatcher.on("end", end => {
                        vc.leave();
                    });
                })
                .catch(console.error);
        }
    }
};