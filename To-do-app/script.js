document.addEventListener('DOMContentLoaded',()=>{
    const todoInput = document.querySelector("#todo-input");
    const todoList = document.querySelector("#todo-list");
    const addTask = document.querySelector(".add-task-btn");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task) => {
        renderTask(task);
    });

    addTask.addEventListener("click", () => {
      const taskText = todoInput.value.trim();
      if (taskText === "") return;

      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
      };

      tasks.push(newTask);
      savingTask();
      todoInput.value = "";
      console.log(tasks);
    });

    function renderTask(task) {
        const list  = document.createElement('li');
        list.setAttribute('data-id',task.id);
        list.innerHTML = `
        <span>${task.text}</span>
        <button>delete</button>
        `;
        todoList.appendChild(list);
    }

    function savingTask() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
})