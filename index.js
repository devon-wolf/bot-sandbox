require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Good to go, boss!');
});

client.login(process.env.TOKEN);

client.on('message', message => {
	if (message.content.toLowerCase().includes('dani')) {
		const dani = message.guild.emojis.cache.filter(emoji => emoji.name === 'dani');

		message.react(dani.first());
	}
});