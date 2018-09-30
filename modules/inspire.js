module.exports = {
	name: 'inspire',
	aliases: ['inspireme'],
	description: 'Generates an inspirational quote from inspirobot.',
	args: false,
	cooldown: 3,
	execute(message, args, bot) {
		const url = 'http://inspirobot.me/api?generate=true';
		bot.request.get(url, (err, resp, body) => {
			if (err) {
				bot.sendMessage('oopsie woopsie, something is fucky wucky UwU');
			} else {
				bot.sendMessage(body);
			}
		});
	},
};