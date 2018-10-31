const search = require('youtube-search');

const opts = {
	maxResults: 10,
	key: process.env.YOUTUBE_API_KEY,
};

module.exports = {
	name: 'youtube',
	aliases: ['yt'],
	description: 'Search YouTube for videos.',
	usage: '<search terms>',
	args: true,
	cooldown: 3,
	execute(message, args, bot) {
		const query = args.join(' ');

		search(query, opts, (err, res) => {
			if (err) {
				bot.sendMessage('yo wtf is up');
				return console.error(err);
			}

			console.log(res);
			bot.sendMessage(res[Math.floor(Math.random() * res.length)].link);
		});
	},
};