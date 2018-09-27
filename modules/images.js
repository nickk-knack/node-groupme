const GoogleImages = require('google-images');
const GoogleAPIKey = process.env.GOOGLE_API_KEY;
const GoogleCSEID = process.env.GOOGLE_CSE_ID;

exports.process = (message, bot) => {
	if (message.is_bot) return;
	
	const command = '.image ';
	const index = message.text.toLowerCase().indexOf(command);
	
	if (index != -1) {
		const query = message.text.substring(index + command.length);
		const client = new GoogleImages(GoogleCSEID, GoogleAPIKey);

		let result;
		client.search(query).then(images => {
			const length = images.length;
			const randIndex = Math.floor(Math.random() * length);
			result = images[randIndex].url;

			bot.sendMessage(result);
		});
	}
};