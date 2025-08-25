import { NavLink } from "react-router";
import Container from "../Shared/Container";



const Navbar = () => {


  return (

      <Container className="border-b-2 bg-gradient-to-tr from-cyan-300 to-blue-200 py-5 fixed top-0 left-0 right-0 z-50 ">
         <ul className="flex justify-center items-center space-x-4  ">
        <li>
          <NavLink to="/">All Books</NavLink>
        </li>
        <li>
          <NavLink to="/createbook">Add Book</NavLink>
        </li>
        <li>
          <NavLink to="/summary">Borrow Summary</NavLink>
        </li>
      </ul>
     </Container>
    
  );
};

export default Navbar;