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

		if (contentType != 'gif' && contentType != 'vid' && contentType != 'video') {
			bot.sendMessage(`@${message.name} you need to specify if you want a gif or a vid.`);
			return;
		}
		
		const query = args.join(' ').trim();
		const search = new Pornsearch(query);
		
		if (contentType == 'gif') {
			search.gifs()
				.then(gifs => {
					bot.sendMessage(gifs[Math.floor(Math.random() * gifs.length)].url);
				})
				.catch(error => {
					console.error(error);
					bot.sendMessage(`Could not find any gifs for ${query}`);
				});
		} else if (contentType == 'vid' || contentType == 'video') {
			search.videos()
				.then(vids => {
					bot.sendMessage(vids[Math.floor(Math.random() * vids.length)].url);
				})
				.catch(error => {
					console.error(error);
					bot.sendMessage(`Could not find any vids for ${query}`);
				});
		}
	}
};