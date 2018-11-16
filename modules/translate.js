const translate = require('google-translate-api');

const langs = ['en', 'bg', 'ru', 'nl', 'fr', 'ga', 'it', 'ja', 'ko', 'la', 'no', 'es', 'sv', 'el', 'de', 'cy', 'zh-CN', 'zh-TW', 'ar', 'af'];

module.exports = {
	name: 'translate',
	aliases: ['t'],
	description: `Translate your dumb text into any other language. Use 'rand' for a random language or one of the supported languages. Supported languages: [${langs.join(', ')}]`,
	usage: '<to language> <text>',
	args: true,
	cooldown: 3,
	execute(message, args, bot) {
		let lang = args[0];
		const text = args.slice(1, args.length).join(' ');
		if (!langs.includes(lang)) {
			if (lang == 'rand') {
				lang = langs[Math.floor(Math.random(langs.length))];
			} else {
				return bot.sendMessage('Invalid language!');
			}
		}

		translate(text, { to: lang }).then(res => {
			bot.sendMessage(`Translation from ${res.from.language.iso} to ${lang}: ${res.text}`);
		}).catch(err => {
			bot.sendMessage('Shit is fucked up, cunt');
			console.error(err);
		});
	},
};