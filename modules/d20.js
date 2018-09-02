exports.process = (message, bot) => {
	if (message.is_bot) return;

	const command = '.d';
	const index = message.text.toLowerCase().indexOf(command);

	if (index != -1) {
		const roll = Math.floor(Math.random() * 20) + 1;
		console.log(`${message.name} rolled a ${roll}`);
		bot.sendMessage(`@${message.name} rolled a ${roll}`);
	}
};