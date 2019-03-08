const strawpoll = require('strawpolljs');

module.exports = {
	name: 'strawpoll',
	aliases: ['sp'],
	description: 'Create a new strawpoll, or get the results of a strawpoll from a link.\n Surround the title with quotation marks. Options are seperated with a pipe ("|") character. Use the "-m" flag for allowing multiple answers.',
	usage: '<"title"> <options> [-m] | <-r> <link>',
	args: false,
	cooldown: 10,
	execute(message, args, bot) {
		// Check and see if we are reading

		if (args[0] == '-r') {
			args.shift();

			if (!args[0].match(/https:\/\/(www.)?strawpoll.me\/[0-9]+/g)) {
				bot.sendMessage('You must provide a proper strawpoll URL to read the results!');
				return;
			}

			const pollNum = args.shift().split(/\//g).pop();

			strawpoll.readPoll(pollNum).then(res => console.log(res));

			bot.sendMessage('It worked, but I don\'t have any output for you.');

			return;
		}

		// Title parsing

		const titleArray = [];

		if (!args[0].startsWith('"')) {
			bot.sendMessage('Your title must be enclosed in quotation marks!');
			return;
		}

		titleArray.push(args.shift());

		while (!args[0].includes('"')) {
			if (args.length) {
				titleArray.push(args.shift());
			} else {
				bot.sendMessage('Your title must be enclosed in quotation marks!');
				return;
			}
		}

		if (!args[0].includes('"')) {
			bot.sendMessage('Your title must be enclosed in quotation marks!');
			return;
		}

		titleArray.push(args.shift());

		if (!args.length) {
			bot.sendMessage('You need to include some options with your poll!');
			return;
		}

		const title = titleArray.join(' ');

		// The rest of the command parsing (aka draw the rest of the fucking owl)

		const multi = args.includes('-m');
		args = args.filter(item => item != '-m');
		const items = args.join(' ').split(/\s\|\s/g);

		console.log(title, multi, items);

		// Create poll

		strawpoll.createPoll({
			title: title,
			options: items,
			multi: multi,
			dupcheck: 'normal',
			captcha: false,
		}).then(res => console.log(res));

		bot.sendMessage('It worked, but I don\'t have any output for you.');
	},
};