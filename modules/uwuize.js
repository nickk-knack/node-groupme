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
                uwu = uwu.replace('r', 'w');
                uwu = uwu.replace('L', 'w');
                uwu = uwu.replace('l', 'w');
                uwu = uwu.replace('ou', 'uw'); // this might be extra
                uwu = uwu.replace(/\sth/g, 'd');
                uwu = uwu.replace('th', 'f');

                bot.sendMessage(`${uwu} uwu`);
        }
};
