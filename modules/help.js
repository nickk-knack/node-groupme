const prefix = process.env.PREFIX || '.';

module.exports = {
	name: 'help',
	aliases: ['commands'],
	description: 'List all commands/info about specific commands.',
	usage: '[command name]',
	args: false,
	cooldown: 10,
	execute(message, args, bot) {
		if (!args.length) {
			bot.sendMessage(`Commands: ${bot.commands.map(cmd => cmd.name)}`);
		}
		else {
			if (!bot.commands.has(args[0])) {
				return bot.sendMessage(`@${message.name} "${args[0]}" is not a valid command!`);
			}

			let msg = `${command.name}:\n`;
			const command = bot.commands.get(args[0]);

			if (command.description) {
				msg += `${command.description}`;
			}

			if (command.aliases) {
				msg += `Aliases: ${command.aliases.join(', ')}. `;
			}

			if (command.usage) {
				msg += `Usage: ${prefix}${command.name} ${command.usage}. `;
			}

			msg += `Cooldown: ${command.cooldown || 1} second(s).`;

			bot.sendMessage(msg);
		}
	},
};