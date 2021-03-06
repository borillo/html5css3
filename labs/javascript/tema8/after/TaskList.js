var TaskList = function() {

		var taskList = [];

		this.send = function(task){

			var request = new XMLHttpRequest();
			request.open("POST", 'http://taskspool.herokuapp.com', true);
	
			request.onreadystatechange = function() {
				if (request.readyState === 4 && request.status === 200) {
					console.log(request.responseText);
				}
			};
			
			request.setRequestHeader("Content-Type", "application/json");
			request.send(JSON.stringify({task: task.toObject()}));
		};

		this.add = function(text) {
				var task = new Task(text);
				taskList.push(task);

				this.send(task);

			};

		this.remove = function(text) {
				var selected = -1;

				iterate(function(task, index) {
					if (task.hasText(text)) {
						selected = index;
					}
				});

				taskList.splice(selected, 1);
			};

		this.doTask = function(text) {
				iterate(function(task) {
					if (task.hasText(text)) {
						task.doTask();
					}
				});
			};

		this.doneList = function(text) {
				var doneTasks = [];

				iterate(function(task) {
					if (task.isDone()) {
						doneTasks.push(task);
					}
				});

				return doneTasks;
			};

		this.pendingList = function(text) {
				var pendingTasks = [];

				iterate(function(task) {
					if (!task.isDone()) {
						pendingTasks.push(task);
					}
				});

				return pendingTasks;
			};


		this.allList = function(text) {
				return taskList;
			};

		this.toConsole = function() {
				var textToPrint = '';

				iterate(function(task) {
					textToPrint += task.toString();
				});

				console.log(textToPrint);
			};


		var iterate = function(operation) {
				for (var i = 0; i < taskList.length; i++) {
					operation(taskList[i], i);
				}
			};

	};

var aTaskList = new TaskList();
