const responses = [
	'ur welcome',
	'you\'re welcome',
	'ur welc',
	'no prob',
	'sure thing',
	'uh huh',
	'yeet',
];

module.exports = {
	name: 'thank',
	aliases: ['thanks'],
	description: 'Thank the bot.',
	args: false,
	cooldown: 1,
	execute(message, args, bot) {
		bot.sendMessage(`@${message.name} ${responses[Math.floor(Math.random() * responses.length)]}`);
	},
};