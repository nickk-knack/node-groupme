const querystring = require('querystring');
const fetch = require('node-fetch');
const parser = require('xml2js').parseStringPromise;

module.exports = {
	name: 'rule34',
	aliases: ['r34'],
	description: 'Searches rule34.xxx for whatever tags you request.',
	usage: '<search tags>',
	args: true,
	cooldown: 3,
	execute(message, args, bot) {
		const limit = 20;
		const searchTerms = args.join('+');

		const query = querystring.stringify({
			page: 'dapi',
			s: 'post',
			q: 'index',
			tags: searchTerms,
			limit: limit,
		});

		fetch(`https://rule34.xxx/index.php?${query}`)
			.then((res) => res.text())
			.then((body) => parser(body.toString('utf8')))
			.then((parsed) => JSON.parse(JSON.stringify(parsed)))
			.then((json) => {
				if (json.posts.$.count === '0') return bot.sendMessage(`No results found for ${query}`);

				const { post } = json.posts;
				const fileUrl = post[Math.floor(Math.random() * post.length)].$.file_url;

				bot.sendMessage(fileUrl);
			})
			.catch((err) => {
				console.error(err);
				bot.sendMessage(`oopsie woopse, someone made a fuckie wuckie!! uwu [${err.message}]`);
			});
	},
};