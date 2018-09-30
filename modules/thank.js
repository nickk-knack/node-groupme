// TODO: add more responses
const responses = [''];

module.exports = {
	name: 'thank',
	aliases: ['thanks'],
	description: 'Thank the bot.',
	args: false,
	cooldown: 1,
	execute(message, args, bot) {
		bot.sendMessage(`@${message.name} ur welcome`);
	},
};