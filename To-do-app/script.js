document.addEventListener("DOMContentLoaded", () => {
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
    renderTask(newTask);
    todoInput.value = "";
    console.log(tasks);
  });

  function renderTask(task) {
    const list = document.createElement("li");
    list.setAttribute("data-id", task.id);
    list.innerHTML = `
        <span>${task.text}</span>
        <button>delete</button>
        `;

    list.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      list.classList.toggle("completed");
      savingTask();
    });

    list.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      list.remove();
      savingTask();
    });

    todoList.appendChild(list);
  }

  function savingTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  const searchBar = document.querySelector("#search-bar");

  searchBar.addEventListener("input", () => {
    const keyword = searchBar.value.toLowerCase();
    document.querySelectorAll("#todo-list li").forEach((task) => {
      const taskText = task.querySelector("span").textContent.toLowerCase();
      task.style.display = taskText.includes(keyword) ? "flex" : "none";
    });
    
  });


});
