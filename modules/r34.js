const snekfetch = require('snekfetch');
const parser = require('xml2js').parseString;

module.exports = {
	name: 'rule34',
	aliases: ['r34'],
	description: 'Searches rule34.xxx for whatever tags you request.',
	usage: '<search tags>',
	args: true,
	cooldown: 3,
	execute(message, args, bot) {
		const query = args.join('+').trim();

		snekfetch.get('https://rule34.xxx/index.php?page=dapi&s=post&q=index').query({ tags: query, limit: 20 })
			.then(data => data.body)
			.then(body => {
				if (!body.length || body.success == false) {
					bot.sendMessage(`No results found for ${query}`);
					return;
				}

				parser(body.toString('utf8'), (err, result) => {
					if (err) {
						console.error(err);
						bot.sendMessage('UwU sowwy something went wong... (XML parsing failed)');
					}

					const json = JSON.parse(JSON.stringify(result));
					const posts = json.posts.post;

					const randIndex = Math.floor(Math.random() * posts.length);
					const fileUrl = posts[randIndex].$.file_url;

					bot.sendMessage(fileUrl);
				});
			})
			.catch(e => {
				console.error(e);
				bot.sendMessage('oopsie woopse, someone made a fuckie wuckie!! uwu');
			});
	},
};