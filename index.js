require('dotenv').config();

const { daniReact } = require('./utils/random');
const { shameMe } = require('./utils/shame');
const { makeNewPrivateChannel, getMyPermissions, getRolePermissions, getAdminRoles, isUserSpecial } = require('./utils/permissions')

const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Good to go, boss!');
});

client.login(process.env.TOKEN);

client.on('message', async message => {
	if (message.author.bot) return;
	
	if (message.content.toLowerCase().includes('dani')) {
		daniReact(message);
	}

	else if (message.content.toLowerCase() === '!shameme') {
		shameMe(message, client);	
	}

	else if (message.content.toLowerCase() === '!roles') {
		message.channel.send(`Here are your roles:
		${message.member.roles.cache.map(role => role.name === '@everyone' ? 'everyone' : role.name)}`);
	}

	else if (message.content.toLowerCase().startsWith('!make-channel')) {
		makeNewPrivateChannel(message, message.content.split(' ').slice(1).join(' '));
	}

	else if (message.content.toLowerCase() === '!my-permissions') {
		getMyPermissions(message);
	}

	else if (message.content.toLowerCase().startsWith('!role-permissions')) {
		getRolePermissions(message);
	}

	else if (message.content.toLowerCase() === '!admin-roles') {
		getAdminRoles(message);
	}

	else if (message.content.toLowerCase() === '?amispecial') {
		isUserSpecial(message) ? message.channel.send('This paper here says so, but I\'m not so sure.') : message.channel.send('Nope!'); 
	}
});

