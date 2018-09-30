const snekfetch = require('snekfetch');

module.exports = {
	name: 'e621',
	aliases: ['e6'],
	description: 'Searches e621.',
	usage: '<search tags>',
	args: true,
	cooldown: 3,
	execute(message, args, bot) {
		const query = args.split(' ').join('+');
		if (query == '') {
			bot.sendMessage('UwU');
			return;
		}

		snekfetch.get('https://e621.net/post/index.json').query({ tags: query, limit: 10 })
			.then(data => data.body)
			.then(body => {
				if (!body.length || body.success == false) {
					bot.sendMessage(`No results found for ${query}`);
					return;
				}

				const randIndex = Math.floor(Math.random() * body.length);
				const result = body[randIndex].file_url;

				bot.sendMessage(result);
			})
			.catch(e => {
				bot.sendMessage('oopsie woopse, someone made a fuckie wuckie!! uwu');
				console.log(e);
			});
	},
};