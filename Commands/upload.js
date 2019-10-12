const auth = require('./../auth.json');
const audioFiles = "./SoundEffects/"; //TODO UPDATE
const utils = require('./../Utility/utils');
const audioFileExtensions = [".mp3",".m4a"];


module.exports = {
    name: 'upload',
    description: 'Uploads a given sfx passed as an attachment in the message to a local folder called SoundEffects',
    usage: auth.prefix + 'upload <name> **HAS TO CONTAIN AN ATTACHMENT**',
    execute(message, args, sfxList, callback) {
        var musicFileName = args[0];
        if(sfxList.includes(musicFileName)){

            var allFileNames = sfxList.join("\n");

            message.channel.send("There's already a file with that name in the repository, please try to change the name.\n" +
            "The following names are already taken:\n" + allFileNames);
        }
        else{
            const firstAttachment = message.attachments.first();
            if(firstAttachment){
                var extensionType = utils.containsAnyElem(firstAttachment.filename, audioFileExtensions);
                if(extensionType != ""){
                    utils.download(firstAttachment.url, musicFileName + extensionType, audioFiles);
                    callback(musicFileName + extensionType);
                    message.channel.send("The sfx was uploaded with great success!");
                }
                else{
                    message.channel.send("The file you sent has an invalid format");
                }
            }
            else{
                message.channel.send("It seems like you didn't append any attachment... F");
            }
        }
        callback(null);
    }
};