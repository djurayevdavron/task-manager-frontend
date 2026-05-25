import { useState } from "react";
import {Link,useNavigate,} from "react-router-dom";
import api from "../api/axios";

function Register() {
  const navigate =useNavigate();
  const [formData, setFormData] =useState({
      fullName: "",
      email: "",
      password: "",
    });
  const [loading, setLoading] =useState(false);
  const [error, setError] =useState("");
  const handleChange = (e) => {setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
    setError("");
  };
  const handleSubmit = async (e) => {
      e.preventDefault();
      if (
        !formData.fullName
      ) {
        setError(
          "Ism va familiya kiriting"
        );
        return;
      }
      if (
        !formData.email
      ) {
        setError(
          "Email kiriting"
        );
        return;
      }
      if (
        !formData.password
      ) {
        setError(
          "Parol kiriting"
        );
        return;
      }
      try {
        setLoading(true);
        setError("");
        await api.post(
  "/auth/register",
  formData
);
localStorage.setItem(
  "otpEmail",
  formData.email
);
navigate(
  "/verify-otp",
  {
    state: {
      email:
        formData.email,
    },
  }
);

      } catch (error) {
        setError(
          error.response?.data
            ?.message ||
            "Register error"
        );
      } finally {
        setLoading(false);
      }
    };
  return (
    <div
      className="
      min-h-screen
      grid
      md:grid-cols-2
      bg-[#f8f8f8]
    "
    >
      {/* LEFT SIDE/chap taraf qismi */}
      <div
        className="
        hidden
        md:flex
        items-center
        justify-center
        bg-[#f5f3f0]
        p-8
      "
      >
        <img
          src="/images/Sign up-cuate.svg"
          alt="register"
          className="
          w-full
          max-w-lg
        "
        />
      </div>
      {/* RIGHT SIDE/o'ng taraf qismi */}
      <div
        className="
        flex
        items-center
        justify-center
        px-6
        sm:px-10
        lg:px-16
        py-10
      "
      >
        <form
          onSubmit={handleSubmit}
          className="
          w-full
          max-w-md
        "
        >
          <h1
            className="
            text-4xl
            md:text-5xl
            font-bold
            text-[#2E6CCB]
            mb-10
          "
          >
            Ro'yxatdan o'tish
          </h1>
          { error && (
              <div
                className="
                bg-red-100
                border
                border-red-300
                text-red-500
                p-3
                rounded-2xl
                mb-4
                text-sm
              "
              >
                {error}
              </div>
            )
          }
          <input
            type="text"
            name="fullName"
            placeholder="Ism va familiyangiz"
            value={formData.fullName}
            onChange={handleChange}
            className="
            w-full
            bg-[#e9edf7]
            p-4
            text-base
            rounded-2xl
            mb-4
            outline-none
            transition
            focus:ring-4
            focus:ring-[#B86AD9]/30
          "
          />
          <input
            type="email"
            name="email"
            placeholder="Email manzilingiz"
            value={formData.email }
            onChange={handleChange}
            className="
            w-full
            bg-[#e9edf7]
            p-4
            text-base
            rounded-2xl
            mb-4
            outline-none
            transition
            focus:ring-4
            focus:ring-[#4376CC]/30
          "
          />
          <input
            type="password"
            name="password"
            placeholder="Parol kiriting"
            value={formData.password}
            onChange={handleChange}
            className="
            w-full
            bg-[#e9edf7]
            p-4
            text-base
            rounded-2xl
            mb-5
            outline-none
            transition
            focus:ring-4
            focus:ring-[#4376CC]/30
          "
          />
          <button
            type="submit"
            disabled={loading}
            className="
            w-full
            bg-[#B86AD9]
            hover:bg-[#9f4fc4]
            lg:bg-[#3B73CC]
            hover:bg-[#1D4ED8]
            text-white
            p-4
            rounded-2xl
            text-lg
            font-semibold
            transition-all
            duration-500
            shadow-lg
            cursor-pointer
            disabled:opacity-70
          "
          >
            {loading? "Loading...": "Ro'yxatdan o'tish"}
          </button>
          <p
            className="
            text-center
            mt-7
            text-base
            text-black
          "
          >
            Akkauntingiz bormi?
            <Link
              to="/login"
              className="
              ml-2
              text-[#1F5BB7]
              font-semibold
              hover:underline
              hover:text-red-600
            "
            >
              Kirish
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
export default Register;