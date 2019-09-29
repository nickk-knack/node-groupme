const lines = [
	'Yo, what do we have here? The CUMSHIP.XXX?',
	'C U M\nS H I P\n. X X X',
	'Docking up to the COCKSHIP.XXX',
	'LOADED with PLEDGE BOIS?!?? n FRAT JOCKS??!?!??!?!?!?!?',
	'Stripped NAKED??!?!?!?!',
	'HUGE hard COCKs as HARD as ROCKS?!',
	'𝙔𝙊!!!',
	'PLEDGE BOYS',
	'GONNA BE FUCKED N FUCKD N FUCKD',
	'FUCKDNFUCKDNFUCKD',
	'YO',
	'YALE ND HARVARD',
	'U C L A',
	'UNIVERSITY OF TEXAS ALABAMA OHI0??!?',
	'CAMEBRIDGE OXFORD',
	'PLEDGE BOYS STRIPPED NAKED, HUGE HARD COCKS AS HARD AS ROCKS',
	'FRATJOCKS GUNNA FUCKNFUCKNFUK THOSE BOYES',
	'𝐘𝐎𝐨𝐎𝐨𝐨𝐎𝐎𝐎!',
];

module.exports = {
	name: 'xxx',
	description: 'Sends a random line from Grant MacDonald\'s hit song, Cumship (2019).',
	args: false,
	cooldown: 1,
	execute(message, args, bot) {
		bot.sendMessage(lines[Math.floor(Math.random() * lines.length)]);
	},
};