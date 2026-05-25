import api from "../api/axios";

function TaskCard({
  task,
  fetchTasks,
  setSelectedTask,
  setShowModal,
}) {
  const handleDelete = async () => {
      const confirmDelete =confirm("Taskni o'chirmoqchimisiz?");
      if (!confirmDelete)
        return;
      try {
        await api.delete(
          `/tasks/${task._id}`
        );
        fetchTasks();
      } catch (error) {
        console.log(error);
      }
    };
  const handleStatusChange =
    async () => {
      let newStatus ="TODO";
      if (
        task.status ==="TODO") {
        newStatus ="IN_PROGRESS";
      } else if (
        task.status ==="IN_PROGRESS") {
        newStatus ="DONE"; 
      }
      try {
        await api.patch(
          `/tasks/${task._id}/status`,
          {
            status:
              newStatus,
          }
        );
        fetchTasks();
      } catch (error) {
        console.log(error);
      }
    };

  const priorityColor = task.priority === "HIGH"? "bg-red-500": task.priority ==="MEDIUM"? "bg-yellow-500":"bg-green-500";
  return (
    <div
      className="
      bg-white
      p-4
      rounded-xl
      mb-4
      shadow
    "
    >
      <div
        className="
        flex
        items-center
        justify-between
        mb-2
      "
      >
        <h3
          className="
          font-bold
          text-lg
        "
        >
          {task.title}
        </h3>
        <span
          className={`
            text-white
            px-2
            py-1
            rounded
            text-sm
            ${priorityColor}
          `}
        >
          {task.priority}
        </span>
      </div>
      {
        task.description && (
          <p
            className="
            text-gray-600
            mb-3
          "
          >
            {
              task.description
            }
          </p>
        )
      }
      {
        task.dueDate && (
          <p
            className="
            text-sm
            text-gray-500
            mb-4
          "
          >
            Due:
            {" "}
            {new Date(task.dueDate).toLocaleDateString()}
              
          </p>
        )
      }
      <div
        className="
        flex
        gap-2
      "
      >
        {
          task.status !=="DONE" && (
            <button
              onClick={ handleStatusChange}
              className="
              flex-1
              bg-blue-500
              hover:bg-blue-800
              duration-500
              cursor-pointer
              text-white
              p-2
              rounded-lg
            "
            >
              Next Status
            </button>
          )
        }
        <button
          onClick={() => {setSelectedTask(task);
            setShowModal(true);
          }}
          className="
          flex-1
          bg-yellow-500
          hover:bg-yellow-800
          text-white
          p-2
          rounded-lg
          cursor-pointer
          duration-500
        "
        >
          Edit
        </button>
        <button
          onClick={
            handleDelete
          }
          className="
          flex-1
          bg-red-500
          hover:bg-red-800
          duration-500
          cursor-pointer
          text-white
          p-2
          rounded-lg
        "
        >
          Delete
        </button>
      </div>
    </div>
  );
}
export default TaskCard;