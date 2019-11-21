const fetch = require('node-fetch');
const GroupMeImageServiceAccessToken = process.env.GM_IMAGE_SERVICE_TOKEN;

module.exports = {
	name: 'fakeperson',
	aliases: ['fp', 'porson', 'porsen', 'persen', 'porsin', 'p', 'fakedude', ],
	description: 'Sends an AI generated person directly to chat.',
	args: false,
	cooldown: 3,
	execute(message, args, bot) {
		const catUrl = 'https://thispersondoesnotexist.com/';
		const gmisUrl = 'https://image.groupme.com/pictures';

		fetch(catUrl).then(res => res.buffer()).then(buffer => {
			console.log('Got fake person...');

			fetch(gmisUrl, {
				method: 'POST',
				headers: {
					'X-Access-Token': GroupMeImageServiceAccessToken,
					'Content-Type': 'image/png'
				},
				body: buffer
			}).then(resp => resp.json()).then(json => {
				console.log('json response: ', json);

				bot.sendMessage('', json.payload.picture_url);
			});
		});
	},
};