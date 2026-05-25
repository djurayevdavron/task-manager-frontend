import { useState } from "react";
import {Link,useNavigate,} from "react-router-dom";
import api from "../api/axios";

function Login() {
  const navigate =useNavigate();
  const [formData, setFormData] =
    useState({ email: "",password: "",});
  
  const [loading, setLoading] =useState(false);
  const [error, setError] =useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
    setError("");
  };
  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.email) {
        setError(
          "Email kiriting"
        );
        return;
      }
      if (!formData.password) {
        setError(
          "Parol kiriting"
        );
        return;
      }
      try {
        setLoading(true);
        setError("");
        const response =await api.post("/auth/login",formData);
        localStorage.setItem(
          "accessToken",
          response.data.tokens
            .accessToken
        );
        localStorage.setItem(
          "refreshToken",
          response.data.tokens
            .refreshToken
        );
        localStorage.setItem(
          "user",
          JSON.stringify(
            response.data.data
          )
        );
        navigate( "/dashboard");
      } catch (error) {
        console.log(
          error.response?.data
        );
        setError(
          error.response?.data
            ?.message ||
            "Login error"
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
      {/* LEFT SIDE/Chap taraf qismi */}
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
          src="/images/Computer login-amico.svg"
          alt="login"
          className="
          w-full
          max-w-lg
        "
        />
      </div>

      {/* RIGHT SIDE/O'ng taraf qismi */}
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
            text-[#7B3F87]
            mb-10
          "
          >
            Kirish
          </h1>

          {error && (
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
            type="email"
            name="email"
            placeholder="Email kiriting"
            value={
              formData.email
            }
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
            type="password"
            name="password"
            placeholder="Parol kiriting"
            value={
              formData.password
            }
            onChange={handleChange }
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
            focus:ring-[#B86AD9]/30
          "
          />
          <button
            type="submit"
            disabled={loading}
            className="
            w-full
            bg-[#B86AD9]
            hover:bg-[#9f4fc4]
            lg:bg-[#BA68C8]
            lg:hover:bg-[#7B3F87]
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
            {loading? "Loading...": "Kirish"}
          </button>
          <p
            className="
            text-center
            mt-7
            text-base
            text-black
          "
          >
            Akkauntingiz yo'qmi?
            <Link
              to="/register"
              className="
              ml-2
              text-[#7B3F87]
              font-semibold
              hover:underline
            "
            >
              Ro'yxatdan o'tish
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
export default Login;