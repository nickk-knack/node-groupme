const fs = require('fs');
const fetch = require('node-fetch');
const prefix = process.env.PREFIX || '.';
const commandModules = new Map();
const commandFiles = fs.readdirSync('./modules');
const cooldowns = new Map();

const secretMessages = {
	32344351: [
		'fuck off, andrew',
		'are you done puking yet, andrew?',
		'andrew fucks his cat for relief',
		'alexa, add small black anal beads to my shopping list',
		'"casually conservative"',
		'ah yes, thats because algebra',
		'my cat has aids 😂',
		'ayyy john arbuckle whats crackalackin binglebanger',
	],
	23245751: [
		'nick is a bitch',
		'high nick',
		'danny rick lookin\' fucker',
	],
	37488539: [
		'go photoshop a bigger dick on yourself, jake',
		'.bad jake',
		'jake go back to no lifing wow classic',
		'shut up anprim',
	],
	38353365: [
		'max, shouldn\'t you be on call? lil ho',
		'max, you MUST contact me',
		'want a sprite cranberry?',
		'max, are you a believer?',
	],
	29852683: [
		'matt, what\'s the derivative of e^x? bitch',
		'who is this dude?',
		'dumb question',
	],
	57184367: [
		'the epic memer has spoken',
		'guys i lost my mom',
		'this guy needs more random messages',
	],
	43198226: [
		'faewfwexxdb','babdnerionpko','zxvcxnkvrnoiniogarwniogsre','ajfewanoifjewanfewajifewjaoifewaioj','zxcvzxc','badabadbabdbadba',
		'badabingbadaboom',
		'O-oooooooooo AAAAE-A-A-I-A-U- JO-oooooooooooo AAE-O-A-A-U-U-A- E-eee-ee-eee AAAAE-A-E-I-E-A-JO-ooo-oo-oo-oo EEEEO-A-AAA-AAAA',
		'you wanna hear a random signAAAaAALALAANFESNOVNSIUVBUOSEHUO#Y*R$HY*t8934try8943ry89438943wy89t43wh84e8',
		'sSSSSS AAaAAA  R EWwE e eeE xDDDDDDDD',
	],
};

// Add a find function to the Map object (because it doesn't exist in vanilla JS for some reason)
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

// Bot object
const bot = {
	api_url: 'https://api.groupme.com/v3/bots/',
	bot_id: '',
	group_id: '',
	access_token: '',
	commands: commandModules,
	sendMessage(text, picture_url = null) {
		let data = `${bot.api_url}post?bot_id=${bot.bot_id}&text=${encodeURIComponent(text)}`;

		if (picture_url != null) {
			data += `&picture_url=${picture_url}`;
		}

		fetch(data, { method: 'POST' }).catch(console.error);
	}
};

// Handler for when a message is received
exports.onPost = (req, res) => {
	// Create message object from input
	const message = {
		text: req.body.text,
		sender_id: req.body.sender_id,
		name: req.body.name,
		is_bot: req.body.sender_type === 'bot',
		attachments: req.body.attachments,
	};

	console.log(`[${message.name} (${message.sender_id})]: ${message.text}`);

	// Don't react to messages from bots
	if (message.is_bot) {
		res.end();
		return;
	}

	// Check that its a command
	const prefixRegex = new RegExp(`^(\\${prefix})\\s*`);
	if (!prefixRegex.test(message.text)) {
		// anything else i want to check for that wouldn't be a command goes here
		const messagesToSend = [];

		if (message.text.toLowerCase().includes('epic')) {
			messagesToSend.push('ok now THIS is epic');
		}

		if (message.text.toLowerCase().includes('never have i ever')) {
			messagesToSend.push('*puts finger down*');
		}

		const assTokens = message.text.toLowerCase().match(/(\w*[\s-])ass(\s\w*)/g);
		
		if (assTokens) {
			const fixedAss = assTokens[0].match(/ass(\s\w*)/g)[0].replace(/\s/, '-');
			messagesToSend.push(fixedAss);
		}

		const rand = Math.floor(Math.random() * 1000) + 1;
		if (rand > 990) {
			const smLength = secretMessages[message.sender_id].length;
			messagesToSend.push(secretMessages[message.sender_id][Math.floor(Math.random() * smLength)]);
		}

		bot.sendMessage(messagesToSend.join('\n'));

		res.end();
		return;
	}

	// Get command args and name
	const [, matchedPrefix] = message.text.match(prefixRegex);
	const args = message.text.slice(matchedPrefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	// Get the actual command object, check if it exists
	const command = commandModules.get(commandName) || find(commandModules, (cmd) => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) {
		bot.sendMessage('That command does not exist!');
		res.end();
		return;
	}

	// Check if args are required
	if (command.args && !args.length) {
		let reply = `@${message.name} You didn't provide any arguments.`;

		if (command.usage) {
			reply += ` Proper usage: "${prefix}${command.name} ${command.usage}"`;
		}

		bot.sendMessage(reply);
		res.end();
		return;
	}

	// Execute command
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Map());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown) * 1000;

	if (!timestamps.has(message.sender_id)) {
		timestamps.set(message.sender_id, now);
		setTimeout(() => timestamps.delete(message.sender_id), cooldownAmount);
	}
	else {
		const expirationTime = timestamps.get(message.sender_id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			bot.sendMessage(`@${message.name} please wait ${timeLeft.toFixed(1)} more second(s) before using the ${command.name} command.`);
			res.end();
			return;
		}

		timestamps.set(message.sender_id, now);
		setTimeout(() => timestamps.delete(message.sender_id), cooldownAmount);
	}

	try {
		command.execute(message, args, bot);
	}
	catch (error) {
		console.error(error);
		bot.sendMessage('There was an error executing that command. :(');
	}

	res.end();
};

// Function for initializing the bot
exports.initialize = (values) => {
	// Check that we have a bot_id and group_id
	let err = false;
	if (!values.bot_id) {
		console.error('No bot_id provided!');
		err = true;
	}
	if (!values.group_id) {
		console.error('No group_id provided!');
		err = true;
	}
	if (!values.access_token) {
		console.log('No access token provided! Image uploading will fail.');
	}
	if (err) return;

	// Assign the bot_id and group_id to the bot object
	bot.bot_id = values.bot_id;
	bot.group_id = values.group_id;

	// Load all command modules
	for (const file of commandFiles) {
		const command = require(`./modules/${file}`);
		commandModules.set(command.name, command);
	}

	console.log(`Initialization successful. Bot ID: ${bot.bot_id}, Group ID: ${bot.group_id}`);
};