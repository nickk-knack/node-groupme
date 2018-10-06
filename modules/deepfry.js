const jimp = require('jimp');
// https://www.npmjs.com/package/jimp

module.exports = {
	name: 'deepfry',
	aliases: ['fry', 'df'],
	description: 'Deep fry an image you send.',
	usage: '<image>',
	args: false,
	cooldown: 5,
	execute(message, args, bot) {
		console.log(message.attachments);

		if (!message.attachments.length || message.attachments[0].type != 'image') {
			console.log(!message.attachments.length, ' ', message.attachments[0].type != 'image');
			bot.sendMessage(`@${message.name} you need to send an image!`);
			return;
		}

		jimp.read(message.attachments[0].url)
			.then(image => {
				console.log('editing image');
				console.log('get dimensions');
				const currentW = image.getWidth();
				const currentH = image.getHeight();

				// console.log('edit color');
				// image.color([
				// 	{ apply: 'red', params: [69] },
				// 	{ apply: 'saturate', params: [69]}
				// ]);
				console.log('posterize');
				image.posterize(4);
				console.log('brightness');
				image.brightness(0.4);
				console.log('contrast');
				image.contrast(0.3);
				console.log('blur');
				image.blur(2);
				console.log('resize 1');
				image.resize(169, 169);
				console.log('resize 2');
				image.resize(currentW, currentH);
				console.log('set jpeg image quality');
				image.quality(69);

				// write to buffer
				// const imageBuffer = image.getBuffer(jimp.MIME_JPEG);
				const imageb64URI = image.getBase64(jimp.MIME_JPEG);
				
				// upload image, send link
				const headers = {
					'X-Access-Token': bot.access_token,
					'Content-Type': 'image/jpeg'
				};

				const options = {
					url: 'https://image.groupme.com/pictures',
					method: 'POST',
					headers: headers,
					body: imageb64URI,
				};

				bot.request(options, (error, response, body) => {
					if (!error && response.statusCode == 200) {
						console.log(body);
						bot.sendMessage('', body.picture_url);
					}
				});
			})
			.catch(e => {
				console.error(e);
			});
	},
};