const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = {
	name: 'ph',
	aliases: ['porn', 'ph', 'fap'],
	description: 'Searches pornhub for a gif or video.',
	usage: '<gif | vid> <search terms>',
	args: true,
	cooldown: 5,
	execute(message, args, bot) {
		const contentType = args.shift().toLowerCase();
		const query = args.join(' ').trim();

		if (contentType != 'gif' && contentType != 'vid' && contentType != 'video') {
			return bot.sendMessage(`@${message.name} you need to specify if you want a gif or a vid.`);
		}

		const url = `https://www.pornhub.com/${contentType === 'gif' ? 'gifs' : 'video'}/search?search=${query.replace(/\s/gu, '+')}&page=1`;
		fetch(url)
			.then((res) => res.text())
			.then((body) => {
				const $ = cheerio.load(body);
				let result = {};

				if (contentType === 'gif') {
					// gif parsing
					const gifs = $('ul.gifs.gifLink li.gifVideoBlock');
					const results = gifs.map((i, gif) => {
						const data = $(gif).find('a');

						return {
							title: data.find('span').text(),
							url: `https://dl.phncdn.com${data.attr('href')}.gif`,
							webm: data.find('video').attr('data-webm'),
						};
					}).get();

					if (!results.length) return bot.sendMessage(`@${message.name}, no gif results found for "${query}".`);

					// Select a random result
					result = results[Math.floor(Math.random() * results.length)];
					return bot.sendMessage(result.webm ? result.webm : result.url);
				} else {
					// video parsing
					const videos = $('ul.videos.search-video-thumbs li.pcVideoListItem');
					const results = videos.map((i) => {
						const data = videos.eq(i);

						if (!data.length) {
							return;
						}

						const thumb = data.find('img').attr('src') || '';
						const urlAnchor = data.find('a').eq(0);

						return {
							title: urlAnchor.attr('title'),
							url: `https://pornhub.com${urlAnchor.attr('href')}`,
							duration: data.find('.duration').text(),
							thumb: thumb, // thumb.replace(/\([^)]*\)/gu, ''),
						};
					}).get().filter((e) => !e.url.includes('javascript:void(0)'));

					if (!results.length) return bot.sendMessage(`@${message.name}, no video results found for "${query}".`);

					// Select a random result
					result = results[Math.floor(Math.random() * results.length)];
					return bot.sendMessage(result.url);
				}
			})
			.catch((err) => {
				console.error(err);
				bot.sendMessage(`An error occurred while making the request: ${err.message}`);
			});
	}
};