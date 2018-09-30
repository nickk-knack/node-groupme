module.exports = {
	name: 'dice',
	aliases: ['d'],
	description: 'Roll an n-sided die.',
	usage: '[sides]',
	args: false,
	cooldown: 3,
	execute(message, args, bot) {
		let dice = 20;
		if (args.length) {
			const tryDice = parseInt(args[0]);
			if (!isNaN(tryDice)) {
				dice = tryDice;
			}
		}

		if (dice <= 0) {
			bot.sendMessage(`@${message.name} doesn't know how dice work.`);
			return;
		}

		const roll = Math.floor((Math.random() * dice) + 1);
		let replyAppend = '';
		if (roll == 1) {
			replyAppend = 'Critical fail!';
		}
		else if (roll == dice) {
			replyAppend = 'Critical success!';
		}
		bot.sendMessage(`@${message.name} rolled a ${roll}. ${replyAppend}`);
	},
};