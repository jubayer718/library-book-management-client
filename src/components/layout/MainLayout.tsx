import Container from "../Shared/Container";
import Navbar from "./Navbar";
import { Outlet } from "react-router";


const MainLayout = () => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      
      <main className="flex-grow min-h-screen">
       <Outlet />
      </main>

      <Container className="border-t-2 bg-gradient-to-tr from-cyan-200 to-blue-50">
       <footer className="flex justify-center items-center ">
         <p>Library Management System &copy; 2025</p>
       </footer>
     </Container>
    </div>
  );
}

export default MainLayout;