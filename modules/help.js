// TODO: remake with dynamic command help

module.exports = {
	name: 'help',
	aliases: ['commands'],
	description: 'List all commands/info about specific commands',
	usage: '[command name]',
	args: false,
	cooldown: 10,
	execute(message, args, bot) {
		bot.sendMessage('Commands: .help, .thank, .bad, .d <# of sides>, .inspire, .piao, .giphy <search terms>, .images <search terms>, .uwu <search terms>, .8ball <question>');
	},
};