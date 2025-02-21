import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import axios from "axios";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([
    { _id: "1", title: "Task 1", description: "Description for Task 1", category: "To-Do" },
    { _id: "2", title: "Task 2", description: "Description for Task 2", category: "To-Do" },
    { _id: "3", title: "Task 3", description: "Description for Task 3", category: "In Progress" },
    { _id: "4", title: "Task 4", description: "Description for Task 4", category: "Done" }
  ]);
  const categories = ["To-Do", "In Progress", "Done"];

  useEffect(() => {
    axios.get("http://localhost:5000/tasks").then((res) => setTasks(res.data));
  }, []);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    movedTask.category = categories[result.destination.droppableId];
    updatedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(updatedTasks);
    await axios.put(`http://localhost:5000/tasks/${movedTask._id}`, movedTask);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 p-4">
        {categories.map((category, index) => (
          <Droppable key={category} droppableId={String(index)}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-1/3 p-4 bg-gray-100 rounded-md"
              >
                <h2 className="text-xl font-bold mb-2">{category}</h2>
                {tasks
                  .filter((task) => task.category === category)
                  .map((task, idx) => (
                    <Draggable key={task._id} draggableId={task._id} index={idx}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-4 my-2 shadow rounded"
                        >
                          <h3 className="font-semibold">{task.title}</h3>
                          <p className="text-sm text-gray-600">{task.description}</p>
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
  );
};

export default TaskBoard;
