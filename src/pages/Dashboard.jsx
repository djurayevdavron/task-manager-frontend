import {useEffect,useState,} from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import TaskModal from "../components/TaskModal";
import TaskCard from "../components/TaskCard";

function Dashboard() {
  const [tasks, setTasks] =
    useState([]);
  const [loading, setLoading] =
    useState(true);
  const [showModal, setShowModal] =
    useState(false);
  const [selectedTask, setSelectedTask] =
    useState(null);
  useEffect(() => {
    fetchTasks();
  }, []);
  const fetchTasks =async () => {
      try {
        const response =await api.get("/tasks");
        setTasks(response.data.data);
      } catch (error){
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
  const todoTasks = tasks.filter((task) =>task.status ==="TODO");
  const inProgressTasks =tasks.filter((task) => task.status ==="IN_PROGRESS");
  const doneTasks =tasks.filter((task) =>task.status === "DONE");
  if (loading) {
    return (
      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        text-2xl
        font-bold
      "
      >
        Loading...
      </div>
    );
  }
  return (
    <div
      className="
      relative
      min-h-screen
      overflow-hidden
      bg-gradient-to-br
      from-[#f8fafc]
      to-[#eef2ff]
    "
    >
      <Navbar />
      <div
        className="
        p-6
      "
      >
        <button
          onClick={() => {setSelectedTask(null);
            setShowModal(true);}}
          className="
          bg-gradient-to-r
          from-[#c79b68]
          to-[#a97b50]
          hover:from-[#a97b50]
          hover:to-[#8a623d]
          text-white
          px-6
          py-3
          rounded-2xl
          font-semibold
          shadow-lg
          transition-all
          duration-500
          cursor-pointer
          hover:scale-105
          mb-6
        "
        >
          Add Task
        </button>
        {
          showModal && (
            <TaskModal
              fetchTasks={
                fetchTasks
              }
              closeModal={() =>
                setShowModal(false)
              }
              selectedTask={
                selectedTask
              }
            />
          )
        }

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
        "
        >
          {/* TODO qismi */}
          <div
            className="
            bg-gray-200/90
            backdrop-blur-sm
            p-4
            rounded-3xl
            shadow-xl
            hover:-translate-y-1
            transition-all
            duration-300
          "
          >
            <h2
              className="
              text-xl
              font-bold
              mb-4
            "
            >
              TODO (Hali boshlanmagan)
            </h2>

            {todoTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    fetchTasks={
                      fetchTasks
                    }
                    setSelectedTask={
                      setSelectedTask
                    }
                    setShowModal={
                      setShowModal
                    }
                  />
                )
              )
            }
          </div>

          {/* IN_PROGRESS qismi */}
          <div
            className="
            bg-blue-200/90
            backdrop-blur-sm
            p-4
            rounded-3xl
            shadow-xl
            hover:-translate-y-1
            transition-all
            duration-300
          "
          >
            <h2
              className="
              text-xl
              font-bold
              mb-4
            "
            >
              IN PROGRESS (Jarayonda)
            </h2>
            {inProgressTasks.map((task) => (
                  <TaskCard
                    key={
                      task._id
                    }
                    task={task}
                    fetchTasks={
                      fetchTasks
                    }
                    setSelectedTask={
                      setSelectedTask
                    }
                    setShowModal={
                      setShowModal
                    }
                  />
                )
              )
            }

          </div>

          {/* DONE qismi */}
          <div
            className="
            bg-green-200/90
            backdrop-blur-sm
            p-4
            rounded-3xl
            shadow-xl
            hover:-translate-y-1
            transition-all
            duration-300
          "
          >
            <h2
              className="
              text-xl
              font-bold
              mb-4
            "
            >
              DONE (Tugatilgan)
            </h2>
            {doneTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    fetchTasks={
                      fetchTasks
                    }
                    setSelectedTask={
                      setSelectedTask
                    }
                    setShowModal={
                      setShowModal
                    }
                  />
                )
              )
            }
          </div>
        </div>
      </div>
      <img
        src="/images/Work time-amico.svg"
        alt="dashboard-bg"
        className="
        absolute
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-1/2
        w-[700px]
        opacity-[0.05]
        pointer-events-none
        select-none
      "
      />
    </div>
  );
}
export default Dashboard;