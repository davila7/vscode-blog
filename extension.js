const vscode = require('vscode');
const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	let articles = [];
	try {
		const res = await axios.get("https://medium.com/feed/@dan.avila7", { 
			headers: { "Accept-Encoding": "gzip,deflate,compress" } 
		});
		const parser = new XMLParser();
		let json = parser.parse(res.data);
		articles = json.rss.channel.item.map(article => {
			return {
				label: article.title,
				detail: article.category[0],
				link: article.link
			}
		});
		console.log(articles);
	} catch (error) {
		console.error(error);
	}
	

	let disposable = vscode.commands.registerCommand('blog-feed-rss.searchBlogRss', 
	async function () {
		const article = await vscode.window.showQuickPick(articles, {
			matchOnDetail : true
		});

		if(article == null) return;
		vscode.env.openExternal(article.link);
		vscode.window.showInformationMessage('El artículo se abrirá en una nueva ventana');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
