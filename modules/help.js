const prefix = process.env.PREFIX || '.';

Map.prototype.map = function (fn, thisArg) {
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
	cooldown: 10,
	execute(message, args, bot) {
		const { commands } = bot;
		if (!args.length) {
			bot.sendMessage(`Commands: ${commands.map(cmd => cmd.name)}`);
		} 
		else {
			if (!bot.commands.has(args[0])) {
				return bot.sendMessage(`@${message.name} "${args[0]}" is not a valid command!`);
			}
			
			const command = bot.commands.get(args[0]);
			let msg = `${command.name}:\n`;

			if (command.description) {
				msg += `${command.description}\n`;
			}

			if (command.aliases) {
				msg += `Aliases: ${command.aliases.join(', ')}\n`;
			}

			if (command.usage) {
				msg += `Usage: ${prefix}${command.name} ${command.usage}\n`;
			}

			msg += `Cooldown: ${command.cooldown || 1} second(s).`;

			bot.sendMessage(msg);
		}
	},
};