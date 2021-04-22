const { isUserOwner } = require('./permissions');

const shameMe = async (message, client) => {
	const { member, guild } = message;
	const rolesCount = guild.roles.cache.size;
	const topOfRolesList = rolesCount - 1;

	let newRoleId = '';

	const userRoles = member.roles.cache.filter(role => role.name !== '@everyone');

	console.log(userRoles);
	// this strips ALL THE ROLES from the message author
	await Promise.all(userRoles.map(role => {
		return member.roles.remove(role);
		}));

		guild.roles.create({
			data: {
                name: 'SHAME ROLE',
                position: topOfRolesList,
                color: 6030083,
                permissions: []
            }
		})
			.then(result => {
				newRoleId = result.id;
				return member.roles.add(result);
			})
				.then(() => message.reply('SHAME ON YOU'));	

		client.setTimeout(async () => {
			guild.roles.cache.find(role => role.id === newRoleId).delete();

			console.log('timeout complete');

			await Promise.all(userRoles.map(role => member.roles.add(role)));

			message.reply('You have been released from your shame');

		}, 5000);
}

module.exports = { shameMe };