const Pornsearch = require('pornsearch');

module.exports = {
	name: 'pornhub',
	aliases: ['porn', 'ph', 'fap'],
	description: 'Searches pornhub for a gif or video.',
	usage: '<gif | vid> <search terms>',
	args: true,
	cooldown: 5,
	execute(message, args, bot) {
		const contentType = args.shift().toLowerCase();

		console.log(contentType);

		if (contentType != 'gif' || contentType != 'vid') {
			bot.sendMessage(`@${message.name} you need to specify if you want a gif or a vid.`);
			return;
		}
		
		const query = args.join(' ');
		const search = new Pornsearch(query);
		console.log(query);
		
		if (contentType == 'gif') {
			search.gifs()
				.then(gifs => {
					console.log(gifs);
					bot.sendMessage(gifs[Math.floor(Math.random() * gifs.length)].url);
				});
		} else if (contentType == 'vid') {
			search.videos()
				.then(vids => {
					console.log(vids);
					bot.sendMessage(vids[Math.floor(Math.random() * vids.length)].url);
				});
		}
	}
};