const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bot = require('./bot.js');
const port = process.env.PORT || 3000;

// Initialize bot
bot.initialize({
	bot_id: process.env.BOT_ID,
	group_id: process.env.GROUP_ID,
	access_token: process.env.ACCESS_TOKEN,
});

// Setup express app
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