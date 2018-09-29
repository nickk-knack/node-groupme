const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bot = require('./bot.js');
const commandModules = new Map();
const commandFiles = fs.readdirSync('./modules');
const cooldowns = new Map();
const prefix = process.env.PREFIX || '.';
const port = process.env.PORT || 3000;

// Check that we have a bot_id and group_id before we start loading shit
if (!process.env.BOT_ID) {
	console.error('No BOT_ID supplied!');
	process.exit(1);
}

if (!process.env.GROUP_ID) {
	console.error('No GROUP_ID supplied!');
	process.exit(1);
}

// Load all command modules
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commandModules.set(command.name, command);
}

bot.initialize({
	bot_id: process.env.BOT_ID,
	group_id: process.env.GROUP_ID,
	modules: ['help', 'giphy', 'dice', 'inspire', 'piao', 'images', 'uwu', 'thank', 'bad', '8ball']
});

app.use(bodyParser.json());

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

app.post('/', (req, res) => {
	bot.onPost(req, res);
});

app.get('/', (req, res) => {
	res.end('hello');
});