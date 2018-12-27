const GoogleImages = require('google-images');
const GoogleAPIKey = process.env.GOOGLE_API_KEY;
const GoogleCSEID = process.env.GOOGLE_CSE_ID;

module.exports = {
	name: 'image',
	aliases: ['i'],
	description: 'Search Google Images.',
	usage: '<search terms>',
	args: true,
	cooldown: 3,
	execute(message, args, bot) {
		const query = args.join(' ').trim();
		const client = new GoogleImages(GoogleCSEID, GoogleAPIKey);

		let result;
		client.search(query).then(images => {
			const length = images.length;
			const randIndex = Math.floor(Math.random() * length);
			result = images[randIndex].url;

			bot.sendMessage(result);
		}).catch(e => {
			console.error(e);
			if (e.statusCode == 403) {
				bot.sendMessage('I literally can\'t search anymore');
			} else {
				bot.sendMessage('oopsie woopsie, something is fucksie wucksies!! uwu');
			}
		});
	},
};