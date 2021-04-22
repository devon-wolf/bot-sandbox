const daniReact = (message) => {
	const dani = message.guild.emojis.cache.filter(emoji => emoji.name === 'dani');

		message.react(dani.first());
};

module.exports = {
	daniReact
}