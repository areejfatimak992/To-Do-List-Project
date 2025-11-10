const input=document.getElementById("task-input");
const addbtn=document.getElementById("add-btn");
const tasklist=document.getElementById("task-list");
//local storage pr store kr rha hai task 


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();//purany task dekhata hai

//(add new task in to do list 
//input task,value=text write,trim =remove space)


addbtn.addEventListener("click",()=>{
    const tasktext=input.value.trim();

//agr kuch input na kry 
if (tasktext === "")
     return;
    //obj add in taskss

tasks.push({ text: tasktext, completed: false });
input.value = "";//clear input for again text add

 saveTasks();
});

//add event listner on tasklist logic
tasklist.addEventListener("click",(e)=>{

 if(e.target.tagName==="LI")
 {
  const  index=e.target.dataset.index;
  tasks[index].completed=!tasks[index].completed;
 saveTasks();
 }
    else if(e.target.tagName==="BUTTON")
    {
    const index=e.target.dataset.index;
    tasks.splice(index, 1);//splice replace index
    
    saveTasks();
  }
});

//show task on screen
function renderTasks() {
    debugger
  tasklist.innerHTML = ""; // Purani list clear karo

  tasks.forEach((task, index) => {   // 👈 yahan "task" likho, "tasks" nahi
    const li = document.createElement("li"); // Naya list item banao
    li.textContent = task.text;              // Task ka naam dikhhao
    li.dataset.index = index;                // Index store karo

    // Agar task completed hai to uspar style lagao
    if (task.completed) {                    // 👈 correct variable name
      li.classList.add("completed");
    }

    // LI ko UL ke andar rakho
    tasklist.appendChild(li);
  });
}


function saveTasks() {
  
  localStorage.setItem("tasks", JSON.stringify(tasks));
   renderTasks();
}
