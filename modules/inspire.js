const fetch = require('node-fetch');

module.exports = {
	name: 'inspire',
	aliases: ['inspireme'],
	description: 'Generates an inspirational quote from inspirobot.',
	args: false,
	cooldown: 3,
	execute(message, args, bot) {
		fetch('http://inspirobot.me/api?generate=true')
			.then((res) => res.text())
			.then((url) => {
				bot.sendMessage(url);
			})
			.catch((err) => {
				console.error(err);
				bot.sendMessage(`oopsie woopsie, something is fucky wucky UwU [${err.message}]`);
			});
	},
};