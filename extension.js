const vscode = require('vscode');
const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	let articles = [];
	const parser = new XMLParser();
	try {

		//link1
		const link1_url = vscode.workspace.getConfiguration().get('RSS.link1.url');
		const link1_type = vscode.workspace.getConfiguration().get('RSS.link1.type');
		if(link1_url != "")
		{
			const res = await axios.get(link1_url, { 
				headers: { "Accept-Encoding": "gzip,deflate,compress" } 
			});
			let json = parser.parse(res.data);
			let articles1 = json.rss.channel.item.map(article => {
				return {
					label: article.title,
					detail: link1_type,
					link: article.link
				}
			});
			articles = articles.concat(articles1);
			console.log(articles);
		}

		//link2
		const link2_url = vscode.workspace.getConfiguration().get('RSS.link2.url');
		const link2_type = vscode.workspace.getConfiguration().get('RSS.link2.type');
		if(link2_url != "")
		{
			const res = await axios.get(link2_url, { 
				headers: { "Accept-Encoding": "gzip,deflate,compress" } 
			});
			let json = parser.parse(res.data);
			let articles2 = json.rss.channel.item.map(article => {
				return {
					label: article.title,
					detail: link2_type,
					link: article.link
				}
			});
			articles = articles.concat(articles2);
			console.log(articles);
		}

		//link3
		const link3_url = vscode.workspace.getConfiguration().get('RSS.link3.url');
		const link3_type = vscode.workspace.getConfiguration().get('RSS.link3.type');
		if(link3_url != "")
		{
			const res = await axios.get(link3_url, { 
				headers: { "Accept-Encoding": "gzip,deflate,compress" } 
			});
			let json = parser.parse(res.data);
			let articles3 = json.rss.channel.item.map(article => {
				return {
					label: article.title,
					detail: link3_type,
					link: article.link
				}
			});
			articles = articles.concat(articles3);
			console.log(articles);
		}

		// //link4
		const link4_url = vscode.workspace.getConfiguration().get('RSS.link4.url');
		const link4_type = vscode.workspace.getConfiguration().get('RSS.link4.type');
		if(link4_url != "")
		{
			const res = await axios.get(link4_url, { 
				headers: { "Accept-Encoding": "gzip,deflate,compress" } 
			});
			let json = parser.parse(res.data);
			let articles4 = [];
			if(link4_type == 'Reddit')
			{
				articles4 = json.feed.entry.map(article => {
					return {
						label: article.title,
						detail: link4_type,
						link: article.link
					}
				});
			}
			else if(link4_type == 'Youtube')
			{
				
				articles4 = json.feed.entry.map(article => {
					let videoid = article.id.replace("yt:video:", "");
					return {
						label: article.title,
						detail: link4_type,
						link: 'https://www.youtube.com/watch?v='+videoid
					}
				});
			}
			else
			{
				articles4 = json.rss.channel.item.map(article => {
					return {
						label: article.title,
						detail: link4_type,
						link: article.link
					}
				});
			}
			
			articles = articles.concat(articles4);
			console.log(articles);
		}

		// //link5
		const link5_url = vscode.workspace.getConfiguration().get('RSS.link5.url');
		const link5_type = vscode.workspace.getConfiguration().get('RSS.link5.type');
		if(link5_url != "")
		{
			const res = await axios.get(link5_url, { 
				headers: { "Accept-Encoding": "gzip,deflate,compress" } 
			});
			let json = parser.parse(res.data);
			let articles5 = json.rss.channel.item.map(article => {
				return {
					label: article.title,
					detail: link5_type,
					link: article.link
				}
			});
			articles = articles.concat(articles5);
			console.log(articles);
		}
		
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