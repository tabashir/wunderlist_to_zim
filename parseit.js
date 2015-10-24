var zimDataFolder = '/tmp/home/jezm/Dropbox/Zim/Notebooks/notes'
var exportAllTasks = false;

var dash = require('lodash');
var fs = require('fs');
var mkdirp = require('mkdirp');
var parsedJSON = require('./wunderlist.json');
var data = parsedJSON.data;
var notes = data.notes;
var tasks = data.tasks;
var lists = data.lists;
var subtasks = data.subtasks;

function printTask(task) {

	var fileName = task.title.replace(/[,\[\]\(\)\/&<>:; %\$\^\#]+/g, '_');
	var subfolderName = task.list.replace(/[,\[\]\(\)\/&<>:; %\$\^\#]+/g, '_');
	var fullFolderName = zimDataFolder + '/' + subfolderName;
	fileName += '.txt';

	var outFile = fullFolderName + '/' + fileName;
	var content = '====== ' + task.title + ' ======' + '\n';
	content += task.title + '\n';
	content += 'Note created (in wunderlist) at: ' + task.created_at + '\n\n';
	content += task.notes + '\n\n';

	dash.each(task.subtasks, function (subtask) {
		if (subtask.completed) {
			content += '[*] ';
		} else {
			content += '[ ] ';
		}
		content += subtask.title + '\n';
	});

	mkdirp(fullFolderName, function (err) {
		fs.writeFile(outFile, content, function (err) {
			if (err) console.log(err, task);
		});
	});

}

dash.each(tasks, function (task) {
	if (exportAllTasks || !task.completed) {
		task.subtasks = dash.filter(subtasks, {'task_id' : task.id});
		task.list = dash.result(dash.find(lists, {'id' : task.list_id}), 'title');
		task.notes = dash.result(dash.find(notes, {'task_id' : task.id}), 'content');
		printTask(task);
	}

});

