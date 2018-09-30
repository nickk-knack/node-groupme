module.exports = {
	name: 'bad',
	aliases: ['fuckoff'],
	description: 'Reprimand the bot.',
	args: false,
	cooldown: 1,
	execute(message, args, bot) {
		bot.sendMessage(':(');
	},
};