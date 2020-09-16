const strawpoll = require('strawpolljs');
const fetch = require('node-fetch');

const read = (args) => {
	args.shift();

	const isURL = args[0].match(/https:\/\/(?:www\.)?strawpoll.me\/\d+/giu);
	const isID = args[0].match(/\d+/giu);

	if (!(isURL || isID)) {
		return 'You must provide a proper strawpoll URL or strawpoll poll ID to read the results!';
	}

	let pollNum = '';

	if (isURL) {
		pollNum = args.shift().split('/').pop();
	} else if (isID) {
		pollNum = args.shift();
	} else {
		throw new Error('Something went seriously wrong, yo. (got neither a url nor an id)');
	}

	strawpoll.readPoll(pollNum)
		.then((res) => JSON.parse(res))
		.then((json) => {
			const topResult = {
				result: '',
				votes: 0,
			};
	
			for (let i = 0; i < json.votes.length; i++) {
				if (json.votes[i] > topResult.votes) {
					topResult.votes = json.votes[i];
					topResult.result = json.options[i];
				}
			}
	
			return `Winning result for "${json.title.trim()}": "${topResult.result.trim()}" with ${topResult.votes} votes.`;
		})
		.catch((err) => {
			console.error(err);
			return `An error occurred while processing the read request! ${err}`;
		});
};

// untested
const create = (args) => {
	// Title parsing
	const titleArray = [];
	if (!args[0].startsWith('"')) {
		return 'Your title must be enclosed in quotation marks!';
	}

	titleArray.push(args.shift());
	while (!args[0].includes('"')) {
		if (args.length) {
			titleArray.push(args.shift());
		} else {
			return 'Your title must be enclosed in quotation marks!';
		}
	}

	if (!args[0].includes('"')) {
		return 'Your title must be enclosed in quotation marks!';
	}

	titleArray.push(args.shift());
	if (!args.length) {
		return 'You need to include some options with your poll!';
	}

	const title = titleArray.join(' ');

	// The rest of the command parsing (aka draw the rest of the fucking owl)
	const multi = args.includes('-m');
	args = args.filter((item) => item != '-m');
	const options = args.join(' ').split(/\s\|\s/gu);

	// console.log(title, multi, options);

	// Create poll
	// TODO: test this mess
	fetch('https://strawpoll.me/api/v2/polls', {
		method: 'POST',
		redirect: 'follow',
		headers: {
			'Content-Type': 'application/json',
		},
		body: {
			title: title,
			options: options,
			multi: multi,
		},
	})
		.then((res) => res.json())
		.then((json) => {
			if (json.id) {
				return `https://strawpoll.me/${json.id}`;
			} else {
				return 'something went wrong while creating that strawpoll...';
			}
		})
		.catch((err) => {
			console.error(err);
			return `An error occurred while creating the strawpoll. (${err})`;
		});

	// strawpoll.createPoll({
	// 	title: title,
	// 	options: options,
	// 	multi: multi,
	// }).then(res => {
	// 	const json = JSON.parse(res);
	// 	if (json.id !== undefined) {
	// 		bot.sendMessage(`https://strawpoll.me/${json.id}`);
	// 	} else {
	// 		bot.sendMessage('Ruh roh, raggy! [Something went wrong processing that request...]');
	// 	}
	// }).catch(err => {
	// 	console.error(err);
	// 	bot.sendMessage('Ruh roh, raggy! [Something went wrong processing that request...]');
	// });
};

module.exports = {
	name: 'strawpoll',
	aliases: ['sp'],
	description: 'Create a new strawpoll, or get the results of a strawpoll from a link.\n Surround the title with quotation marks. Options are seperated with a pipe ("|") character. Use the "-m" flag for allowing multiple answers.',
	usage: '<"title"> <options> [-m] | <-r> <link | poll number>',
	args: true,
	cooldown: 5,
	execute(message, args, bot) {
		const readFlag = args[0].toLowerCase();
		const res = (readFlag === '-r') ? read(args) : create(args);
		bot.sendMessage(res);	
	},
};
