import React, { useState, useEffect } from "react";
import "./App.css";
import TodoInput from "./Components/TodoInput";
import TodoList from "./Components/TodoList";

function App() {
  const [tasks, setTasks] = useState([]);

  // ADD TASK
  const addTask = (title, time) => {
    if (!title.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      title,
      time,
      completed: false,
      notified: false,
    };

    setTasks(prev => [...prev, newTask]);
  };

  // TOGGLE TASK
  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // DELETE TASK
  const deleteTask = (id) => {
    setTasks(prev =>
      prev.filter(task => task.id !== id)
    );
  };

  // REMINDER EFFECT
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime =
        now.getHours().toString().padStart(2, "0") +
        ":" +
        now.getMinutes().toString().padStart(2, "0");

      setTasks(prev =>
        prev.map(task => {
          if (
            task.time === currentTime &&
            !task.completed &&
            !task.notified
          ) {
            alert(`Reminder: ${task.title}`);
            return { ...task, notified: true };
          }
          return task;
        })
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // LOAD FROM LOCAL STORAGE
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  // SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <h1 className="app-title">My Tasks</h1>
      <p className="app-subtitle">Stay organized, get things done</p>
      <TodoInput addTask={addTask} />
      <TodoList
        tasks={tasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />
    </>
  );
}

export default App;

