require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Good to go, boss!');
});

client.login(process.env.TOKEN);

client.on('message', message => {
	if (message.author.bot) return;
	if (message.content.toLowerCase().includes('dani')) {
		const dani = message.guild.emojis.cache.filter(emoji => emoji.name === 'dani');

		message.react(dani.first());
	}

	else if (message.content.toLowerCase().includes('timeout')) {
		message.channel.send('okay I will try to do a timeout thing at some point');
	}

	else if (message.content.toLowerCase() === '!shameme') {
		const rolesCount = message.guild.roles.cache.size;
		const topOfRolesList = rolesCount - 1;

		let newRoleId = '';

		const userRoles = message.member.roles.cache;

		// this strips ALL THE ROLES from the message author
		message.member.roles.cache.map(role => {
			return message.member.roles.remove(role);
		});

		// the guild.roles.blah() functions have a DiscordAPIError where the api is seeing an 'unknown role' - but this still works???? it's on the .remove and .add methods 'DiscordAPIError: Unknown Role'

		message.guild.roles.create({
			data: {
                name: 'SHAME ROLE',
                // creates a role just below the powerbot permission. Always has to be one step lower than the bot permission. Will need to set up bot permission in initial setup
                position: topOfRolesList,
                // Must be decimal
                color: 6030083,
                permissions: []
            }
		})
			.then(result => {
				newRoleId = result.id;
				//message.member.roles.add(result);
				message.reply('SHAME ON YOU');
			});

			client.setTimeout( () => {
				message.guild.roles.cache.find(role => role.id === newRoleId).delete();

				console.log('timeout complete');

				userRoles.map(role => {
					return message.member.roles.add(role);
				});

				message.reply('You have been released from your shame');
				}, 5000);
	}

	else if (message.content.toLowerCase() === '!roles') {
		message.channel.send(`Here are your roles:
		${message.member.roles.cache.map(role => role.name === '@everyone' ? 'everyone' : role.name)}`);
	}
});