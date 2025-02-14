import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

const AdminLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default AdminLayout;
