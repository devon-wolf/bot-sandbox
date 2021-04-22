const shameMe = async (message, client) => {
	const rolesCount = message.guild.roles.cache.size;
	const topOfRolesList = rolesCount - 1;

	let newRoleId = '';

	const userRoles = message.member.roles.cache.filter(role => role.name !== '@everyone');

	console.log(userRoles);
	// this strips ALL THE ROLES from the message author
	// await Promise.all(userRoles.map(role => {
	// 	return message.member.roles.remove(role);
	// 	}));

	// 	message.guild.roles.create({
	// 		data: {
    //             name: 'SHAME ROLE',
    //             position: topOfRolesList,
    //             color: 6030083,
    //             permissions: []
    //         }
	// 	})
	// 		.then(result => {
	// 			newRoleId = result.id;
	// 			return message.member.roles.add(result);
	// 		})
	// 			.then(() => message.reply('SHAME ON YOU'));	

		client.setTimeout(async () => {
			// message.guild.roles.cache.find(role => role.id === newRoleId).delete();

			console.log('timeout complete');

			// await Promise.all(userRoles.map(role => message.member.roles.add(role)));

			message.reply('You have been released from your shame');

		}, 5000);
}

module.exports = { shameMe };