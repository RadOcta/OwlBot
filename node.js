const Discord = require('discord.js');
const { prefix, token } = require('./Client/Config.json');
const client = new Discord.Client();
const Report = new require('./Client/Commands.js');

client.once('ready', () => {
    console.log('\nClient is ready!\n----------------');
    // List servers the bot is connected to
    client.guilds.forEach((guild) => {

        owner = guild.owner;
        owner = owner.toString();

        if (owner.includes("!"))
            owner = owner.split("!")[1].split(">")[0];
        else
            owner = owner.split("@")[1].split(">")[0];
        
        console.log("Server Name: " + guild.name
        + "\nOwner: " + client.users.get(owner).username 
        + "\nRegion: " + guild.region
        + "\nMembers: " + guild.memberCount
        + "\n------------------------------------------------------------------------")
    })

    console.log("\n")
    client.user.setActivity("my existencial crisis..", {type:"STREAMING"})
});

client.on('disconnect', function(erMsg, code) {

    console.log('\n----- Client disconnected from Discord with code', code, 'for reason:', erMsg, '-----\n-------------------------------');
    client.connect();
});

client.on('reconnecting', () => console.log('\nClient has reconnected!\n-------------------------------'));

client.on("message", msg => {

    // Logging Convos
    user = msg.author;
    user = user.toString();

    if (user.includes("!"))
        user = user.split("!")[1].split(">")[0];
    else
        user = user.split("@")[1].split(">")[0];
    
    message = "Message: " + msg.content; // + "\nAttachments: " + msg.attachments._array;
    /* ------------------------------------------------------------ */

    console.log("\nDate: [" + msg.author.createdAt + "]"
        + "\nUser: " +  msg.author.tag /* client.users.get(user).username + "#" +*/
        + "\nUser ID: " + msg.author
        + "\nChannel: #" + msg.channel.name
        + "\n" + message
        + "\n------------------------------------------------------------------------");

    // Some Commands to be used on Channels

    if (msg.content === '!report') {
        const reports = new Report(msg.content);
    }
});

client.login(token);