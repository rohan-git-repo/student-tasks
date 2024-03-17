const express=require('express');
const app=express();
const cors=require('cors')
const port=3600;
app.use(cors());
const { Task, Course } = require('./db/conn'); // Replace with the actual path
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('<h1>WELCOME TO API CREATION </h1> <h2><a href="./getcourse" target="_blank" >Show Courses</a><a href="./getdata" target="_blank" >Show Tasks</a></h2>')
})
app.get('/getdata',async (req,res)=>{
    try{
    const get=await Task.find({});
    res.status(201).send(get)
    }
    catch(e){
        console.log(e);
    }
    try{
        const set=await Course.find({});
        res.status(201).send(set)
        }
        catch(e){
            console.log(e);
        }
    })
app.get('/getcourse',async (req,res)=>{
        try{
        const get=await Course.find({});
        res.status(201).send(get)
        }
        catch(e){
            console.log(e);
        }
        try{
            const set=await Course.find({});
            res.status(201).send(set)
            }
            catch(e){
                console.log(e);
            }
        })

app.post('/tasks', async (req, res) => {
        const { name, time, duration } = req.body;
      
        try {
          const newTask = new Task({ name, time, duration });
          await newTask.save();
      
          res.status(201).json({ message: 'Task added successfully' });
        } catch (error) {
          console.error('Error adding task:', error);
          res.status(500).json({ message: 'Error adding task' });
        }
    });

app.post('/course', async (req, res) => {
        const { name, field, batch } = req.body;
      
        try {
          const newTask = new Course({ name, field, batch });
          await newTask.save();
      
          res.status(201).json({ message: 'Couse added successfully' });
        } catch (error) {
          console.error('Error adding Course:', error);
          res.status(500).json({ message: 'Error adding Course' });
        }
    });

app.delete("/remove/:name", async (req, res) => {
    const name=req.params.name;
    try{
        const del=await Task.findOneAndDelete({name});
        if(!del){
            return res.status(400).json({error:'player not found'});
        }
        res.status(200).json(del);
    }
    catch(e){
        console.log("error ",e);
    }
    });
app.delete("/removeCourse/:name", async (req, res) => {
        const name=req.params.name;
        try{
            const del=await Course.findOneAndDelete({name});
            if(!del){
                return res.status(400).json({error:'player not found'});
            }
            res.status(200).json(del);
        }
        catch(e){
            console.log("error ",e);
        }
        });

app.listen(port,()=>{
        console.log(`Server Running at port number ${port}`);
    })
