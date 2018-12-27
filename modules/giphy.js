const limit = 10;

module.exports = {
	name: 'giphy',
	aliases: ['gif'],
	description: 'Search Giphy for a gif.',
	usage: '<search terms>',
	args: false,
	cooldown: 10,
	execute(message, args, bot) {
		const query = args.join(' ').trim();
		const url = `http://api.giphy.com/v1/gifs/search?limit=${limit}&q=${encodeURIComponent(query)}&api_key=dc6zaTOxFJmzC`;

		bot.request.get(url, (err, resp, body) => {
			const results = JSON.parse(body)['data'];
			const numResults = (results.length < limit) ? results.length : limit;
			if (err || numResults == 0) {
				bot.sendMessage(`Nothing found for "${query}"`);
			} else {
				const indexSelected = Math.floor(Math.random() * numResults);
				const selected = results[indexSelected].images.original.url;
				bot.sendMessage(selected);
			}
		});
	},
};