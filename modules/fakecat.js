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

		fs.access('tempcat.png', fs.F_OK, (err) => {
			if (err) {
				console.error('tempcat.png did not save!', err);
				bot.sendMessage('Failed to get a cat... 3:');
				return;
			}
		});

		console.log('I guess tempcat.png exists?');
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
				console.log(body);
				bot.sendMessage(body.payload.url);
				catBody.close();
				fs.unlinkSync('tempcat.png');
				return;
			} else {
				console.error(error);
			}
		}

		console.log('Performing request...');
		bot.request(opts, reqCallback);

		console.log('uhh');
	},
};