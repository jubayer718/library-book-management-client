import Navbar from "./Navbar";
import { Outlet } from "react-router";


const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
       <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;