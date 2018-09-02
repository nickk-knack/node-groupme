const req = require('request');
const modules = [];

const bot = {
	request: req,
	api_url: 'https://api.groupme.com/v3/bots/',
	bot_id: '',
	group_id: '',
	sendMessage(text) {
		const data = `${bot.api_url}post?bot_id=${bot.bot_id}&text=${encodeURIComponent(text)}`;
		bot.request.post(data, (error) => {
			if (error) {
				console.error(error);
			}
		});
	}
};

exports.onPost = (req, res) => {
	const message = {
		text: req.body.text,
		sender_id: req.body.sender_id,
		name: req.body.name,
		is_bot: req.body.sender_type === 'bot'
	};

	modules.forEach((moduleOn) => {
		moduleOn.process(message, bot);
	});

	res.end();
};

exports.initialize = (values) => {
	let err = false;
	if (!values.bot_id) {
		console.log('No bot_id provided!');
		err = true;
	}
	if (!values.group_id) {
		console.log('No group_id provided!');
		err = true;
	}
	if (!values.modules || values.modules.length < 1) {
		console.log('No modules loaded! Must load at least one module.');
		err = true;
	}
	if (err) return;

	bot.bot_id = values.bot_id;
	bot.group_id = values.group_id;
	let modulesLoaded = '';
	values.modules.forEach((value, index) => {
		try {
			const moduleOn = require(`./modules/${value}.js`);
			modules[index] = moduleOn;
			if (modulesLoaded)
				modulesLoaded += `, ${value}`;
			else
				modulesLoaded = value;
		} catch (e) {
			console.error(e);
			console.error(`Module ${value} not found!`);
			return;
		}
	});

	console.log(`Initialization successful. Bot ID: ${bot.bot_id}, Group ID: ${bot.group_id}, Modules loaded: ${modulesLoaded}`);
};