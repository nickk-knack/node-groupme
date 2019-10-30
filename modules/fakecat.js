const fs = require('fs');
const GroupMeImageServiceAccessToken = process.env.GM_IMAGE_SERVICE_TOKEN;

module.exports = {
	name: 'fakecat',
	aliases: ['cot', 'fc', ],
	description: 'Sends an AI generated cat directly to chat.',
	args: false,
	cooldown: 3,
	execute(message, args, bot) {
		const catUrl = 'https://thiscatdoesnotexist.com/';
		const gmisUrl = 'https://image.groupme.com/pictures';

		bot.request(catUrl).pipe(fs.createWriteStream('tempcat.png'));
		const catBody = fs.createReadStream('tempcat.png');

		const opts = {
			url: gmisUrl,
			method: 'POST',
			headers: {
				'X-Access-Token': GroupMeImageServiceAccessToken,
				'Content-Type': 'image/png'
			},
			body: catBody
		};

		function reqCallback(error, response, body) {
			if (!error && response.statusCode == 200) {
				bot.sendMessage(body.payload.url);
				catBody.close();
				fs.unlinkSync('tempcat.png');
			}
		}

		bot.request(opts, reqCallback);
	},
};