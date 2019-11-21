const fetch = require('node-fetch');
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

		fetch(catUrl).then(res => res.buffer()).then(buffer => {
			console.log('Got cat image...');

			fetch(gmisUrl, {
				method: 'POST',
				headers: {
					'X-Access-Token': GroupMeImageServiceAccessToken,
					'Content-Type': 'image/png'
				},
				body: buffer
			}).then(resp => resp.json()).then(json => {
				console.log('json response: ', json);
				
				bot.sendMessage(`@${message.name} ${randomMessage}`, json.payload.picture_url);
				bot.sendMessage(json.payload.url);
			});
		});
	},
};