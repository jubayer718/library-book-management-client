import { NavLink } from "react-router";


const Navbar = () => {


  return (
    <div>
      <ul className="flex justify-center items-center space-x-4">
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
    </div>
  );
};

export default Navbar;