import React from "react";

function TodoList({ tasks, toggleTask, deleteTask }) {
  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="todo-list">

      <div className="active-section">
        <h3>Active Tasks</h3>
        {activeTasks.length === 0 && <p>No active tasks</p>}

        {activeTasks.map(task => (
          <div key={task.id} className="task-card">
            <div>
              <strong>{task.title}</strong>
              {task.time && <span> ⏰ {task.time}</span>}
            </div>

            <div className="actions">
              <button onClick={() => toggleTask(task.id)}>
                Complete
              </button>
              <button onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="completed-section">
        <h3>Completed Tasks</h3>
        {completedTasks.length === 0 && <p>No completed tasks</p>}

        {completedTasks.map(task => (
          <div key={task.id} className="task-card completed">
            <div>
              <strong>{task.title}</strong>
              {task.time && <span> ⏰ {task.time}</span>}
            </div>

            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default TodoList;