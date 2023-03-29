//Importing all the necessary files and frameworks
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

//Connecting Mongodb
mongoose.connect('mongodb://127.0.0.1:27017/react-todo', {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(() => console.log("Connected to MongoDB")).catch(console.error);


// Models
const Todo = require('./models/Todo');

//Getting the tasks
app.get('/todos', async (req, res) => {
	const todos = await Todo.find();

	res.json(todos);
});

//Posting the tasks
app.post('/todo/new', (req, res) => {
	const todo = new Todo({
		text: req.body.text
	})

	todo.save();
	res.json(todo);
});

//Deleting the tasks
app.delete('/todo/delete/:id', async (req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id);

	res.json({result});
});

//Switching the task to complete or incomplete
app.get('/todo/complete/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.complete = !todo.complete;
	todo.save();
	res.json(todo);
})

//Deleting the tasks
app.put('/todo/update/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.text = req.body.text;
	todo.save();
	res.json(todo);
});

//Connecting with port 3001
app.listen(3001, ()=> console.log("Server connected"));