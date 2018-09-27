exports.process = (message, bot) => {
	if (message.is_bot) return;
	
	const command = '.uwu ';
	const index = message.text.toLowerCase().indexOf(command);
	
	if (index != -1) {
		const query = message.text.substring(index + command.length);
		query.split(' ').join('+');
		const url = `https://e926.net/post/index.json?tag=${encodeURIComponent(query)}&limit=10`;
		
		bot.request.get(url, (err, resp, body) => {
			const results = JSON.parse(body);
			console.log(results);
			const numResults = (results.length < 10) ? results.length : 10;
			if (err || numResults == 0) {
				bot.sendMessage(`Nothing found for "${query}"`);
			} else {
				const indexSelected = Math.floor(Math.random() * numResults);
				const selected = results[indexSelected].file_url;
				console.log(selected);
				bot.sendMessage(selected);
			}
		});
	}
};