module.exports = {
	name: 'choose',
	description: 'Given a list of things seperated by pipes ( | ), the bot will choose one of them. Example of a list: thing1 | thing2 | thing43',
	usage: '<items>',
	args: true,
	cooldown: 1,
	execute(message, args, bot) {
		const items = args.join(' ').split(/\s\|\s/g);
		const length = items.length;
		const randChoice = Math.floor(Math.random() * length);
		bot.sendMessage(`@${message.name}, I choose ${items[randChoice]}!`);
	},
};