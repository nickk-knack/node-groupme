exports.process = (message, bot) => {
	if (message.is_bot) return;

	const command = '.inspire';
	const index = message.text.toLowerCase().indexOf(command);

	if (index != -1) {
		const url = 'http://inspirobot.me/api?generate=true';
		console.log(url);

		bot.request.get(url, (err, resp, body) => {
			console.log('resp', resp);
			console.log('body', body);
			if (err) {
				bot.sendMessage('uh oh, something is fucky wucky UwU');
			} else {
				bot.sendMessage(body);
			}
		});
	} else {
		console.log('did not find .inspire');
	}
};