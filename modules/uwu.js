// this shit is crashing at the JSON parsing, because its getting html back
// undefined:1
// <html>
// ^
// 
// SyntaxError: Unexpected token < in JSON at position 0
//     at JSON.parse (<anonymous>)
//     at Request.bot.request.get [as _callback] (/app/modules/uwu.js:17:25)
//     at Request.self.callback (/app/node_modules/request/request.js:185:22)
//     at emitTwo (events.js:126:13)
//     at Request.emit (events.js:214:7)
//     at Request.<anonymous> (/app/node_modules/request/request.js:1161:10)
//     at emitOne (events.js:116:13)
//     at Request.emit (events.js:211:7)
//     at IncomingMessage.<anonymous> (/app/node_modules/request/request.js:1083:12)
//     at Object.onceWrapper (events.js:313:30)

exports.process = (message, bot) => {
	if (message.is_bot) return;
	
	const command = '.uwu ';
	const index = message.text.toLowerCase().indexOf(command);
	
	if (index != -1) {
		const query = message.text.substring(index + command.length);
		console.log('query', query);
		if (query == '') {
			bot.sendMessage('UwU');
			return;
		}
		const searchTerms = query.split(' ').join('+');
		console.log('search terms', searchTerms);
		const url = `https://e926.net/post/index.json?tag=${encodeURIComponent(searchTerms)}&limit=10`;
		
		bot.request.get(url, (err, resp, body) => {
			console.log('resp', resp);
			console.log('body', body);
			const results = JSON.parse(body)['data'];
			console.log('results', results);
			const numResults = (results.length < 10) ? results.length : 10;
			if (err || numResults == 0) {
				bot.sendMessage(`Nothing found for "${query}"`);
			} else {
				const indexSelected = Math.floor(Math.random() * numResults);
				const selected = results[indexSelected].file_url;
				console.log('selected', selected);
				bot.sendMessage(selected);
			}
		});
	}
};