const jimp = require('jimp');

module.exports = {
	name: 'deepfry',
	aliases: ['fry', 'df'],
	description: 'Deep fry an image you send.',
	usage: '<image>',
	args: true,
	cooldown: 5,
	execute(message, args, bot) {
		if (!message.attachments.length || message.attachments[0].type != 'image') {
			bot.sendMessage(`@${message.name} you need to send an image!`);
			return;
		}

		jimp.read(message.attachments[0].url)
			.then(image => {
				const currentW = image.getWidth();
				const currentH = image.getHeight();

				image.color([
					{ apply: 'red', params: [69] },
					{ apply: 'saturate', params: [69]}
				]);
				image.posterize(4);
				image.brightness(0.4);
				image.contrast(0.3);
				image.blur(2);
				image.resize(169, 169);
				image.resize(currentW, currentH);

				image.write(`../deepfry-${Date.now()}`);

				bot.sendMessage('wrote image');
			})
			.catch(e => {
				console.error(e);
			});
	},
};