import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const TaskManage = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get("https://job-task-server-pied.vercel.app/tasks");
            setTasks(response.data);
        } catch (error) {
            toast.error("Failed to fetch tasks");
            console.error("Error fetching tasks:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://job-task-server-pied.vercel.app/tasks/${id}`);
            setTasks(tasks.filter(task => task._id !== id));
            toast.success("Task deleted successfully");
        } catch (error) {
            toast.error("Failed to delete task");
            console.error("Error deleting task:", error);
        }
    };

    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const updatedTasks = Array.from(tasks);
        const [movedTask] = updatedTasks.splice(result.source.index, 1);
        movedTask.category = result.destination.droppableId;
        updatedTasks.splice(result.destination.index, 0, movedTask);

        setTasks(updatedTasks);
        
        try {
            await axios.put(`https://job-task-server-pied.vercel.app/tasks/${movedTask._id}`, { category: movedTask.category });
        } catch (error) {
            toast.error("Failed to update task category");
            console.error("Error updating task:", error);
        }
    };

    return (
        <div>
            <header>
                 <Navbar></Navbar>
            </header>

            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-semibold mb-4">Task Manager</h2>
            <button onClick={() => navigate("/add-task")} className="btn btn-primary mb-4">Add Task</button>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-3 gap-4">
                    {["To-Do", "In Progress", "Done"].map((category) => (
                        <Droppable key={category} droppableId={category}>
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps} className="p-4 bg-gray-100 rounded-lg">
                                    <h3 className="text-lg font-bold mb-2">{category}</h3>
                                    {tasks.filter(task => task.category === category).map((task, index) => (
                                        <Draggable key={task._id} draggableId={task._id} index={index}>
                                            {(provided) => (
                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="p-3 bg-white shadow-md rounded mb-2">
                                                    <h4 className="font-semibold">{task.title}</h4>
                                                    <p className="text-sm text-gray-600">{task.description}</p>
                                                    <button onClick={() => handleDelete(task._id)} className="btn btn-sm btn-error mt-2">Delete</button>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>

            <footer>
                <Footer></Footer>
            </footer>
            
        </div>
    );
};

export default TaskManage;
