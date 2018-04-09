//https://discordapp.com/oauth2/authorize?client_id=430679735186751488&scope=bot&permissions=0

const Discord = require("discord.js");
const { Client, Util } = require('discord.js');
const PREFIX = "y!";
const YouTube = require('simple-youtube-api');
const GOOGLE_API_KEY = "AIzaSyBeacgPpA6JTR3OBpiD_IIDWC-184xFz04";
//const music = require('discord.js-music');
//const YoutubeDL = require('youtube-dl');
const ytdl = require('ytdl-core');
//const TOKEN = "NDMwNjc5NzM1MTg2NzUxNDg4.DaTtUw.cQWijiFZtemSPqWWjfv-7VjE60Q";
const youtube = new YouTube(GOOGLE_API_KEY);
//const music = require('discord.js-music-v11');

const client = new Client({ disableEveryone: true });

const queue = new Map();

var looping = false;
var stopped = false;
var stayOnQueue = false;

client.on('warn', console.warn);

client.on('error', console.error);

client.on("ready", () => {
    client.user.setActivity('with my code')
	console.log("ready");
});

client.on('disconnect', function(erMsg, code) {
    console.log('----- Bot disconnected from Discord with code', code, 'for reason:', erMsg, '-----');
    client.connect();
});

client.on('reconnecting', () => console.log('I am reconnecting now!'));

client.on('message', async msg => { // eslint-disable-line
	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}
	
	if (msg.author.id !== '<@232926992444555264>' && msg.content.startsWith("heyo")) {
		var x = getRandomInt(3);
		if (x = 0) {
			msg.channel.sendMessage(msg.author.toString() + " Heyo my ass. Suck a penus!");
			var x = getRandomInt(3);
		} else if (x = 1) {
			msg.channel.sendMessage(msg.author.toString() + " Shut the fuck up Steve I fucked your mom");
			var x = getRandomInt(3);
		} else if (x = 2) {
			msg.channel.sendMessage(msg.author.toString() + " We all know you need money Karen but those lips aren't good enough");
			var x = getRandomInt(3);
		}
    	}
	
	//if (msg.author.id === '<@425333761660682241>') {
	//	msg.reply(msg.author.toString() + "https://cdn.discordapp.com/attachments/422076494664302607/431501422387920936/But-Thats-None-Of-My-Business.png")
	//}

    if (msg.author.id !== '<@232926992444555264>' && msg.content.startsWith("weak")) {
        msg.channel.sendMessage(msg.author.toString() + " Your dick is weak nigga. Dont make me post it in general.");
    }

    if (msg.author.id !== '<@232926992444555264>' && msg.content.startsWith("haha") || msg.author.id !== '<@232926992444555264>' && msg.content.startsWith("xD") || msg.author.id !== '<@232926992444555264>' && msg.content.startsWith("xd") || msg.author.id !== '<@232926992444555264>' && msg.content.startsWith("XD") || msg.author.id !== '<@232926992444555264>' && msg.content.startsWith("Xd")) {
        msg.channel.sendMessage(msg.author.toString() + " If I fuck yo mama I wanna see if you will still be laughin bish!");
    }
	
	//if (msg.author.bot) return undefined;
	//if (!msg.content.startsWith(PREFIX)) return undefined;
	
	if(msg.author.bot) return;

    if (msg.author.id !== '<@232926992444555264>' && msg.content.startsWith("<@194793217269432321>") || msg.content.startsWith("<@232926992444555264>") || msg.author.id !== '<@232926992444555264>' && msg.content.startsWith("<@430679735186751488>")) {
		var i = 0;
		msg.channel.sendMessage(msg.author.toString() + " Shut up gay fag.");
		while (i < 500000) {
			if (msg.author.id !== '<@425333761660682241>') {
			msg.author.sendMessage(msg.author.toString() + " https://cdn.discordapp.com/attachments/422076494664302607/431501422387920936/But-Thats-None-Of-My-Business.png")
			i++;
			}
		}
    }

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(PREFIX.length)
	
	if (command === 'delete') {
		deleteStuff();
	}
	if (command === 'kick') {
		const user = msg.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = msg.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member.kick('Optional reason that will display in the audit logs').then(() => {
          // We let the message author know we were able to kick the person
          msg.reply(`Successfully kicked ${user.tag}`);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to kick the member,
          // either due to missing permissions or role hierarchy
          msg.reply('I was unable to kick the member');
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        msg.reply('That user isn\'t in this guild!');
      }
    // Otherwise, if no user was mentioned
    } else {
      msg.reply('You didn\'t mention the user to kick!');
    }
	}
	if (command === 'play') {
		
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		}
		if (!permissions.has('SPEAK')) {
			return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send(`Playlist: **${playlist.title}** has been added to the queue!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					msg.channel.send(`
__**Song selection:**__

${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}

Please provide a value to select one of the search results ranging from 1-10.
					`);
					// eslint-disable-next-line max-depth
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send('No or invalid value entered, cancelling video selection.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send('I could not obtain any search results.');
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === 'skip') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could skip for you.');
		serverQueue.connection.dispatcher.end('Skip command has been used!');
		return undefined;
	} else if (command === 'stop') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could stop for you.');
		var stopped = true;
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used!');
		return undefined;
	} else if (command === 'volume') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		if (!args[1]) return msg.channel.send(`The current volume is: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send(`I set the volume to: **${args[1]}**`);
	} else if (command === 'np') {
		//if (!serverQueue) return msg.channel.send('There is nothing playing.');
		//return msg.channel.send(`Now playing: **${serverQueue.songs[0].title}**`);
		var info = new Discord.RichEmbed()
			.addField("Now Playing:", `${serverQueue.songs[0].title}` + "\n" + `${serverQueue.songs[0].url}`)
            //.addField("Description:", `${serverQueue.songs[0].description}`)
			.addBlankField(true)
			//.setDescription(`${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}`)
			//.addField("**Now Playing:**", `${serverQueue.songs[0].title}`)
			//.addField("Now Playing:", **${serverQueue.songs[0].title}**)
            .setColor(0x45f05a)
            .setFooter("Bot made by Owl")
            .setThumbnail("https://img.youtube.com/vi/" + serverQueue.songs[0].id + "/hqdefault.jpg")
        msg.channel.sendEmbed(info);
	} else if (command === 'queue') {
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		/*return msg.channel.send(`
__**Song queue:**__

${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

**Now playing:** ${serverQueue.songs[0].title}
		`);*/
		var info = new Discord.RichEmbed()
			.addField("Now Playing:", `${serverQueue.songs[0].title}`)
			.addBlankField(true)
            .addField("Queue list:", `${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}`)
			.addBlankField(true)
			//.setDescription(`${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}`)
			//.addField("**Now Playing:**", `${serverQueue.songs[0].title}`)
			//.addField("Now Playing:", **${serverQueue.songs[0].title}**)
            .setColor(0x0a97b6)
            .setFooter("Bot made by Owl")
            .setThumbnail("https://img.youtube.com/vi/" + serverQueue.songs[0].id + "/hqdefault.jpg")
        msg.channel.sendEmbed(info);
	} else if (command === 'pause') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('Paused the music for you!');
		}
		return msg.channel.send('There is nothing playing.');
	} else if (command === 'resume') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send('Resumed the music for you!');
		}
		return msg.channel.send('There is nothing playing.');
	}

	return undefined;
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
		else return msg.channel.send(`**${song.title}** has been added to the queue!`);
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

	serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}

client.login(process.env.TOKEN);
