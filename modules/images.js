const GoogleImages = require('google-images');
const fetch = require('node-fetch');
const GoogleAPIKey = process.env.GOOGLE_API_KEY;
const GoogleCSEID = process.env.GOOGLE_CSE_ID;
const GroupMeImageServiceAccessToken = process.env.GM_IMAGE_SERVICE_TOKEN;
const gmisUrl = 'https://image.groupme.com/pictures';

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

		client.search(query)
			.then(images => {
				const length = images.length;
				const randIndex = Math.floor(Math.random() * length);
				const url = images[randIndex].url;
				const type = images[randIndex].type;

				fetch(url)
					.then(res => res.buffer())
					.then(buffer => {
						const settings = {
							method: 'POST',
							body: buffer,
							headers: {
								'X-Access-Token': GroupMeImageServiceAccessToken,
								'Content-Type': type
							}
						};
						
						fetch(gmisUrl, settings)
							.then(resp => resp.json())
							.then(json => bot.sendMessage('', json.payload.picture_url))
							.catch(err => {
								console.error('Failed to upload to GMIS, falling back to google link.', err);
								return bot.sendMessage(url);
							});
					})
					.catch(err => {
						console.error('Failed to upload to GMIS, falling back to google link.', err);
						return bot.sendMessage(url);
					});
			})
			.catch(e => {
				console.error(e);

				// ternary abuse?
				return (e.statusCode == 403) ? 
					bot.sendMessage('I literally can\'t search anymore') : 
					bot.sendMessage('oopsie woopsie, something is fucksie wucksies!! uwu');
			});
	},
};