module.exports = {
	name: 'uwuize',
	aliases: [],
	description: 'Gives whatevwe you type cancew OwO',
	usage: '<text>',
	args: true,
	cooldown: 3,
	execute(message, args, bot) {
		const original = args.join(' ').trim();

// maybe just convert whole thing to lower

                let uwu = original.replace(/r/gi, 'w');
                uwu = uwu.replace(/l/gi, 'w');
                // add a case for first instance of a word that starts with Th (ignore case)
                uwu = uwu.replace(/you/gi, 'yuw'); // this might be extra
                uwu = uwu.replace(/\sth/gi, ' d');
                uwu = uwu.replace(/th/gi, 'f');

                bot.sendMessage(`${uwu} uwu`);
        }
};
