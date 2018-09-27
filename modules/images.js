const GoogleImages = require('google-images');
const GoogleAPIKey = process.env.GOOGLE_API_KEY;
const GoogleCSEID = process.env.GOOGLE_CSE_ID;

exports.process = (message, bot) => {
	if (message.is_bot) return;
	
	const command = '.image ';
	const index = message.text.toLowerCase().indexOf(command);
	
	if (index != -1) {
		console.log('starting image query');

		const query = message.text.substring(index + command.length);

		console.log(query);

		const client = new GoogleImages(GoogleCSEID, GoogleAPIKey);

		console.log('client created');

		let result;
		client.search(query).then(images => {
			const length = images.length;
			const randIndex = Math.floor(Math.random() * length);
			result = images[randIndex].url;

			console.log(result);

			bot.sendMessage(result);
		});
	} else {
		console.log('nah, no image here');
	}
};