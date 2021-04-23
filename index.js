require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Good to go, boss!');
});

client.login(process.env.TOKEN);

client.on('message', async message => {
	if (message.author.bot) return;
	
	if (message.content.toLowerCase() === '!ping') message.reply('pong!');
});

client.on('voiceStateUpdate', update => {
	// returns the name of the voice channel where the update occured - only works when exiting?
	update.channel ? console.log('CHANNEL NAME', update.channel.name) : console.log('CHANNEL', update.channel);

	// returns the channel ID, same issue as above, returns null when entering channel?
	console.log('CHANNEL ID', update.channelID);

	// comes back null on bot enter and exit, pretty sure this is just about the client user
	console.log('CONNECTION', update.connection);

	// returns the session ID of this member's connection - null on enter, ID on exit
	console.log('SESSION ID', update.sessionID);

	// returns the id of the user who triggered the update
	console.log('ID', update.id);

	// returns the username for the user who triggered the update
	console.log('MEMBER', update.member.user.username);
})

