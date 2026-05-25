import {Navigate,} from "react-router-dom";
function AdminRoute({children,}) {
  const user =JSON.parse(localStorage.getItem("user")); 
  if (user?.role !== "ADMIN") {
    return (
      <Navigate
        to="/403"
      />
    );
  }
  return children;
}
export default AdminRoute;