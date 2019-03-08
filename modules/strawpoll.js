const strawpoll = require('strawpolljs');
const _ = require('lodash/array');

module.exports = {
	name: 'strawpoll',
	aliases: ['sp'],
	description: 'Create a new strawpoll, or get the results of a strawpoll from a link.\n Surround the title with quotation marks. Options are seperated with a pipe ("|") character. Use the "-m" flag for allowing multiple answers.',
	usage: '<"title"> <options> [-m] | <-r> <link | poll number>',
	args: false,
	cooldown: 10,
	execute(message, args, bot) {
		// Check and see if we are reading

		if (args[0] == '-r') {
			args.shift();

			const isURL = args[0].match(/https:\/\/(www.)?strawpoll.me\/[0-9]+/g);
			const isID = args[0].match(/[0-9]+/g);

			if (!(isURL || isID)) {
				bot.sendMessage('You must provide a proper strawpoll URL or strawpoll poll ID to read the results!');
				return;
			}

			let pollNum;
			
			if (isURL) {
				console.log('URL was provided'); // testing
				pollNum = args.shift().split('/').pop();
			} else if (isID) {
				console.log('ID was provided'); // testing
				pollNum = args.shift();
			} else {
				console.error('wtf? this shouldn\'t happen');
				bot.sendMessage('something went seriously wrong, yo');
				return;
			}

			console.log(pollNum); // testing

			strawpoll.readPoll(pollNum).then(res => {
				console.log(res);
				const results = _.zip(res.options, res.votes);
				console.log('results:', results); // testing
				results.sort((a, b) => a[1] < b[1]);
				console.log('sorted results:', results); // testing

				bot.sendMessage(`Winning result for ${res.title}: ${results[0][0]} with ${results[0][1]} votes.`);
			}).catch(err => {
				console.error(err);
				bot.sendMessage('An error occurred while processing the read request!');
			});

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
		const options = args.join(' ').split(/\s\|\s/g);

		console.log(title, multi, options);

		// Create poll

		strawpoll.createPoll({
			title: title,
			options: options,
			multi: multi,
		}).then(res => {
			console.log(res);
			if (res.id !== undefined) {
				bot.sendMessage(`https://strawpoll.me/${res.id}`);
			} else {
				bot.sendMessage('Ruh roh, raggy! [Something went wrong processing that request...]');
			}
		}).catch(err => {
			console.error(err);
			bot.sendMessage('Ruh roh, raggy! [Something went wrong processing that request...]');
		});
	},
};