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
];

exports.process = (message, bot) => {
	if (message.is_bot) return;

	const command = '.piao';
	const index = message.text.toLowerCase().indexOf(command);

	if (index != -1) {
		const quote = quotes[Math.floor(Math.random() * quotes.length)];
		bot.sendMessage(`"${quote}" - Dr. Piao, probably.`);
	}
};