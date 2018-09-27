const snekfetch = require('snekfetch');

exports.process = (message, bot) => {
	if (message.is_bot) return;
	
	const command = '.uwu ';
	const index = message.text.toLowerCase().indexOf(command);
	
	if (index != -1) {
		const query = message.text.substring(index + command.length).split(' ').join('+');
		console.log('query', query);
		if (query == '') {
			bot.sendMessage('UwU');
			return;
		}

		snekfetch.get('https://e926.net/post/index.json').query({ tags: query, limit: 10 }).then(body => {
			console.log(body);
			if (!body.length || body.success == false) {
				bot.sendMessage(`No results found for ${query}`);
				return;
			}

			const randIndex = Math.floor(Math.random() * 10);
			const result = body[randIndex].file_url;

			bot.sendMessage(result);
		});
	}
};