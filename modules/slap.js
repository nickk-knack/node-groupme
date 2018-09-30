const items = ['a giant fish',
	'a trout',
	'a frying pan',
	'a whip',
	'a fuckin\' cock',
	'a dildo',
	'his 5.3 inch dick',
	'a shoe',
	'a used napkin',
	'a mexican midget',
	'a rubber chicken',
	'an STD',
	'a condom',
	'a pair of flip flops',
	'a wet noodle',
	'a single potato chip',
	'a flatbill',
	'a trout',
	'my big ol\' wang',
	'a classy cocaine purse',
	'a scientology pamphlet',
];

module.exports = {
	name: 'slap',
	description: 'Virtually slaps a user.',
	usage: '<user>',
	args: false,
	cooldown: 1,
	execute(message, args, bot) {
		if (!args.length) {
			bot.sendMessage(`*slaps ${message.name} with a fuckin' stick*`);
			return;
		}

		const user = args.join(' ');
		let item = items[Math.floor(Math.random() * items.length)];

		bot.sendMessage(`*slaps ${user} with ${item}!*`);
	},
};