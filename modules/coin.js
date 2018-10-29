module.exports = {
	name: 'coin',
	aliases: ['c', 'flip'],
	description: 'Tosses a coin for you.',
	args: false,
	execute(message, args, bot) {
		const toss = Math.floor(Math.random() * 2);
		if (toss) {
			bot.sendMessage(`@${message.name}, it was heads.`);
		}
		else {
			bot.sendMessage(`@${message.name}, it was tails.`);
		}
	},
};