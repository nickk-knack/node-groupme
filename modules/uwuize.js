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

                let uwu = original.replace('R', 'w');
                uwu = uwu.replace(/rR/g, 'w');
                uwu = uwu.replace(/lL/g, 'w');
                // add a case for first instance of a word that starts with Th (ignore case)
                uwu = uwu.replace(/you/g, 'yuw'); // this might be extra
                uwu = uwu.replace(/\sth/g, ' d');
                uwu = uwu.replace(/th/g, 'f');

                bot.sendMessage(`${uwu} uwu`);
        }
};
