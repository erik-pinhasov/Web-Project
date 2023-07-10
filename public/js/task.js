// Post request for finish an active task
// On success the task will move to Completed tasks page
function doneClicked(taskid) {
  fetch("/tasks/done", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: taskid }),
  })
    .then((response) => {
      if (response.ok) {
        $(`.accordion-item-${taskid}`).remove();
        $.cookie("badges", "false");
      } else {
        alert("There was an error when trying to finish a task");
      }
    })
    .catch((error) => {
      alert("Error when trying to POST request");
    });
}

// Post request for delete a task
// On success the task will be removed
function deleteClicked(taskid) {
  fetch("/tasks/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: taskid }),
  })
    .then((response) => {
      if (response.ok) {
        $(`.accordion-item-${taskid}`).remove();
        $.cookie("badges", "false");
      } else {
        alert("There was an error when trying to delete");
      }
    })
    .catch((error) => {
      alert("Error when trying to DELETE request");
    });
}
