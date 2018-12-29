const snekfetch = require('snekfetch');

module.exports = {
	name: 'rule34',
	aliases: ['r34'],
	description: 'Searches rule34.xxx for whatever tags you request.',
	usage: '<search tags>',
	args: true,
	cooldown: 3,
	execute(message, args, bot) {
		const query = args.trim().join('+');

		snekfetch.get('https://r34-json-api.herokuapp.com/posts').query({ tags: query, limit: 20 })
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