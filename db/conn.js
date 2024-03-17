const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/student_tasks')
.then(()=>console.log('Database connected'))
.catch(()=>console.log('database not connected'))

const taskSchema=new mongoose.Schema({
    name:String,
    time:String,
    duration:String,

})

const courseSchema=new mongoose.Schema({
    name:String,
    field:String,
    batch:String,

})
const Task = mongoose.model('Task', taskSchema);
const Course = mongoose.model('Course', courseSchema);

module.exports = {
    Task,
    Course,
  };

