const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const taskController = require('./controllers/taskController');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

//run server
app.listen(3000, ()=>{
    console.log('Server is running on http://localhost:3000');
});

app.post('/tasks',taskController.createTask);

app.get('/', taskController.getTasks);

app.post('/tasks/:id/toggle', taskController.toggleCompleted);

app.delete('/tasks/:id',taskController.deleteTask);

app.put('/tasks/:id', taskController.editTask);



