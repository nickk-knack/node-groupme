exports.process = (message, bot) => {
	if (message.is_bot) return;

	const command = '.d ';
	const index = message.text.toLowerCase().indexOf(command);

	if (index != -1) {
		const args = message.text.substring(index + command.length).split(' ');
		if (args.length) {
			try {
				const dieSides = parseInt(args[0]);
				const roll = Math.floor(Math.random() * dieSides) + 1;
				console.log(`${message.name} rolled a ${roll}`);
				bot.sendMessage(`@${message.name} rolled a ${roll}`);
			} catch (e) {
				console.error(e);
			}
		} else {
			const roll = Math.floor(Math.random() * 20) + 1;
			console.log(`${message.name} rolled a ${roll}`);
			bot.sendMessage(`@${message.name} rolled a ${roll}`);
		}
	}
};