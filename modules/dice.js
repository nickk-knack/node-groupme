exports.process = (message, bot) => {
	if (message.is_bot) return;

	const command = '.d ';
	const index = message.text.toLowerCase().indexOf(command);

	if (index != -1) {
		const args = message.text.substring(index + command.length).split(' ');
		if (args.length) {
			try {
				const dieSides = parseInt(args[0]);
				if (dieSides <= 0) {
					bot.sendMessage(`@${message.name} doesn't know how dice work.`);
				}
				const roll = Math.floor(Math.random() * dieSides) + 1;
				bot.sendMessage(`@${message.name} rolled ${roll}`);
			} catch (e) {
				console.error(e);
			}
		}
	}
};