import {Link,} from "react-router-dom";
function NotFound() {
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
        src="/images/404 error with portals-pana.svg"
        alt="404"
        className="
        w-[350px]
        mb-8
      "
      />
      <h1
        className="
        text-6xl
        font-bold
        text-[#111827]
        mb-4
      "
      >
        404
      </h1>
      <p
        className="
        text-gray-500
        text-lg
        mb-8
      "
      >
        Sahifa topilmadi
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
export default NotFound;