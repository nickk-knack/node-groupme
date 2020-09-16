const fetch = require('node-fetch');
const limit = 10;

module.exports = {
	name: 'giphy',
	aliases: ['gif'],
	description: 'Search Giphy for a gif.',
	usage: '<search terms>',
	args: false,
	cooldown: 3,
	execute(message, args, bot) {
		const query = args.join(' ').trim();
		const url = `http://api.giphy.com/v1/gifs/search?limit=${limit}&q=${encodeURIComponent(query)}&api_key=dc6zaTOxFJmzC`;

		fetch(url)
			.then((res) => res.json())
			.then((json) => {
				const { data } = json;
				const numResults = (data.length < limit) ? data.length : limit;

				if (numResults === 0) {
					return bot.sendMessage(`Nothing found for "${query}"`);
				}

				const selected = data[Math.floor(Math.random() * numResults)];
				return bot.sendMessage(selected.images.original.url);
			})
			.catch((err) => {
				console.error(err);
				bot.sendMessage(`An error occurred while making the request. [${err.message}]`);
			});
	},
};