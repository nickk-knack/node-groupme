exports.process = (message, bot) => {
	if (message.is_bot) return;

	const command = '.help';
	const index = message.text.toLowerCase().indexOf(command);

	if (index != -1) {
		bot.sendMessage('Commands: .help, .thank, .bad, .d <# of sides>, .inspire, .piao, .giphy <search terms>, .images <search terms>, .uwu <search terms>, .8ball <question>');
	}
};