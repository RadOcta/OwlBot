//https://discordapp.com/oauth2/authorize?client_id=430679735186751488&scope=bot&permissions=0

const Discord = require("discord.js");
const PREFIX = "y!";
const YouTube = require('simple-youtube-api');
const GOOGLE_API_KEY = "AIzaSyBeacgPpA6JTR3OBpiD_IIDWC-184xFz04";
//const music = require('discord.js-music');
//const YoutubeDL = require('youtube-dl');
const ytdl = require('ytdl-core');
const TOKEN = "NDMwNjc5NzM1MTg2NzUxNDg4.DaTtUw.cQWijiFZtemSPqWWjfv-7VjE60Q";
const youtube = new YouTube(GOOGLE_API_KEY);
const queue = new Map();
//const music = require('discord.js-music-v11');

function generateHex() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}
/*function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], { filter: "audioonly" }));
    server.dispatcher.setVolume(0.04);

    server.queue.shift();

    server.dispatcher.on("end", function () {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    })
}*/

var servers = {};
var bot = new Discord.Client();
var fortunes = [
    "Yes",
    "No",
    "Maybe",
    "Fuck You"
]

bot.on("ready", function () {
    console.log("Ready");
});

bot.on("guildMemberAdd", function (member) {
    member.guild.channels.find("name", general).sendMessage(member.toString() + "Welcome Bitch Boi!");

    member.addRole(member.guild.roles.find("name", "Non Guild Member"));

    /*member.createRole({
        name: member.user.username,
        color: generateHex(),
        permissions: []
    }).then(function(role) {
        member.addRole(role)
    });*/
});
//function message
bot.on("message", async message => {
    console.log(message.content);

    if (message.content.startsWith("heyo")) {
        message.channel.sendMessage(message.author.toString() + " Heyo my ass. Suck a penus!");
    }

    if (message.content.startsWith("weak")) {
        message.channel.sendMessage(message.author.toString() + " Your dick is weak nigga. Dont make me post it in general.");
    }

    if (message.content.startsWith("haha") || message.content.startsWith("xD") || message.content.startsWith("xd") || message.content.startsWith("XD") || message.content.startsWith("Xd")) {
        message.channel.sendMessage(message.author.toString() + " If I fuck yo mama I wanna see if you will still be laughin bish!");
    }

    if (message.author.equals(bot.user)) return;

    if (message.content.startsWith("<@232926992444555264>") || message.content.startsWith("<@430679735186751488>")) {
        message.channel.sendMessage(message.author.toString() + " Shut up gay fag.");
    }

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(message.guild.id);
	
	let command = message.content.toLowerCase().split(' ')[0];
	command = command.slice(PREFIX.length)

    switch (args[0].toLowerCase()) {
        case "fuck":
            message.channel.sendMessage(message.author.toString() + " I aint fucking yo ugly ass bish!");
            break;
        case "ping":
            message.channel.sendMessage("Pong!");
            break;
        case "info":
            var info = new Discord.RichEmbed()
                .addField("Commands", "y!info" + "\n" + "y!ping" + "\n" + "y!8ball" + "\n" + "y!senpai" + "\n" + "y!play" + "\n" + "y!skip" + "\n" + "y!stop" + "\n" + "y!fuck", true)
				.addField("Description", "Display Commands." + "\n" + "Test Shitty Connection." + "\n" + "Predict Fucks." + "\n" + "Play Some Shit." + "\n" + "Ill Notice You." + "\n" + "Skip The Cancer." + "\n" + "Stop A Tumor." + "\n" + "Fkin around.", true)
                .setColor(0x0a97b6)
                .setFooter("By me bish!")
                .setThumbnail(message.author.avatarURL)
            message.channel.sendEmbed(info);
            break;
        case "8ball":
            if (args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
            else message.channel.sendMessage("Check yo message bish!");
            break;
        case "senpai":
            message.channel.sendMessage(message.author.toString() + " Fuck you");
            break;
        case "play":
            /*if (!args[1]) {
                message.channel.sendMessage("Give a link bish!");
                return;
            }
            if (!message.member.voiceChannel) {
                message.channel.sendMessage("Why aint u in a god damn voice channel cunt.");
                return;
            }
            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function (connection) {
                play(connection, message);

            });
			
			YTDL.getInfo(args[1], function(err, info) {
				console.log(info.title) // "Adele - Hello"
				console.log(info.thumbnail_url + "url example 1")
				
				var song = new Discord.RichEmbed()
					.addField("Song Added To Queue:", "" + info.title + "")
					.setColor(0x0a97b6)
					.setFooter("By me bish!")
					.setThumbnail(info.thumbnail_url)
				message.channel.sendEmbed(song);
			});*/
			
			const voiceChannel = message.member.voiceChannel;
			if (!voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
			const permissions = voiceChannel.permissionsFor(message.client.user);
			if (!permissions.has('CONNECT')) {
				return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
			}
			if (!permissions.has('SPEAK')) {
				return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
			}

			if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
				const playlist = await youtube.getPlaylist(url);
				const videos = await playlist.getVideos();
				for (const video of Object.values(videos)) {
					const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
					await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
				}
				return message.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
			} else {
				try {
					var video = await youtube.getVideo(url);
				} catch (error) {
					try {
						var videos = await youtube.searchVideos(searchString, 10);
						let index = 0;
						message.channel.send(`__**Song selection:**__${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}Please provide a value to select one of the search results ranging from 1-10.`);
						// eslint-disable-next-line max-depth
						try {
							var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
								maxMatches: 1,
								time: 10000,
								errors: ['time']
							});
						} catch (err) {
							console.error(err);
							return message.channel.send('No or invalid value entered, cancelling video selection.');
						}
						const videoIndex = parseInt(response.first().content);
						var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
					} catch (err) {
						console.error(err);
						return message.channel.send('🆘 I could not obtain any search results.');
					}
				}
				return handleVideo(video, message, voiceChannel);
			}
			
			break;
        case "np":
            var server = servers[message.guild.id];
			YTDL.getInfo(args[0], function(err, info) {
				console.log(info.title) // "Adele - Hello"
				console.log(info.thumbnail_url + "url example 1")
				if (!server.queue) message.channel.sendMessage('There is nothing playing.');
				message.channel.sendMessage(`🎶 Now playing: **${server.queue[0].title}**`);
			});
            break;
        case "skip":
            var server = servers[message.guild.id];
            if (server.dispatcher) server.dispatcher.end();
            break;
        case "stop":
            var server = servers[message.guild.id];
            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            break;
		/*case "list":
		    var server = servers[message.guild.id];
		    var arrayLength = server.queue.length;
		    var song = new Discord.RichEmbed()
            .addField("Queue:")
            .setColor(0x0a97b6)
            .setFooter("By me bish!");
		    for (var i = 0; i < arrayLength; i++) {
		        YTDL.getInfo(server.queue[i], function (err, info) {
		            song.addField(info.title);
		        });
		    }
		    message.channel.sendMessage(song);
			break;*/
            //case "removerole":
            //    message.member.removeRole(member.guild.roles.find("name", "Non Guild Member"));
            //    break;
            //case "delrole":
            //    member.guild.roles.find("name", "Non Guild Member").delete();
            //    break;
			
        default:
            message.channel.sendMessage("Get yo commands right bish!");
    }

});
async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`✅ **${song.title}** has been added to the queue!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
}

bot.login(TOKEN);