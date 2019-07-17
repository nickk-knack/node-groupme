module.exports = {
	name: 'uwuize',
	aliases: [],
	description: 'Gives whatevwe you type cancew OwO',
	usage: '<text>',
	args: true,
	cooldown: 3,
	execute(message, args, bot) {
		const original = args.join(' ').trim();

                let uwu = original.replace('R', 'w');
                uwu = original.replace('r', 'w');
                uwu = original.replace('L', 'w');
                uwu = original.replace('l', 'w');
                uwu = original.replace('ou', 'uw'); // this might be extra
                uwu = original.replace(/\sth/g, 'd');
                uwu = original.replace('th', 'f');

                bot.sendMessage(`${uwu} uwu`);
        }
};
