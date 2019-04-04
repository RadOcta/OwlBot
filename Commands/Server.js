// Server Commands
const Discord = require("discord.js");
const { Client, Util } = require('discord.js');

module.exports = {
    ping: function (client) {
        const m = await msg.channel.send("Ping?");
    		m.edit(`Pong! Latency is ${m.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    }
}