const prefix = process.env.PREFIX || '.';

// Add the map and find functions to the Map prototype
Map.prototype.map = (fn, thisArg) => {
	if (thisArg) fn = fn.bind(thisArg);
	const arr = new Array(this.size);
	let i = 0;
	for (const [key, val] of this) arr[i++] = fn(val, key, this);
	return arr;
};

module.exports = {
	name: 'help',
	aliases: ['commands'],
	description: 'List all commands/info about specific commands.',
	usage: '[command name]',
	args: false,
	cooldown: 7,
	execute(message, args, bot) {
		const { commands } = bot;

		if (!args.length) {
			return bot.sendMessage(`Commands: ${commands.map(cmd => cmd.name).join(', ')}\n You can send ${prefix}help [command name] for info on a specific command.`);
		}

		const command = bot.commands.get(args[0]);

		if (!command) {
			return bot.sendMessage(`@${message.name} "${args[0]}" is not a valid command or alias!`);
		}

		let msg = `${command.name}:\n\n`;
		if (command.description) {
			msg += `${command.description}\n`;
		}

		if (command.aliases) {
			msg += `Aliases: [${command.aliases.join(', ')}]\n`;
		}

		if (command.usage) {
			msg += `Usage: ${prefix}${command.name} ${command.usage}\n`;
		}

		msg += `Cooldown: ${command.cooldown || 1} second(s).`;

		return bot.sendMessage(msg);
	},
};