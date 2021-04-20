require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Good to go, boss!');
});

client.login(process.env.TOKEN);

client.on('message', message => {
	console.log(message.createdTimestamp);
	if (message.content.includes('Patrick')) message.channel.send('Star?');
});