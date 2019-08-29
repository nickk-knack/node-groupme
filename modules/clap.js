module.exports = {
	name: 'clap',
	aliases: ['👏'],
	description: 'ADD 👏 SOME 👏 CLAPS 👏 TO 👏 YOUR 👏 SHIT 👏',
	args: true,
	cooldown: 3,
	execute(message, args, bot) {
		bot.sendMessage(args.push('👏').join('👏').toUpperCase());
	},
};