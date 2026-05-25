import {Link,} from "react-router-dom";

function ServerError() {
  return (
    <div
      className="
      min-h-screen
      flex
      flex-col
      items-center
      justify-center
      bg-gradient-to-br
      from-[#f8fafc]
      to-[#eef2ff]
      text-center
      px-6
    "
    >
      <img
        src="/images/500 Internal Server Error-amico.svg"
        alt="500"
        className="
        w-[350px]
        mb-8
      "
      />
      <h1
        className="
        text-6xl
        font-bold
        text-red-500
        mb-4
      "
      >
        500
      </h1>
      <p
        className="
        text-gray-500
        text-lg
        mb-8
      "
      >
        Serverda xatolik yuz berdi
      </p>
      <Link
        to="/dashboard"
        className="
        bg-[#111827]
        text-white
        px-6
        py-3
        rounded-2xl
        hover:bg-black
        transition
      "
      >
        Dashboardga qaytish
      </Link>
    </div>
  );
}
export default ServerError;