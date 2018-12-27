module.exports = {
	name: 'b',
	aliases: [],
	description: '🅱️🅱️🅱️ 🅱️🅱️ 🅱️🅱️🅱️🅱️🅱️ 🅱️🅱️🅱️ 🅱️🅱️🅱️🅱️🅱️🅱️🅱️ 🅱️🅱️🅱️🅱️.',
	args: true,
	cooldown: 3,
	execute(message, args, bot) {
		const b = '🅱️';
		const bMessage = args.join(' ');
		const regex = /[Bb]+/g;

		bot.sendMessage(bMessage.replace(regex, b));
	},
};