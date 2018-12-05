module.exports = {
	name: 'b',
	aliases: [],
	description: '🅱️🅱️🅱️ 🅱️🅱️ 🅱️🅱️🅱️🅱️🅱️ 🅱️🅱️🅱️ 🅱️🅱️🅱️🅱️🅱️🅱️🅱️ 🅱️🅱️🅱️🅱️.',
	args: true,
	cooldown: 3,
	execute(message, args, bot) {
		const b = '🅱️';
		const bMessage = args.join(' ');
		const regexs = [/b/g, /b|p/g];
		const regex = regexs[Math.floor(Math.random() * regexs.length)];

		bMessage.replace(regex, b);

		bot.sendMessage(bMessage);
	},
};