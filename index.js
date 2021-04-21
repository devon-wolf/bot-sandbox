require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Good to go, boss!');
});

client.login(process.env.TOKEN);

// client.on('message', async message => {
// 	if (message.author.bot) return;
// 	if (message.content.toLowerCase().includes('dani')) {
// 		const dani = message.guild.emojis.cache.filter(emoji => emoji.name === 'dani');

// 		message.react(dani.first());
// 	}

// 	else if (message.content.toLowerCase().includes('timeout')) {
// 		message.channel.send('okay I will try to do a timeout thing at some point');
// 	}

// 	else if (message.content.toLowerCase() === '!shameme') {
// 		const rolesCount = message.guild.roles.cache.size;
// 		const topOfRolesList = rolesCount - 1;

// 		let newRoleId = '';

// 		const userRoles = message.member.roles.cache;

// 		// this strips ALL THE ROLES from the message author
// 		console.log(message.member.roles.cache);
// 		await Promise.all(message.member.roles.cache.map(role => {
// 			console.log('THE ROLE', role)
// 			return message.member.roles.remove(role);
// 		}));

// 		// the guild.roles.blah() functions have a DiscordAPIError where the api is seeing an 'unknown role' - but this still works???? it's on the .remove and .add methods 'DiscordAPIError: Unknown Role'

// 		message.guild.roles.create({
// 			data: {
//                 name: 'SHAME ROLE',
//                 // creates a role just below the powerbot permission. Always has to be one step lower than the bot permission. Will need to set up bot permission in initial setup
//                 position: topOfRolesList,
//                 // Must be decimal
//                 color: 6030083,
//                 permissions: []
//             }
// 		})
// 			.then(result => {
// 				newRoleId = result.id;
// 				return message.member.roles.add(result)})
// 			.then(() => message.reply('SHAME ON YOU'));	

// 			client.setTimeout( async () => {
// 				message.guild.roles.cache.find(role => role.id === newRoleId).delete();

// 				console.log('timeout complete');

// 				await Promise.all(userRoles.map(role => {
// 					return message.member.roles.add(role);
// 				}));

// 				message.reply('You have been released from your shame');
// 				}, 5000);
// 	}

// 	else if (message.content.toLowerCase() === '!roles') {
// 		message.channel.send(`Here are your roles:
// 		${message.member.roles.cache.map(role => role.name === '@everyone' ? 'everyone' : role.name)}`);
// 	}
// });

client.on('message', message => {
	if(message.author.bot) return;

	const { guild, author, member, channel, content} = message;

	const { channels, roles } = guild;

	// example code here: https://discordjs.guide/popular-topics/permissions.html#adding-overwrites

	if (content === '!make-channel') {
		channels.create('no-admins', {
			type: 'text',
			permissionOverwrites: [{
				id: guild.id,
				deny: ['VIEW_CHANNEL', 'ADMINISTRATOR']
			},
			{
				id: author.id,
				allow: ['VIEW_CHANNEL']
			}]
		})
			.then(newChannel => {
				channel.send(`${newChannel.name} created`);
				
				const adminRoles = roles.cache.filter(role => role.permissions.has('ADMINISTRATOR'));
								
				for (let role of adminRoles) {
					newChannel.overwritePermissions(role.id, {
						'ADMINISTRATOR': false
					});
				}

				console.log(newChannel.permissionOverwrites);
				
			});
	}

	else if (content === '!admin-roles') {
		const adminRoles = roles.cache.filter(role => role.permissions.has('ADMINISTRATOR'));
		channel.send(adminRoles.map(role => role.name));
	}

	else if (content === '!owner') {
		channel.send(guild.owner.nickname);
		console.log(guild.owner);
	}

	else if (content === '!my-permissions') {
		channel.send(member.permissions.toArray());
	}

	else if (content.startsWith('!role-permissions')) {
		const roleString = content.split(' ').slice(1).join(' ');
		if (!roleString) {
			channel.send('You have to give me a role for that command');
			return;
		}

		const targetRole = roles.cache.find(role => role.name === roleString);
		if (!targetRole) {
			channel.send('That is not a role here');
			return;
		}
		// shows the permissions that are 'true'
		channel.send(targetRole.permissions.toArray());

		// object/map/collection thing that shows true or false for each possible permission, needs to be stringified if you want to send it as a message
		console.log(targetRole.permissions.serialize());
	}

	// test to see if message author is the server owner or has admin permissions
	else if (content === '?amIspecial') {
		if (member === guild.owner) {
			channel.send('Just because you\'re the owner doesn\'t mean you\'re special.');
		}
		if (member.permissions.has('ADMINISTRATOR')) {
			channel.send('Ah yes, a bureaucat. Sooooo special.');
		}
		else {
			channel.send('Hate to break it to you, but...');
		}
	}
})