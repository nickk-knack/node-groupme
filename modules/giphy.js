exports.process = (message, bot) => {
	if (message.is_bot) return;
	
	const command = '.giphy ';
	const index = message.text.toLowerCase().indexOf(command);
	
	if (index != -1) {
		const query = message.text.substring(index + command.length);
		const url = `http://api.giphy.com/v1/gifs/search?limit=5&q=${encodeURIComponent(query)}&api_key=dc6zaTOxFJmzC`;
		
		bot.request.get(url, (err, resp, body) => {
			const results = JSON.parse(body)['data'];
			const numResults = (results.length < 5) ? results.length : 5;
			if (err || numResults == 0) {
				bot.sendMessage(`Nothing found for "${query}"`);
			} else {
				const indexSelected = Math.floor(Math.random() * numResults);
				const selected = results[indexSelected].images.original.url;
				console.log(`${query} => ${selected}`);
				bot.sendMessage(selected);
			}
		});
	}
};