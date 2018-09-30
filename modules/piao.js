const quotes = [
	'This is too difficult, will do it later.',
	'I fucking hate Wendy\'s.',
	'That is disappointing.',
	'No, that should not be 2 there.',
	'If you overdose on male enhancement pills, does your dick explode?',
	'Switches are so fucking sexy, UNF',
	'Any deviation from my written solution will be cause for problems.',
	'I bring mug with many handles. It explains circuits.',
	'Give me lamp, brother.',
	'STARE. STARE AT THIS.',
];

module.exports = {
	name: 'piao',
	description: 'Sends quotes that were (probably) said by Piao.',
	args: false,
	cooldown: 3,
	execute(message, args, bot) {
		const quote = quotes[Math.floor(Math.random() * quotes.length)];
		bot.sendMessage(`"${quote}" - Dr. Piao, probably.`);
	},
};