const prefix = process.env.PREFIX || '.';

// Find function for maps
const find = (map, func) => {
	if (typeof func === 'function') {
		for (const [key, val] of map) {
			if (func(val, key, map)) return val;
		}

		return null;
	}
	else {
		throw new Error('First argument must be a function.');
	}
};

// Map function for arrays
const map = (m, fn, thisArg) => {
	if (thisArg) fn = fn.bind(thisArg);
	const arr = new Array(m.size);
	let i = 0;
	for (const [key, val] of m) arr[i++] = fn(val, key, m);
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
			return bot.sendMessage(`Commands: ${map(commands, (cmd) => cmd.name).join(', ')}\n You can send ${prefix}help [command name] for info on a specific command.`);
		}

		const command = bot.commands.get(args[0]) || find(commands, (cmd) => cmd.aliases && cmd.aliases.includes(args[0]));

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