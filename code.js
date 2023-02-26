let pendingTask;
let pendingTaskDueDate;
let completedTask;
let completedTaskDueDate;
let completedTaskDate;

function pullData() {
  localStorage.getItem("localPendingTask")
    ? (pendingTask = JSON.parse(localStorage.getItem("localPendingTask")))
    : (pendingTask = []);

  localStorage.getItem("localPendingTaskDueDate")
    ? (pendingTaskDueDate = JSON.parse(
        localStorage.getItem("localPendingTaskDueDate")
      ))
    : (pendingTaskDueDate = []);

  localStorage.getItem("localCompletedTask")
    ? (completedTask = JSON.parse(localStorage.getItem("localCompletedTask")))
    : (completedTask = []);

  localStorage.getItem("localCompletedTaskDueDate")
    ? (completedTaskDueDate = JSON.parse(
        localStorage.getItem("localCompletedTaskDueDate")
      ))
    : (completedTaskDueDate = []);

  localStorage.getItem("localCompletedTaskDate")
    ? (completedTaskDate = JSON.parse(
        localStorage.getItem("localCompletedTaskDate")
      ))
    : (completedTaskDate = []);
  refreshLists();
}

function pushData() {
  localStorage.clear();
  localStorage.setItem("localPendingTask", JSON.stringify(pendingTask));
  localStorage.setItem(
    "localPendingTaskDueDate",
    JSON.stringify(pendingTaskDueDate)
  );
  localStorage.setItem("localCompletedTask", JSON.stringify(completedTask));
  localStorage.setItem(
    "localCompletedTaskDueDate",
    JSON.stringify(completedTaskDueDate)
  );
  localStorage.setItem(
    "localCompletedTaskDate",
    JSON.stringify(completedTaskDate)
  );
  refreshLists();
}

function refreshLists() {
  ul = document.getElementById("pending-task");
  while (ul.lastChild) {
    ul.removeChild(ul.lastChild);
  }

  ul = document.getElementById("pending-task-due-date");
  while (ul.lastChild) {
    ul.removeChild(ul.lastChild);
  }

  ul = document.getElementById("mark-complete");
  while (ul.lastChild) {
    ul.removeChild(ul.lastChild);
  }

  for (i = 0; i < pendingTask.length; i++) {
    let newTask = document.createElement("li");
    newTask.appendChild(document.createTextNode(pendingTask[i]));
    document.getElementById("pending-task").appendChild(newTask);

    let newTaskDate = document.createElement("li");
    newTaskDate.appendChild(document.createTextNode(pendingTaskDueDate[i]));
    document.getElementById("pending-task-due-date").appendChild(newTaskDate);

    let markComplete = document.createElement("li");
    markComplete.appendChild(document.createTextNode("\u2705"));
    markComplete.className = "mark-complete-check";
    markComplete.id = i;
    document.getElementById("mark-complete").appendChild(markComplete);
  }

  let items = document.getElementsByClassName("mark-complete-check");
  for (let i = 0; i < items.length; i++) {
    let itemId = items[i].id;
    items[i].addEventListener("click", function () {
      markCompleted(itemId);
    });
  }

  ul = document.getElementById("completed-tasks");
  while (ul.lastChild) {
    ul.removeChild(ul.lastChild);
  }

  ul = document.getElementById("original-due-date");
  while (ul.lastChild) {
    ul.removeChild(ul.lastChild);
  }

  ul = document.getElementById("completed-date");
  while (ul.lastChild) {
    ul.removeChild(ul.lastChild);
  }

  for (i = 0; i < completedTask.length; i++) {
    let newCompletedTask = document.createElement("li");
    newCompletedTask.appendChild(document.createTextNode(completedTask[i]));
    document.getElementById("completed-tasks").appendChild(newCompletedTask);

    let newOriginalDueDate = document.createElement("li");
    newOriginalDueDate.appendChild(
      document.createTextNode(completedTaskDueDate[i])
    );
    document
      .getElementById("original-due-date")
      .appendChild(newOriginalDueDate);

    let newCompletedDate = document.createElement("li");
    newCompletedDate.appendChild(document.createTextNode(completedTaskDate[i]));
    document.getElementById("completed-date").appendChild(newCompletedDate);
  }
}

document.getElementById("add-task").addEventListener("click", function () {
  if (
    document.getElementById("new-task").value == "" ||
    document.getElementById("due-date").value == ""
  ) {
    alert("Enter a task and date to add");
  } else {
    pendingTask.push(document.getElementById("new-task").value);
    document.getElementById("new-task").value = "";
    pendingTaskDueDate.push(document.getElementById("due-date").value);
    document.getElementById("due-date").value = "";
  }

  pushData();
});

document
  .getElementById("clear-completed")
  .addEventListener("click", function () {
    completedTask = [];
    completedTaskDate = [];
    completedTaskDueDate = [];
    pushData();
    refreshLists();
  });

document.getElementById("clear-all").addEventListener("click", function () {
  pendingTask = [];
  pendingTaskDueDate = [];
  completedTask = [];
  completedTaskDate = [];
  completedTaskDueDate = [];
  pushData();
  refreshLists();
});

function markCompleted(completedItemId) {
  let today = new Date();
  let month =
    today.getMonth() + 1 < 10
      ? "0" + (today.getMonth() + 1)
      : today.getMonth() + 1;
  let date = today.getFullYear() + "-" + month + "-" + today.getDate();
  completedTask.push(pendingTask[completedItemId]);
  completedTaskDueDate.push(pendingTaskDueDate[completedItemId]);
  completedTaskDate.push(date);
  pendingTask.splice(completedItemId, 1);
  pendingTaskDueDate.splice(completedItemId, 1);
  pushData();
  refreshLists();
}

pullData();
refreshLists();
