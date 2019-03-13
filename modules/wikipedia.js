const wiki = require('wikijs').default();

module.exports = {
	name: 'wikipedia',
	aliases: ['wiki', 'wp'],
	description: 'Search wikipedia for a page. Use -r for a random article.',
	usage: '<-r> | <query>',
	args: true,
	cooldown: 5,
	execute(message, args, bot) {
		if (args[0] === '-r') {
			wiki.random(5).then(res => {
				const item = Math.floor(Math.random() * res.length);

				wiki.page(res[item]).then(p => {
					bot.sendMessage(p.raw.fullurl);
				}).catch(err => {
					console.error(err);
					bot.sendMessage('Could not get a random page! Something is fucky.');
				});
			}).catch(err => {
				console.error(err);
				bot.sendMessage('An error occurred while processing that request!');
			});

			return;
		}

		const query = args.join(' ');
		
		// Search query, get top result, print out the full url to that wikipedia page
		wiki.search(query, 1).then(res => {
			const result = res.results[0];

			wiki.page(result).then(p => {
				bot.sendMessage(p.raw.fullurl);
			}).catch(err => {
				console.error(err);
				bot.sendMessage(`No results found for '${query}'`);
			});
		}).catch(err => {
			console.error(err);
			bot.sendMessage('An error occurred while processing that request!');
		});
	},
};