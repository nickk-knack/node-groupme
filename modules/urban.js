const querystring = require('querystring');
const fetch = require('node-fetch');
const { stripIndents } = require('common-tags');
const trim = (str, max) => (str.length > max) ? `${str.slice(0, max - 3)}...` : str;

module.exports = {
	name: 'urban',
	aliases: ['ud', 'urband'],
	description: 'Searches urbandictionary.com for a phrase and returns the closest listing.',
	usage: '<search>',
	args: true,
	cooldown: 5,
	execute(message, args, bot) {
		const query = querystring.stringify({ term: args.join(' ') });

		fetch(`http://api.urbandictionary.com/v0/define?${query}`)
			.then((res) => res.json())
			.then((json) => {
				if (!json.list.length) {
					return bot.sendMessage(`No results found for **${args.join(' ')}**`);
				}

				const answer = json.list[Math.floor(Math.random() * json.list.length)];

				bot.sendMessage(stripIndents`${answer.word}: 
											Definition: ${trim(answer.definition, 512)}
											Example: ${trim(answer.example, 256)}`);
			})
			.catch((err) => {
				console.error(err);
				bot.sendMessage(`An error occurred while querying the API! (${err.message})`);
			});
	},
};