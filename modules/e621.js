const querystring = require('querystring');
const fetch = require('node-fetch');

module.exports = {
	name: 'e621',
	aliases: ['e6'],
	description: 'Search e621 for whatever tags you request.',
	args: true,
	usage: '<search tags>',
	cooldown: 5,
	execute(message, args, bot) {
		const searchTerms = args.join(' ');
		const length = 10;

		const opts = {
			method: 'GET',
			headers: {
				'User-Agent': 'crosdid/1.0',
			},
		};

		const query = querystring.stringify({
			tags: searchTerms,
			limit: length,
		}).replace(/%20/gu, '+');

		fetch(`https://e621.net/posts.json?${query}`, opts)
			.then((res) => res.json())
			.then((json) => {
				const { posts } = json;

				if (!posts.length) {
					return bot.sendMessage(`No results were found for \`${searchTerms}\``);
				}

				const result = posts[Math.floor(Math.random() * posts.length)];
				bot.sendMessage(result.file.url);
			})
			.catch((err) => {
				console.error(err);
				bot.sendMessage(`oopsie woopsie, someone made a fuckie wuckie!! uwu [${err.message}]`);
			});
	},
};