import {useState,} from "react";
import {useNavigate,} from "react-router-dom";
import api from "../api/axios";

function Profile() {
  const navigate =useNavigate();
    
  const storedUser =JSON.parse(localStorage.getItem("user"));
  const [isEditing, setIsEditing] =useState(false);
  const [fullName,setFullName] =useState( storedUser?.fullName || "");
  const [email, setEmail] = useState( storedUser?.email || "");
  const [oldPassword,setOldPassword] = useState("");
  const [newPassword,setNewPassword] =useState("");
  const handleLogout = () => {
    localStorage.removeItem(
      "accessToken"
    );
    localStorage.removeItem(
      "refreshToken"
    );
    localStorage.removeItem(
      "user"
    );
    window.location.href =
      "/login";
  };
  const handleProfileUpdate =async (e) => {
      e.preventDefault();
      try {
        const response =
          await api.put(
            "/users/profile",
            {
              fullName,
              email,
            }
          );
        localStorage.setItem(
          "user",
          JSON.stringify(
            response.data.data
          )
        );
        alert(
          "Profil yangilandi"
        );
        setIsEditing(false);
      } catch (error) {
        alert(
          error.response?.data
            ?.message
        );
      }
    };
  const handlePasswordChange =async (e) => {
      e.preventDefault();
      try {
        await api.put(
          "/users/change-password",
          {
            oldPassword,
            newPassword,
          }
        );
        alert(
          "Parol yangilandi"
        );
        setOldPassword("");
        setNewPassword("");
      } catch (error) {
        alert(
          error.response?.data
            ?.message
        );
      }
    };
  return (
    <div
      className="
      min-h-screen
      bg-[#020f3a]
      overflow-y-auto
      grid
      lg:grid-cols-2
    "
    >
      {/* LEFT/Chap taraf qismi */}
      <div
        className="
        hidden
        lg:flex
        items-center
        justify-center
        p-6
      "
      >
        <img
          src="/images/Profile data-amico.svg"
          alt="profile"
          className="
          w-full
          max-w-xs
        "
        />
      </div>
      {/* RIGHT/O'ng taraf qismi */}
      <div
        className="
        flex
        items-center
        justify-center
        p-4
      "
      >
        <div
          className="
          w-full
          max-w-md
          bg-[#081a57]
          rounded-[28px]
          shadow-2xl
          p-4
          md:p-5
        "
        >
          {/* TOP qismi */}
          <div
            className="
            flex
            items-center
            justify-between
            mb-5
          "
          >
            <h1
              className="
              text-2xl
              md:text-3xl
              font-bold
              text-white
            "
            >
              Profile
            </h1>
            <button
              onClick={() =>navigate( "/dashboard") }
              className="
              bg-[#4f46e5]
              hover:bg-[#4338ca]
              hover:text-blue-400
              text-white
              px-3
              py-2
              rounded-xl
              text-sm
              font-semibold
              cursor-pointer
              transition
            "
            >
              Dashboard
            </button>
          </div>
          {/* FULLNAME qismi */}
          <div
            className="
            bg-[#0d1f63]
            rounded-2xl
            p-4
            mb-3
          "
          >
            <p
              className="
              text-gray-400
              text-sm
              mb-1
            "
            >
              Full Name
            </p>
            {isEditing ? (
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(
                      e.target.value
                    )
                  }
                  className="
                  w-full
                  bg-[#132872]
                  text-white
                  p-3
                  rounded-xl
                  outline-none
                  text-sm
                "
                />
              ) : (
                <h2
                  className="
                  text-xl
                  font-bold
                  text-white
                "
                >
                  {fullName}
                </h2>
              )
            }
          </div>
          {/* EMAIL qismi */}
          <div
            className="
            bg-[#0d1f63]
            rounded-2xl
            p-4
            mb-3
          "
          >
            <p
              className="
              text-gray-400
              text-sm
              mb-1
            "
            >
              Email
            </p>
            {isEditing ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)}
                  className="
                  w-full
                  bg-[#132872]
                  text-white
                  p-3
                  rounded-xl
                  outline-none
                  text-sm
                "
                />

              ) : (
                <h2
                  className="
                  text-sm
                  md:text-base
                  font-semibold
                  text-white
                  break-all
                "
                >
                  {email}
                </h2>
              )
            }
          </div>

          {/* ROLE/Rol qismi */}
          <div
            className="
            bg-[#0d1f63]
            rounded-2xl
            p-4
            mb-4
            flex
            items-center
            justify-between
          "
          >
            <div>
              <p
                className="
                text-gray-400
                text-sm
                mb-1
              "
              >
                Role
              </p>
              <h2
                className="
                text-xl
                font-bold
                text-white
              "
              >
                {storedUser?.role}
              </h2>
            </div>
            <span
              className="
              bg-red-800
              text-white
              px-3
              py-1
              rounded-xl
              text-sm
              font-bold
            "
            >
              {storedUser?.role}
            </span>
          </div>
          {/* BUTTONS/Buttonlar */}
          <div
            className="
            flex
            flex-col
            gap-3
            mb-4
          "
          >
            {isEditing ? (
                <button
                  onClick={
                    handleProfileUpdate
                  }
                  className="
                  bg-green-500
                  hover:bg-green-600
                  text-white
                  py-3
                  rounded-xl
                  font-bold
                  text-sm
                  duration-500
                  cursor-pointer
                  transition
                "
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() =>setIsEditing(true) }
                  className="
                  bg-[#4f46e5]
                  hover:bg-[#4338ca]
                  text-white
                  py-3
                  rounded-xl
                  font-bold
                  text-sm
                  duration-500
                  cursor-pointer
                  transition
                "
                >
                  Edit Profile
                </button>
              )
            }
            <button
              onClick={ handleLogout}
              className="
              bg-red-600
              hover:bg-red-800
              text-white
              py-3
              rounded-xl
              font-bold
              text-sm
              cursor-pointer
              transition
            "
            >
              Logout
            </button>
          </div>
          {/* PASSWORD/Parol qismi */}
          <form
            onSubmit={handlePasswordChange}
            className="
            bg-[#0d1f63]
            cursor-pointer
            duration-500
            rounded-2xl
            p-4
          "
          >
            <h2
              className="
              text-lg
              font-bold
              text-white
            
              mb-3
            "
            >
              Change Password
            </h2>
            <div
              className="
              flex
              flex-col
              gap-3
            "
            >
              <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) =>
                  setOldPassword(
                    e.target.value
                  )
                }
                className="
                bg-[#132872]
                text-white
                p-3
                rounded-xl
                outline-none
                text-sm
              "
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
                className="
                bg-[#132872]
                text-white
                p-3
                rounded-xl
                outline-none
                text-sm
              "
              />
              <button
                type="submit"
                className="
                bg-blue-500
                hover:bg-blue-600
                text-white
                py-3
                rounded-xl
                font-bold
                text-sm
                cursor-pointer
                transition
              "
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Profile;