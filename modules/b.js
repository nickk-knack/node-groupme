module.exports = {
	name: 'b',
	aliases: [],
	description: '🅱️🅱️🅱️ 🅱️🅱️ 🅱️🅱️🅱️🅱️🅱️ 🅱️🅱️🅱️ 🅱️🅱️🅱️🅱️🅱️🅱️🅱️ 🅱️🅱️🅱️🅱️.',
	args: true,
	cooldown: 3,
	execute(message, args, bot) {
		const b = '🅱️';
		const bMessage = args.join(' ');
		const regex = /b/g;

		bMessage.replace(regex, b);

		bot.sendMessage(bMessage);
	},
};