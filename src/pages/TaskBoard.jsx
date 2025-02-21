import  { useState, useEffect } from "react";
// import { useDrag, useDrop } from "react-dnd";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider"; 

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const { userToken } = AuthContext(); // Assuming token is fetched from context or state
  
  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/tasks", {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    
    fetchTasks();
  }, [userToken]);

  // Handle task updates (drag and drop, edits)
  const handleUpdateTask = async (taskId, updatedTask) => {
    try {
      await axios.put(`/tasks/${taskId}`, updatedTask, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, ...updatedTask } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Add task handler
  const handleAddTask = async (newTask) => {
    try {
      const response = await axios.post("/tasks", newTask, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Drag-and-drop handling
  const moveTask = (draggedId, targetCategory) => {
    const draggedTask = tasks.find((task) => task._id === draggedId);
    if (draggedTask && draggedTask.category !== targetCategory) {
      handleUpdateTask(draggedId, { category: targetCategory });
    }
  };

  const renderTask = (task) => (
    <div key={task._id} className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
      <button onClick={() => handleUpdateTask(task._id, { title: "Updated Title" })}>
        Edit
      </button>
    </div>
  );

  // Categorize tasks by their category (To-Do, In Progress, Done)
  const categorizeTasks = (category) =>
    tasks.filter((task) => task.category === category).map(renderTask);

  return (
    <div className="task-board">
      <header>
        <Navbar />
      </header>
      <main className="task-categories">
        <div className="task-category">
          <h2>To-Do</h2>
          <div
            className="task-list"
            onDrop={(e) => moveTask(e.dataTransfer.getData("taskId"), "To-Do")}
            onDragOver={(e) => e.preventDefault()}
          >
            {categorizeTasks("To-Do")}
          </div>
        </div>
        <div className="task-category">
          <h2>In Progress</h2>
          <div
            className="task-list"
            onDrop={(e) => moveTask(e.dataTransfer.getData("taskId"), "In Progress")}
            onDragOver={(e) => e.preventDefault()}
          >
            {categorizeTasks("In Progress")}
          </div>
        </div>
        <div className="task-category">
          <h2>Done</h2>
          <div
            className="task-list"
            onDrop={(e) => moveTask(e.dataTransfer.getData("taskId"), "Done")}
            onDragOver={(e) => e.preventDefault()}
          >
            {categorizeTasks("Done")}
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default TaskBoard;
