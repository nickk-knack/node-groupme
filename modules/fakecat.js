const fs = require('fs');
const GroupMeImageServiceAccessToken = process.env.GM_IMAGE_SERVICE_TOKEN;

const messages = [
	'heres your cat :3',
	'heres your cat uwu',
	'heres your cat UwU',
	'you wanted a cat?',
	'got a cat for you',
	'got a cat for you :3',
	'got a cat for you uwu',
	'got a cat for you UwU',
	'got a cat for u',
	'got a cat for u :3',
	'got a cat for u uwu',
	'got a cat for u UwU',
	'i got a cat for you',
	'i got a cat for you :3',
	'i got a cat for you uwu',
	'i got a cat for you UwU',
	'i gots a cat for you',
	'i gots a cat for you :3',
	'i gots a cat for you uwu',
	'i gots a cat for you UwU',
	'cat for you, sir',
	'cat for you, sir :3',
	'cat for you :3',
];

module.exports = {
	name: 'fakecat',
	aliases: ['cot', 'fc', ],
	description: 'Sends an AI generated cat directly to chat.',
	args: false,
	cooldown: 3,
	execute(message, args, bot) {
		const catUrl = 'https://thiscatdoesnotexist.com/';
		const gmisUrl = 'https://image.groupme.com/pictures';

		const randomMessage = messages[Math.floor(Math.random() * messages.length)];

		bot.request(catUrl).pipe(fs.createWriteStream('tempcat.png'));

		fs.access('tempcat.png', fs.F_OK, (err) => {
			if (err) {
				console.error('tempcat.png did not save!', err);
				bot.sendMessage('Failed to get a cat... 3:');
				return;
			}
		});

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
				const json = JSON.parse(body);

				console.log(json);

				bot.sendMessage(`@${message.name} ${randomMessage}`, body.payload.picture_url);

				catBody.close();
				fs.unlinkSync('tempcat.png');
				return;
			} else {
				console.error(error);
			}
		}

		console.log('Performing request...');
		bot.request(opts, reqCallback);
	},
};