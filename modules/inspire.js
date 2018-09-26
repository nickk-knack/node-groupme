exports.process = (message, bot) => {
	if (message.is_bot) return;

	const command = '.inspire ';
	const index = message.text.toLowerCase().indexOf(command);

	if (index != -1) {
		const url = 'http://inspirobot.me/api?generate=true';

		bot.request.get(url, (err, resp, body) => {
			if (err) {
				bot.sendMessage('uh oh, something is fucky wucky UwU');
			} else {
				bot.sendMessage(body);
			}
		});
	}
};