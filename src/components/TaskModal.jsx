import {useState,} from "react";
import api from "../api/axios";

function TaskModal({
  fetchTasks,
  closeModal,
  selectedTask,
}) {
  const [formData, setFormData]=
    useState({
      title:
        selectedTask?.title || "",
      description:
        selectedTask?.description || "",
      priority:
        selectedTask?.priority || "LOW",
      dueDate:
        selectedTask?.dueDate
          ?.split("T")[0] || "",
    });
  const [loading, setLoading] =useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };
  const handleSubmit =async (e) => {e.preventDefault();
      // VALIDATION qismi

      if (
        !formData.title.trim()
      ) {
        alert(
          "Task title kiritilishi kerak"
        );
        return;
      }
      if (
        !formData.description.trim()
      ) {
        alert(
          "Description kiritilishi kerak"
        );
        return;
      }
      if (
        !formData.dueDate
      ) {
        alert(
          "Due date tanlanishi kerak"
        );
        return;
      }
      try {setLoading(true);
        if (selectedTask) {
          await api.put(
            `/tasks/${selectedTask._id}`,
            formData
          );
          alert(
            "Task muvaffaqiyatli yangilandi"
          );
        } else {
          await api.post(
            "/tasks",
            formData
          );
          alert(
            "Task muvaffaqiyatli yaratildi"
          );
        }
        fetchTasks();
        closeModal();
      } catch (error) {
        alert(
          error.response?.data?.message ||
          "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };
  return (
    <div
      className="
      fixed
      inset-0
      z-50
      bg-black/40
      flex
      items-center
      justify-center
      p-4
    "
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        className="
        w-full
        max-w-lg
        bg-[#020B2D]
        rounded-[32px]
        shadow-2xl
        border
        border-white/10
        p-5
        md:p-7
      "
      >
        {/* TOP qismi */}
        <div
          className="
          flex
          items-center
          justify-between
          mb-6
        "
        >
          <h2
            className="
            text-3xl
            font-bold
            text-white
          "
          >
            {selectedTask? "Edit Task": "Create Task"}
          </h2>
          <button
            type="button"
            onClick={closeModal}
            className="
            text-gray-400
            hover:text-rose-400
            text-3xl
            transition
          "
          >
            ×
          </button>
        </div>

        {/* TITLE qismi*/}
        <div
          className="
          mb-4
        "
        >
          <label
            className="
            block
            text-sm
            font-medium
            text-gray-300
            mb-2
          "
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Task title"
            value={formData.title}
            onChange={handleChange}
            className="
            w-full
            bg-[#07143F]
            border
            border-white/10
            text-white
            placeholder:text-gray-400
            p-4
            rounded-2xl
            outline-none
            focus:border-emerald-400
            transition
          "
          />

        </div>

        {/* DESCRIPTION qismi */}
        <div
          className="
          mb-4
        "
        >
          <label
            className="
            block
            text-sm
            font-medium
            text-gray-300
            mb-2
          "
          >
            Description
          </label>
          <textarea
            name="description"
            placeholder="Task description"
            value={
              formData.description
            }
            onChange={handleChange}
            rows="4"
            className="
            w-full
            bg-[#07143F]
            border
            border-white/10
            text-white
            placeholder:text-gray-400
            p-4
            rounded-2xl
            outline-none
            resize-none
            focus:border-emerald-400
            transition
          "
          />

        </div>

        {/* PRIORITY qismi */}
        <div
          className="
          mb-4
        "
        >
          <label
            className="
            block
            text-sm
            font-medium
            text-gray-300
            mb-2
          "
          >
            Priority
          </label>
          <select
            name="priority"
            value={
              formData.priority
            }
            onChange={handleChange}
            className="
            w-full
            bg-[#07143F]
            border
            border-white/10
            text-white
            p-4
            rounded-2xl
            outline-none
            focus:border-emerald-400
            transition
          "
          >
            <option value="LOW">
              LOW
            </option>
            <option value="MEDIUM">
              MEDIUM
            </option>
            <option value="HIGH">
              HIGH
            </option>
          </select>
        </div>
        {/* DATE/Sana qismi */}
        <div
          className="
          mb-6
        "
        >
          <label
            className="
            block
            text-sm
            font-medium
            text-gray-300
            mb-2
          "
          >
            Due Date
          </label>
          <input
            type="date"
            name="dueDate"
            value={
              formData.dueDate
            }
            onChange={handleChange}
            className="
            w-full
            bg-[#07143F]
            border
            border-white/10
            text-white
            p-4
            rounded-2xl
            outline-none
            focus:border-emerald-400
            transition
          "
          />
        </div>
        {/* BUTTONS /Buttonlar*/}
        <div
          className="
          flex
          flex-col
          sm:flex-row
          gap-3
        "
        >
          <button
            type="submit"
            disabled={loading}
            className="
            flex-1
            bg-emerald-500
            hover:bg-emerald-800
            text-white
            py-3
            rounded-2xl
            duration-500
            font-semibold
            cursor-pointer
            transition
          "
          >
            {loading ? "Loading...": selectedTask? "Update Task": "Create Task"}
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="
            flex-1
            bg-[#07143F]
            hover:bg-[#0b1d57]
            border
            border-white/10
            text-white
            py-3
            rounded-2xl
            font-semibold
            cursor-pointer
            duration-500
            transition
          "
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
export default TaskModal;