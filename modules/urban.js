const snekfetch = require('snekfetch');
const trim = (str, max) => (str.length > max) ? `${str.slice(0, max - 3)}...` : str;

module.exports = {
	name: 'urban',
	aliases: ['ud', 'urband'],
	description: 'Searches urbandictionary.com for a phrase and returns the closest listing.',
	usage: '<search>',
	args: true,
	cooldown: 5,
	execute(message, args, bot) {
		snekfetch.get('https://api.urbandictionary.com/v0/define').query({ term: args.join(' ').trim() })
			.then(data => data.body)
			.then(body => {
				if (body.result_type === 'no_results') {
					bot.sendMessage(`No results found for **${args.join(' ')}**`);
					return;
				}

				const [answer] = body.list;
				let msg = '';
				msg += `${answer.word}: \n`;
				msg += `Definition: ${trim(answer.definition, 512)}\n`;
				msg += `Example: ${trim(answer.example, 256)}\n`;
				bot.sendMessage(msg);
			})
			.catch(err => {
				console.error(err);
				bot.sendMessage('That word could not be found!');
			});
	},
};