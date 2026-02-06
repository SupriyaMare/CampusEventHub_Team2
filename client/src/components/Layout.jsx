import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const Layout = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user && <Navbar/> }
      <Outlet />
      {user && <Footer />}
    </>
  );
};

export default Layout;
