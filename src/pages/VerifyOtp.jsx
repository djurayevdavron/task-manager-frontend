import {useEffect,useState,} from "react";
import { useLocation,useNavigate,} from "react-router-dom";
import api from "../api/axios";

function VerifyOtp() {

  const navigate =useNavigate();
  const location = useLocation();
  const email =location.state?.email ||localStorage.getItem("otpEmail");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading,setResendLoading] = useState(false);
  const [error, setError] =useState("");
  const [timeLeft, setTimeLeft] =useState(300);
  useEffect(() => {
    if (timeLeft <= 0)
      return;
    const timer =
      setInterval(() => {
        setTimeLeft(
          (prev) => prev - 1
        );
      }, 1000);
    return () =>
      clearInterval(timer);
  }, [timeLeft]);
  const minutes =Math.floor( timeLeft / 60);
  const seconds =timeLeft % 60;
  const handleVerify =async (e) => {
      e.preventDefault();
      if (!otp) {
        setError(
          "OTP kodni kiriting"
        );
        return;
      }
      try {
        setLoading(true);
        setError("");
        const response =
          await api.post(
            "/auth/verify-otp",
            {
              email,
              otp,
            }
          );
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
        navigate("/dashboard");
      } catch (error) {
        setError(
          error.response?.data
            ?.message ||
            "OTP verification error"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleResendOtp =async () => {
      console.log(email);
      try {
        setResendLoading(true );
        const response = await api.post( "/auth/resend-otp",{ email });

  

        console.log(
        response.data
        );
        setError("");
        setTimeLeft(300);

        alert("Yangi OTP emailingizga yuborildi");
      } catch (error) {
        console.log(error);

        setError(error.response?.data?.message ||error.message);
      } finally {
        setResendLoading(false);
      }};
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
        bg-[#f3f6ef]
        p-8
      "
      >
        <img
          src="/images/Verified-pana.svg"
          alt="verify"
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
          onSubmit={handleVerify}
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
            text-[#2F67BD]
            mb-10
          "
          >
            Tasdiqlash
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
            type="text"
            placeholder="OTP kodni kiriting"
            value={otp}
            onChange={(e) => {setOtp(e.target.value);
              setError("");
            }}
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
            focus:ring-[#2F5FB3]/30
          "
          />

          <div
            className="
            flex
            items-center
            justify-between
            text-[#2F5FB3]
            font-medium
            mb-5
            "
          >
          <p>
            OTP tasdiqlash kodi muddati:
             {" "}
             {minutes}:
            {seconds
            .toString()
            .padStart(2,"0")
           }
          </p>
  <button
    type="button"
    onClick={
      handleResendOtp
    }
    disabled={
      resendLoading
    }
    className="
    text-[#2F67BD]
    hover:text-[#2563EB]
    hover:underline
    font-semibold
    transition-all
    duration-300
    cursor-pointer
  "
  >
    {resendLoading? "Yuborilmoqda...": "Yangi OTP kodi olish"  
    }
  </button>
</div>
          <button
            type="submit"
            disabled={loading}
            className="
            w-full
            bg-[#3B73CC]
            hover:bg-[#2F5FB3]
            lg:bg-[#2F67BD]
            lg:hover:bg-[#2457A3]
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
            {loading? "Loading..." : "Tasdiqlash" 
            }
          </button>
        </form>
      </div>
    </div>
  );
}
export default VerifyOtp;