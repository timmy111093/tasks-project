const tasks_key = 'tasks';
let variableId = 0;
loadTasks();
// get the task details
function getTask(){
      const theTask = document.getElementById('taskBox').value;
      const date = document.getElementById('dateBox').value;
      const hour = document.getElementById('hourBox').value;
      const id = (variableId += 1);
      return {theTask,date,hour,id};
}
// push task object to array
function tasksArr(tasks){
      const task = getTask();
      tasks.push(task);
      return tasks;
}
//get array from storage
function gerArrFromStorage(){
      const str = localStorage.getItem(tasks_key);
      const strArr = str === null ? [] : JSON.parse(str);
      return strArr;
}
//saving array to storage
function saveToStorage(tasks){
      const str = JSON.stringify(tasks);
      localStorage.setItem(tasks_key,str);
}
// create note
function addTask(tasks){
      taskContainer.innerHTML = "";
      for(const obj of tasks){
            const note = `
            <div id="${obj.id}" class="card border-success mb-3 fadeIn" style="max-width: 18rem;">
            <span class="card-header bg-transparent border-success">Task:
            <button onclick="removeTask(this.parentNode.parentNode)" class="btn btn-danger"><i class="bi bi-file-earmark-x-fill"></i></button></span>
            <div class="card-body text-secondary">
              <p class="card-text">${obj.theTask}</p>
            </div>
            <div class="card-footer bg-transparent border-success">Date: 
            ${obj.date}<br>Hour: 
            ${obj.hour}</div>
          </div>
            `;
            taskContainer.innerHTML += note;
      }
}
// add note to the page
function addNote(){
      const isValid = vaildate();
      if(!isValid) return;

      getTask();
      const tasks = gerArrFromStorage();
      tasksArr(tasks);
      addTask(tasks);
      saveToStorage(tasks);
      clearForm();
}
// clear the form values
function clearForm(){
      taskBox.value = "";
      dateBox.value = "";
      hourBox.value = "";
      taskBox.focus();
}
//validation
function vaildate(){
      if(taskBox.value === ""){
            alert('Please Enter A Task...');
            taskBox.style.backgroundColor = 'cyan';
            return false;
      }
      if(dateBox.value === ""){
            alert('Please Enter A Date...');
            dateBox.style.backgroundColor = 'cyan';
            return false;  
      }
      if(hourBox.value === ""){
            alert('Please Enter An Hour...');
            hourBox.style.backgroundColor = 'cyan';
            return false;
      }
      taskBox.style.backgroundColor = '';
      dateBox.style.backgroundColor = '';
      hourBox.style.backgroundColor = '';
      return true;
}
// remove task from page & array
function removeTask(element){
      const tasks = gerArrFromStorage();
      for(let i = 0; i < tasks.length; i++){
            if(element.id == tasks[i].id){
               tasks.splice(i,1);
               saveToStorage(tasks);
            }
         addTask(tasks);
      }
}
// display the active tasks
function loadTasks(){
      const tasks = gerArrFromStorage();
      addTask(tasks);
}