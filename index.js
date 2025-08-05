const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const app = express();

const taskRoutes = require('./routes/taskRoutes');

app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use('/', taskRoutes); 

app.listen(3000, () => {
console.log('Server is running on http://localhost:3000');
});