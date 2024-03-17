fetch('http://localhost:3600/getdata').
        then((res)=>res.json()).
        then((data)=>{
            console.log('fetched data',data);
            const tablebody=document.getElementById('tablebody');
            tablebody.innerHTML='';
            data.forEach(task => {
               const row = document.createElement('tr');
               row.innerHTML = `
                 <td>${task.name}</td>  <td>${task.time}</td>
                 <td>${task.duration}</td>
                 <td><button onclick="deleteCourse('${task.name}')">Delete</button></td>
               `;
               tablebody.appendChild(row);
            });
        }).
        catch((e)=>console.log(e));


const deleteTask=async (name) =>{
     try{
     const response=await fetch(`http://localhost:3600/remove/${name}`,{
          method: 'DELETE'
     });
     const data=await response.json();
     location.reload();
     }
     catch(e){
          console.log('error',e)
     }
}

const deleteCourse=async (name) =>{
  try{
  const response=await fetch(`http://localhost:3600/removeCourse/${name}`,{
       method: 'DELETE'
  });
  const data=await response.json();
  location.reload();
  }
  catch(e){
       console.log('error',e)
  }
}

fetch('http://localhost:3600/getcourse').
        then((res)=>res.json()).
        then((data)=>{
            console.log('fetched data',data);
            const tablebody=document.getElementById('coursebody');
            tablebody.innerHTML='';
            data.forEach(task => {
               const row = document.createElement('tr');
               row.innerHTML = `
                 <td>${task.name}</td>  <td>${task.field}</td>
                 <td>${task.batch}</td>
                 <td><button onclick="deleteCourse('${task.name}')">Delete</button></td>
               `;
               tablebody.appendChild(row);
            });
        }).
        catch((e)=>console.log(e));

const form = document.getElementById('taskform');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const time = document.getElementById('time').value;
  const duration = document.getElementById('duration').value;

  if (!name || !time || !duration) {
    alert('Please fill in all required fields.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3600/tasks', {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, time, duration })
    });

    if (!response.ok) {
      throw new Error(`Error adding task: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Task added successfully:', data);

    form.reset();
    location.reload();
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while adding the task.');
  }
});

const form2 = document.getElementById('courseform');

form2.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('cname').value;
  const field = document.getElementById('degree').value;
  const batch = document.getElementById('batch').value;

  if (!name || !field || !batch) {
    alert('Please fill in all required fields.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3600/course', {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, field, batch })
    });

    if (!response.ok) {
      throw new Error(`Error adding task: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Task added successfully:', data);

    form.reset();
    location.reload();
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while adding the task.');
  }
});
