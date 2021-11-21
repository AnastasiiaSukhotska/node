let bodyParser=require('body-parser');
module.exports=(app, path)=>{
	let controller=new StaticController(path);
	app.post('/add', bodyParser.json(), controller.addNote.bind(controller))
	app.get('/titles', controller.getAllTitles.bind(controller))
	app.get('/', controller.getMainPage.bind(controller))
	
}
let notes=[];
class StaticController{
	constructor(path){
		this.path=path;
	}
	getMainPage(req,resp){
		resp.setHeader('Content-Type', 'text/html');
		resp.sendFile(this.path+'/index.html');
	}

	getAllTitles(req,resp){
		resp.setHeader('Content-Type', 'application/json');
		resp.send(notes);
	}

	addNote(req, resp){
		console.log(req.body);
		let note=req.body;
		let noteObj={
			title: note.title,
			content: note.content
		}
		notes.push(noteObj);
		resp.send(JSON.stringify(noteObj));

	}
}