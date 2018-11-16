const translate = require('yandex-translate')(process.env.YANDEX_TRANSLATE_API_KEY);

const langs = ['en', 'bg', 'ru', 'nl', 'fr', 'ga', 'it', 'ja', 'ko', 'la', 'no', 'es', 'vi', 'sv', 'el', 'de', 'cy', 'zh', 'ar', 'af', 'he'];

module.exports = {
	name: 'translate',
	aliases: ['t'],
	description: `Translate your dumb text into any other language. Use 'rand' for a random language or one of the supported languages. Supported languages: [${langs.join(', ')}]`,
	usage: '<to language> <text>',
	args: true,
	cooldown: 3,
	execute(message, args, bot) {
		let lang = args[0].toLowerCase();
		const text = args.slice(1, args.length).join(' ');
		if (!langs.includes(lang)) {
			if (lang == 'rand') {
				lang = langs[Math.floor(Math.random(langs.length))];
			} else {
				return bot.sendMessage('Invalid language!');
			}
		}

		translate.translate(text, { to: lang }, (err, res) => {
			if (err || res.code != 200) {
				console.error(err);
				bot.sendMessage('Shit is fucked up, cunt.');
			}

			const toFromLang = res.lang.split('-');
			const toLang = toFromLang[0];
			const fromLang = toFromLang[1];
			
			bot.sendMessage(`Translation from ${fromLang} to ${toLang}: ${res.text}`);
		});
	},
};