const input = document.getElementById("task-input");
const addbtn = document.getElementById("add-btn");
const tasklist = document.getElementById("task-list");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();


addbtn.addEventListener("click",()=>{
  const taskText=input.value.trim();
  if(taskText==="") return;

  //(new function add for check pending,compete)
  const existingPending=tasks.find(
    (t)=>t.text.toLowerCase()===taskText.toLowerCase()&& !t.completed
  );

  if(existingPending) 
    {
    alert(`Task "${taskText}" is already in Pending list.`);
    input.value="";
    return;
  }

  tasks.push({ text: taskText, completed: false });

  input.value="";
  saveTasks();
});

//(keybord enter)
input.addEventListener("keydown",(e)=>{
  if(e.key==="Enter")
     addbtn.click();
});

tasklist.addEventListener("click",(e)=>{
  const index=e.target.dataset.index;
  if(index===undefined)
     return; 

  //delete button for delete items
  if (e.target.classList.contains("delete-btn")) {
    tasks.splice(index, 1);
    saveTasks();
  }
  //(completion)
  else if (e.target.classList.contains("text") || e.target.tagName === "LI") {
    if(tasks[index])
        { 
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
    }
  }
});


function renderTasks() {
  tasklist.innerHTML = "";

  tasks.forEach((task,index)=>{
const li=document.createElement("li");
 li.dataset.index=index;
li.className=task.completed ? "completed" : "pending";

 const textSpan=document.createElement("span");
 textSpan.className="text";
textSpan.dataset.index=index;
 textSpan.textContent=task.text;

const status=document.createElement("span");
 status.className="status";
 status.dataset.index=index;
 status.textContent=task.completed ? "Completed" : "Pending";

  const delBtn=document.createElement("button");
  delBtn.textContent="Delete";
    delBtn.className="delete-btn";
    delBtn.dataset.index=index;

    li.appendChild(textSpan);
    li.appendChild(status);
    li.appendChild(delBtn);
    tasklist.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}
