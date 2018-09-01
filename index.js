const express = require('express');
const app = express();
const bot = require('./bot.js');

const port = process.env.PORT || 3000;

bot.initialize({
	bot_id: process.env.BOT_ID,
	group_id: process.env.GROUP_ID,
	modules: ['giphy']
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

app.post('/', (req, res) => {
	bot.onPost(req, res);
});