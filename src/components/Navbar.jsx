import {Link,} from "react-router-dom";
import {useState,useEffect,} from "react";
  
function Navbar() {

  const [menuOpen,setMenuOpen]=useState(false);
  const [time,setTime] = useState(new Date()); 
  useEffect(() => {
    const interval = setInterval(() => {setTime(new Date());}, 1000);
    return () =>
      clearInterval(interval);
  }, []);

  const user =JSON.parse(
      localStorage.getItem(
        "user"
      )
    );
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
  return (
    <>
      <nav
        className="
        bg-gradient-to-r
        from-[#0f172a]
        via-[#111827]
        to-[#1e293b]
        border-b
        border-white/10
        text-white
        px-6
        md:px-8
        py-4
        flex
        items-center
        justify-between
        shadow-lg
      "
      >
        {/* LOGO qismi*/}
        <Link
          to="/dashboard"
          className="
          text-2xl
          md:text-3xl
          font-bold
          bg-gradient-to-r
          from-[#c79b68]
          to-[#e7c79f]
          bg-clip-text
          text-transparent
          no-underline
        "
        >
          TaskManager
        </Link>

        {/* RIGHT MENU/O'ng taraf Menyu qismi */}
        <div
          className="
          hidden
          md:flex
          items-center
          gap-6
        "
        >
          <Link
            to="/dashboard"
            className="
            text-lg
            font-medium
            hover:text-[#c79b68]
            transition-all
            duration-300
            no-underline
          "
          >
            Tasks
          </Link>
          <Link
            to="/profile"
            className="
            text-lg
            font-medium
            hover:text-[#c79b68]
            transition-all
            duration-300
            no-underline
          "
          >
            Profile
          </Link>
          {
            user?.role ==="ADMIN" && (
              <Link
                to="/users"
                className="
                text-lg
                font-medium
                hover:text-[#c79b68]
                transition-all
                duration-300
                no-underline
              "
              >
                Users
              </Link>
            )
          }
          {/* TIME/ Soat qismi */}
          <div
            className="
            text-center
          "
          >
            <p
              className="
              text-lg
              font-bold
              text-[#e7c79f]
              tracking-wider
            "
            >
              {
                time.toLocaleTimeString()
              }
            </p>
            <p
              className="
              text-xs
              text-[#e7c79f]
            "
            >
              {
                time.toLocaleDateString()
              }
            </p>
          </div>

          {/* LOGOUT qismi */}

          <button
            onClick={handleLogout}
            className="
            bg-gradient-to-r
            from-[#c79b68]
            to-[#e7c79f]
            hover:from-[#1e293b]
            hover:to-[#0f172a]
            text-[#111827]
            hover:text-white
            px-5
            py-3
            rounded-2xl
            font-semibold
            shadow-lg
            cursor-pointer
            transition-all
            duration-500
          "
          >
            Logout
          </button>
        </div>

        {/* MOBILE BUTTON/Telefon uchun*/}

        <button
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          className="
          md:hidden
          text-3xl
        "
        >
          ☰
        </button>
      </nav>

      {/* MOBILE MENU/Telefon Menyu qismi */}

      {
        menuOpen && (
          <div
            className="
            md:hidden
            bg-[#111827]
            text-white
            px-6
            py-6
            flex
            flex-col
            gap-5
          "
          >
            <div>
              <p
                className="
                font-semibold
              "
              >
                {user?.fullName}
              </p>
              <p
                className="
                text-sm
                text-gray-400
              "
              >
                {user?.role}
              </p>
              <p
                className="
                text-sm
                text-[#e7c79f]
              "
              >
                {
                  time.toLocaleTimeString()
                }
              </p>

              <p
                className="
                text-xs
                text-gray-400
              "
              >
                {
                  time.toLocaleDateString()
                }
              </p>
            </div>
            <Link
              to="/dashboard"
              onClick={() =>
                setMenuOpen(false)
              }
              className="
              no-underline
            "
            >
              Tasks
            </Link>
            <Link
              to="/profile"
              onClick={() =>
                setMenuOpen(false)
              }
              className="
              no-underline
            "
            >
              Profile
            </Link>

            {
              user?.role ==="ADMIN" && (
                <Link
                  to="/users"
                  onClick={() =>setMenuOpen(false) 
                  }
                  className="
                  no-underline
                "
                >
                  Users
                </Link>
              )
            }
            <button
              onClick={handleLogout}
              className="
              bg-gradient-to-r
              from-[#c79b68]
              to-[#e7c79f]
              hover:from-[#1e293b]
              hover:to-[#0f172a]
              text-[#111827]
              hover:text-white
              py-3
              rounded-xl
              font-semibold
              transition-all
              duration-500
            "
            >
              Logout
            </button>
          </div>
        )
      }

    </>
  );
}
export default Navbar;