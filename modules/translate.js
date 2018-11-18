const translate = require('yandex-translate')(process.env.YANDEX_TRANSLATE_API_KEY);

const langs = {
	af: 'Afrikaans',
	am: 'Amharic',
	ar: 'Arabic',
	az: 'Azerbaijani',
	ba: 'Bashkir',
	be: 'Belarusian',
	bg: 'Bulgarian',
	bn: 'Bengali',
	bs: 'Bosnian',
	ca: 'Catalan',
	ceb: 'Cebuano',
	cs: 'Czech',
	cy: 'Welsh',
	da: 'Danish',
	de: 'German',
	el: 'Greek',
	en: 'English',
	eo: 'Esperanto',
	es: 'Spanish',
	et: 'Estonian',
	eu: 'Basque',
	fa: 'Persian',
	fi: 'Finnish',
	fr: 'French',
	ga: 'Irish',
	gd: 'Scottish Gaelic',
	gl: 'Galician',
	gu: 'Gujarati',
	he: 'Hebrew',
	hi: 'Hindi',
	hr: 'Croatian',
	ht: 'Haitian',
	hu: 'Hungarian',
	hy: 'Armenian',
	id: 'Indonesian',
	is: 'Icelandic',
	it: 'Italian',
	ja: 'Japanese',
	jv: 'Javanese',
	ka: 'Georgian',
	kk: 'Kazakh',
	km: 'Khmer',
	kn: 'Kannada',
	ko: 'Korean',
	ky: 'Kyrgyz',
	la: 'Latin',
	lb: 'Luxembourgish',
	lo: 'Lao',
	lt: 'Lithuanian',
	lv: 'Latvian',
	mg: 'Malagasy',
	mhr: 'Mari',
	mi: 'Maori',
	mk: 'Macedonian',
	ml: 'Malayalam',
	mn: 'Mongolian',
	mr: 'Marathi',
	mrj: 'Hill Mari',
	ms: 'Malay',
	mt: 'Maltese',
	my: 'Burmese',
	ne: 'Nepali',
	nl: 'Dutch',
	no: 'Norwegian',
	pa: 'Punjabi',
	pap: 'Papiamento',
	pl: 'Polish',
	pt: 'Portuguese',
	ro: 'Romanian',
	ru: 'Russian',
	si: 'Sinhalese',
	sk: 'Slovak',
	sl: 'Slovenian',
	sq: 'Albanian',
	sr: 'Serbian',
	su: 'Sundanese',
	sv: 'Swedish',
	sw: 'Swahili',
	ta: 'Tamil',
	te: 'Telugu',
	tg: 'Tajik',
	th: 'Thai',
	tl: 'Tagalog',
	tr: 'Turkish',
	tt: 'Tatar',
	udm: 'Udmurt',
	uk: 'Ukrainian',
	ur: 'Urdu',
	uz: 'Uzbek',
	vi: 'Vietnamese',
	xh: 'Xhosa',
	yi: 'Yiddish',
	zh: 'Chinese'
};

module.exports = {
	name: 'translate',
	aliases: ['t'],
	description: `Translate your dumb text into any other language. Use 'rand' for a random language, any number for multiple random translations, or one of the supported languages.
Supported languages: [${Object.keys(langs).join(', ')}]
Use "${process.env.PREFIX}translate <lang>" to see what language a language code refers to.`,
	usage: '<to language> <text>',
	args: true,
	cooldown: 3,
	execute(message, args, bot) {
		let lang = args[0].toLowerCase();
		const text = args.slice(1, args.length).join(' ');
		if (!langs[lang]) {
			if (lang == 'rand') {
				lang = Object.keys(langs)[Math.floor(Math.random() * Object.keys(langs).length)];
			} else if (lang.match(/^[0-9]+/g)) {
				const match = lang.match(/^[0-9]+/g);
				const num = parseInt(match[0]);
				return multipleTranslations(num, text, bot);
			} else {
				return bot.sendMessage('Invalid language!');
			}
		}

		if (!text) {
			return bot.sendMessage(`${lang}: ${langs[lang]}`);
		}

		translate.translate(text, { to: lang }, (err, res) => {
			if (err || res.code != 200) {
				console.error(err);
				bot.sendMessage('Shit is fucked up, cunt.');
			}

			const toFromLang = res.lang.split('-');
			const toLang = langs[toFromLang[1]];
			const fromLang = langs[toFromLang[0]];
			
			bot.sendMessage(`Translation from ${fromLang} to ${toLang}: ${res.text}`);
		});
	},
};

const multipleTranslations = (num = 5, text, bot) => {
	let startLang;
	
	promiseGetLang(text).then(lang => {
		startLang = lang;
	});

	let newText = text;
	const langsPassed = [];

	for (let i = 0; i < num; i++) {
		let cont = false;
		let lang = Object.keys(langs)[Math.floor(Math.random() * Object.keys(langs).length)];

		promiseTranslate(newText, lang, langsPassed).then(() => {
			cont = true;
		}).catch(err => {
			bot.sendMessage(err);
		});

		while (!cont);
	}

	promiseTranslate(newText, startLang, langsPassed).then(() => {
		const translatedText = newText;
		bot.sendMessage(`Translation from ${startLang} through ${langsPassed.join(', ')} back to ${startLang}: ${translatedText}`);
	});
};

const promiseGetLang = (text) => {
	return new Promise((resolve, reject) => {
		translate.detect(text, { hint: 'en' }, (err, res) => {
			if (err || res.code != 200) {
				console.error(err);
				reject('Shit is fucked up, cunt');
			}

			resolve(res.lang);
		});
	});
};

const promiseTranslate = (newText, lang, langsPassed) => {
	return new Promise((resolve, reject) => {
		translate.translate(newText, { to: lang }, (err, res) => {
			if (err || res.code != 200) {
				console.error(err);
				reject('Shit is fucked up, cunt.');
			}

			const toFromLang = res.lang.split('-');
			const toLang = langs[toFromLang[1]];
			langsPassed.push(toLang);

			newText = res.text;
			resolve();
		});
	});
};