exports.process = (message, bot) => {
	if (message.is_bot) return;

	const command = '.e621 ';
	const index = message.text.toLowerCase().indexOf(command);

	if (index != -1) {
		const args = message.text.substring(index + command.length).split(' ');
		const query = args.join('+');
		const url = `https://e621.net/post/index.json?tags=${encodeURIComponent(query)}&limit=10`;
		console.log(url);

		bot.request.get(url, (err, resp, body) => {
			//const results = JSON.parse(body)['data'];
			
			if (err || !body.length) {
				console.error(err);
				bot.sendMessage(`Nothing found for "${query}"`);
			} else {
				const indexSelected = Math.floor(Math.random() * body.length);
				const selected = body[indexSelected].file_url;
				console.log(selected);
				bot.sendMessage(selected);
			}
		});
	}
};