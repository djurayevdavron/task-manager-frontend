import {useEffect,useState,} from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function Users() {
  const [users, setUsers] =useState([]);
  const [loading, setLoading] =useState(true);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
      try {
        const response =
          await api.get(
            "/users"
          );
        setUsers(
          response.data.data
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
  const handleDelete =async (id) => {
      const confirmDelete =
        confirm(
          "Userni o'chirmoqchimisiz?"
        );
      if (!confirmDelete)
        return;
      try {
        await api.delete(
          `/users/${id}`
        );
        fetchUsers();
      } catch (error) {
        console.log(error);
      }
    };
  if (loading) {
    return (
      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-[#eef2ff]
        text-2xl
        font-semibold
        text-[#111827]
      "
      >
        Loading...
      </div>
    );
  }
  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-[#eef2ff]
      via-[#f8fafc]
      to-[#dbeafe]
    "
    >
      <Navbar />
      <div
        className="
        p-4
        md:p-6
      "
      >
        <h1
          className="
          text-3xl
          md:text-4xl
          font-bold
          text-[#111827]
          mb-6
        "
        >
          Users
        </h1>
        {/* MOBILE/Mobile telefon uchun */}
        <div
          className="
          grid
          gap-4
          md:hidden
        "
        >
          {
            users.map((user) => (
                <div
                  key={user._id}
                  className="
                  bg-white/80
                  backdrop-blur-sm
                  rounded-3xl
                  p-5
                  shadow-lg
                  border
                  border-white/40
                "
                >
                  <div
                    className="
                    flex
                    items-center
                    justify-between
                    mb-4
                  "
                  >
                    <h2
                      className="
                      text-lg
                      font-semibold
                      text-[#111827]
                    "
                    >
                      {user.fullName}
                    </h2>
                    <span
                      className={`
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-semibold
                      ${
                        user.role ===
                        "ADMIN"
                          ? `
                          bg-purple-100
                          text-purple-700
                          `
                          : `
                          bg-blue-100
                          text-blue-700
                          `
                      }
                    `}
                    >
                      {user.role}
                    </span>
                  </div>
                  <p
                    className="
                    text-sm
                    text-gray-600
                    break-all
                    mb-2
                  "
                  >
                    {user.email}
                  </p>
                  <p
                    className="
                    text-sm
                    text-gray-500
                    mb-4
                  "
                  >
                    {
                      new Date(user.createdAt).toLocaleDateString()}
                  </p>
                  <button
                    onClick={() =>handleDelete(user._id)}
                    className="
                    w-full
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    py-2.5
                    rounded-2xl
                    font-medium
                    transition
                  "
                  >
                    Delete
                  </button>
                </div>
              )
            )
          }
        </div>

        {/* DESKTOP/Kompyuter uchun */}
        <div
          className="
          hidden
          md:block
          overflow-x-auto
          bg-white/75
          backdrop-blur-sm
          rounded-3xl
          shadow-xl
          border
          border-white/40
        "
        >
          <table
            className="
            w-full
          "
          >
            <thead>
              <tr
                className="
                bg-[#111827]
                text-white
              "
              >
                <th
                  className="
                  p-5
                  text-left
                  font-semibold
                "
                >
                  Full Name
                </th>
                <th
                  className="
                  p-5
                  text-left
                  font-semibold
                "
                >
                  Email
                </th>
                <th
                  className="
                  p-5
                  text-left
                  font-semibold
                "
                >
                  Role
                </th>
                <th
                  className="
                  p-5
                  text-left
                  font-semibold
                "
                >
                  Joined
                </th>
                <th
                  className="
                  p-5
                  text-left
                  font-semibold
                "
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map( (user) => (
                    <tr
                      key={user._id}
                      className="
                      border-b
                      hover:bg-white/60
                      transition
                    "
                    >
                      <td
                        className="
                        p-5
                        font-medium
                        text-[#111827]
                      "
                      >
                        {user.fullName}
                      </td>
                      <td
                        className="
                        p-5
                        text-gray-700
                      "
                      >
                        {user.email}
                      </td>
                      <td
                        className="
                        p-5
                      "
                      >
                        <span
                          className={`
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-semibold
                          ${
                            user.role ===
                            "ADMIN"
                              ? `
                              bg-purple-100
                              text-purple-700
                              `
                              : `
                              bg-blue-100
                              text-blue-700
                              `
                          }
                        `}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td
                        className="
                        p-5
                        text-gray-600
                      "
                      >
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td
                        className="
                        p-5
                      "
                      >
                        <button
                          onClick={() => handleDelete(user._id )}
                          className="
                          bg-red-600
                          hover:bg-red-800
                          text-white
                          px-4
                          py-2
                          rounded-xl
                          text-sm
                          font-medium
                          cursor-pointer
                          duration-500
                          transition
                        "
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Users;