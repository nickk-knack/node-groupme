exports.process = (message, bot) => {
	if (message.is_bot) return;

	const command = '.thank';
	const index = message.text.toLowerCase().indexOf(command);

	if (index != -1) {
		bot.sendMessage(`@${message.name} ur welcome`);
	}
};