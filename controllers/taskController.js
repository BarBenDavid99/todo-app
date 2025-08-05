const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


//create task
exports.createTask = async (req,res) => {

const task=  await prisma.task.create({
        data:{
            name: req.body.name,
        },
    });
    res.json(task);
};

//get all tasks 
exports.getTasks = async (req,res) => {
const filter = req.query.filter || 'all';

let where = {};
if (filter === 'completed') where = { completed: true };
if (filter === 'not_completed') where = { completed: false };

const tasks = await prisma.task.findMany({
    where,
    orderBy: { createdAt: 'desc' }
});

res.render('index', {title:'Task Manager',tasks, filter });
};

//toggle tasks (completed or not)

exports.toggleCompleted = async (req,res) => {
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
};

//delete task

exports.deleteTask =  async (req, res) => {
const id = Number(req.params.id);

await prisma.task.delete({
    where: { id }
});

res.sendStatus(200);
}


//edit task

exports.editTask = async (req, res) => {
const id = Number(req.params.id);

await prisma.task.update({
    where: { id },
    data: { name: req.body.name }
});

res.sendStatus(200);
}