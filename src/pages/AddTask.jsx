import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AddTask = () => {
    const navigate = useNavigate();
    const [task, setTask] = useState({
        title: "",
        description: "",
        category: "To-Do",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!task.title.trim()) {
            return toast.error("Title is required");
        }
        if (task.title.length > 50) {
            return toast.error("Title must be under 50 characters");
        }
        if (task.description.length > 200) {
            return toast.error("Description must be under 200 characters");
        }

        try {
            const response = await axios.post("https://job-task-server-pied.vercel.app/tasks", task);
            if (response.data.insertedId) {
                toast.success("Task added successfully");
                navigate("/tasks");
            }
        } catch (error) {
            toast.error("Failed to add task");
            console.error("Error adding task:", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">

                <header>
                  <Navbar></Navbar>
                </header>
            <h2 className="text-2xl font-semibold mb-4">Add a New Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        required
                        maxLength="50"
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Description</label>
                    <textarea
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        maxLength="200"
                        className="textarea textarea-bordered w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Category</label>
                    <select
                        name="category"
                        value={task.category}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                    >
                        <option value="To-Do">To-Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-full">Add Task</button>
            </form>


            <footer>
              <Footer></Footer>
            </footer>
        </div>
    );
};

export default AddTask;
