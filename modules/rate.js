module.exports = {
	name: 'rate',
	aliases: ['r'],
	description: 'Rates something out of 10.',
	usage: '<thing>',
	args: true,
	cooldown: 3,
	execute(message, args, bot) {
		const overrate = Math.random() > 0.95;
		const rate = overrate ? 11 : Math.floor((Math.random() * 10) + 1);

		bot.sendMessage(`${args.join(' ')}?\nI'd rate that a${rate == 8 || rate == 11 ? 'n' : ''} ${rate}/10`);
	},
};