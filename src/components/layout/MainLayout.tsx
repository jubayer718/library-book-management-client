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

     <Container>
       <footer className="flex justify-center items-center">
         <p>Library Management System &copy; 2023</p>
       </footer>
     </Container>
    </div>
  );
}

export default MainLayout;