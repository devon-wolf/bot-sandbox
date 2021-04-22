const isUserOwner = ({ member, guild }) => {
	return member === guild.owner ? true : false;
}

const isUserAdmin = ({ member }) => {
	return member.permissions.has('ADMINISTRATOR') ? true : false;
}

const isUserSpecial = message => {
	return isUserOwner(message) || isUserAdmin(message);
}

const makeNewPrivateChannel = ({ guild, author, channel }, newChannelName) => {
	const { channels } = guild;

	channels.create(`${newChannelName}`, {
		type: 'text',
		permissionOverwrites: [{
			id: guild.id,
			deny: ['VIEW_CHANNEL']
		},
		{
			id: author.id,
			allow: ['VIEW_CHANNEL']
		}]
	}).then(newChannel => {
		channel.send(`${newChannel.name} created`);
})};

const getAdminRoles = ({ guild, channel }) => {
	const { roles } = guild;
	const adminRoles = roles.cache.filter(role => role.permissions.has('ADMINISTRATOR'));
	channel.send(adminRoles.map(role => role.name));
};

const getMyPermissions = ({ member, channel }) => {
	channel.send(member.permissions.toArray());
};

const getRolePermissions = ({ content, channel, guild }) => {
	const { roles } = guild;
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

	channel.send(targetRole.permissions.toArray());
};

// attempt to pull admin permissions off of admins for a specific channel, unclear results	
// 				const adminRoles = roles.cache.filter(role => role.permissions.has('ADMINISTRATOR'));
								
// 				for (let role of adminRoles) {
// 					newChannel.overwritePermissions(role.id, {
// 						'ADMINISTRATOR': false
// 					});
// 				}

// 				console.log(newChannel.permissionOverwrites);




module.exports = {
	isUserAdmin,
	isUserOwner,
	isUserSpecial, 
	makeNewPrivateChannel,
	getAdminRoles,
	getMyPermissions,
	getRolePermissions
};