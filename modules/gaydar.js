const hashString = (string) => {
	let hash = 0;

	if (string.length === 0) return hash;

	for (let i = 0; i < string.length; i++) {
		const char = string.charCodeAt(i);
		hash = ((hash << 5) - hash) + char;
		hash |= 0;
	}

	return hash + 2147483647;
};

const normalizeHash = (val) => (val  / 4294967294);

module.exports = {
	name: 'gaydar',
	aliases: ['gay'],
	description: 'Enable the bot\'s gaydar to check and see if someone is gay.',
	usage: '<person\'s name>',
	args: true,
	cooldown: 3,
	execute(message, args, bot) {
		const name = args.join(' ');

		const nameHash = hashString(name);
		const normalizedVal = normalizeHash(nameHash);
		const gay = (normalizedVal >= 0.85);

		bot.sendMessage(`${name} is ${gay ? 'totally' : 'not'} gay.`);
	},
};