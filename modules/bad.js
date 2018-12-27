const responses = [
	':(',
	'oof',
	'ok :(',
	'aww :(',
	':c',
	'wow',
	'why? :(',
	'ok :c',
	'mega oof',
];

module.exports = {
	name: 'bad',
	aliases: ['fuckoff'],
	description: 'Reprimand the bot.',
	args: false,
	cooldown: 1,
	execute(message, args, bot) {
		bot.sendMessage(responses[Math.floor(Math.random() * responses.length)]);
	},
};