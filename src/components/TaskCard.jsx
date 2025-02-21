

const TaskCard = ({ task, onUpdate, onDelete }) => {
    return (
      <div className="task-card">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <button onClick={() => onDelete(task._id)}>Delete</button>
        <button
          onClick={() =>
            onUpdate(task._id, {
              title: "Updated Title", // Update this based on input from user
            })
          }
        >
          Update
        </button>
      </div>
    );
  };
  