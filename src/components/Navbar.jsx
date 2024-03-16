import { Link, useNavigate } from "react-router-dom"
import "../styles/navbar.css";
import { FaSignOutAlt } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import { useContext } from "react";
import { JWTContext } from "../contexts/JwtProvider";
import { toast } from "react-toastify";

const Navbar = () => {

  const navigate = useNavigate();
  const {logoutUser} = useContext(JWTContext);

  const handleLogout = ()=>{
    logoutUser();
    toast.success("Logut Success");
    navigate("/login");
  }

  return (
    <header>
      <nav className="container">
        <h1><Link className="heading" to="/">iNotebook</Link></h1>
        <div className="btnsContainer">
          <button  title="New Note" onClick={()=> navigate("/newnote")}><GrAdd/></button>
          <button title="Logout" onClick={handleLogout}><FaSignOutAlt/></button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
