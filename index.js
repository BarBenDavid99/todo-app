const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

//without filter
// app.get('/', async (req, res) =>{
//     const tasks = await prisma.task.findMany({
//         orderBy: {createdAt: 'desc'}
//     });

//     res.render('index', {tasks});
// })

app.get('/', async (req, res) => {
  const filter = req.query.filter || 'all';

  let where = {};
  if (filter === 'completed') where = { completed: true };
  if (filter === 'not_completed') where = { completed: false };

  const tasks = await prisma.task.findMany({
    where,
    orderBy: { createdAt: 'desc' }
  });

  res.render('index', { tasks, filter });
});

app.get('/test-db', async (req, res) => {
const tasks = await prisma.task.findMany();
res.json(tasks);
});

app.post('/tasks',async (req,res)=> {
    await prisma.task.create({
        data:{
            name: req.body.name
        }
    });
    res.sendStatus(200);
})

app.post('/tasks/:id/toggle', async (req,res) => {
    const id = Number(req.params.id);

    const task = await prisma.task.findUnique({
        where: { id }
    });

    if(task){
        await prisma.task.update({
            where: {id},
            data: {completed: !task.completed}
        });
    }

    res.sendStatus(200);
})

app.delete('/tasks/:id', async (req, res) => {
  const id = Number(req.params.id);

  await prisma.task.delete({
    where: { id }
  });

  res.sendStatus(200);
});

app.put('/tasks/:id', async (req, res) => {
  const id = Number(req.params.id);

  await prisma.task.update({
    where: { id },
    data: { name: req.body.name }
  });

  res.sendStatus(200);
});

//run server
app.listen(3000, ()=>{
    console.log('Server is running on http://localhost:3000');
});


