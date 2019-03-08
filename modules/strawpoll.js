const strawpoll = require('strawpolljs');

module.exports = {
	name: 'strawpoll',
	aliases: ['sp'],
	description: 'Create a new strawpoll, or get the results of a strawpoll from a link.\n Surround the title with quotation marks. Options are seperated with a pipe ("|") character. Use the "-m" flag for allowing multiple answers.',
	usage: '<"title"> <options> [-m] | <-r> <link | poll number>',
	args: false,
	cooldown: 10,
	execute(message, args, bot) {
		if (args[0] == '-r') {
			read(args, bot);
			return;
		} else {
			create(args, bot);
		}		
	},
};

function read(args, bot) {
	args.shift();

	const isURL = args[0].match(/https:\/\/(www.)?strawpoll.me\/[0-9]+/g);
	const isID = args[0].match(/[0-9]+/g);

	if (!(isURL || isID)) {
		bot.sendMessage('You must provide a proper strawpoll URL or strawpoll poll ID to read the results!');
		return;
	}

	let pollNum;

	if (isURL) {
		pollNum = args.shift().split('/').pop();
	} else if (isID) {
		pollNum = args.shift();
	} else {
		console.error('wtf? this shouldn\'t happen');
		bot.sendMessage('something went seriously wrong, yo');
		return;
	}

	strawpoll.readPoll(pollNum).then(res => {
		const json = JSON.parse(res);

		const topRes = {
			result: '',
			votes: 0,
		};

		for (let i = 0; i < json.votes.length; i++) {
			if (json.votes[i] > topRes.votes) {
				topRes.votes = json.votes[i];
				topRes.result = json.options[i];
			}
		}

		bot.sendMessage(`Winning result for "${json.title.trim()}": "${topRes.result.trim()}" with ${topRes.votes} votes.`);
	}).catch(err => {
		console.error(err);
		bot.sendMessage('An error occurred while processing the read request!');
	});
}

function create(args, bot) {
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

	bot.request({
		method: 'POST',
		uri: 'http://www.strawpoll.me/api/v2/polls',
		followAllRedirects: true,
		json: true,
		body: {
			title: title,
			options: options,
			mutli: multi,
		},
		headers: {
			'Content-Type': 'application/json',
		},
	}).then(res => JSON.parse(res)).then(json => {
		if (json.id !== undefined) {
			bot.sendMessage(`https://strawpoll.me/${json.id}`);
		} else {
			bot.sendMessage('Ruh roh, raggy! [Something went wrong processing that request...]');
		}
	}).catch(err => {
		console.error(err);
		bot.sendMessage('Ruh roh, raggy! [Something went wrong processing that request...]');
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
}