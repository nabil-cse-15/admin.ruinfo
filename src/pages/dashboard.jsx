import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Link } from "react-router-dom";
import { FaBus } from "react-icons/fa6";
import { IoFastFoodOutline } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import { BiSolidContact } from "react-icons/bi";
import { MdElectricRickshaw } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import "../App.css";
import "../css/dashboard.css";
function Dashboard() {

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      window.location.href = "/";
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="title">Dashboard</h1>
      <div className="card-container">
        <Link to="/dashboard/foodprice" className="card"><IoFastFoodOutline className="icon" />Food</Link>
        <Link to="/dashboard/clubs" className="card"><GrGroup className="icon" />Clubs</Link>
        <Link to="/dashboard/rickshawfare" className="card"><MdElectricRickshaw className="icon" />Rickshaw Fare</Link>
        <Link to="/dashboard/notice" className="card"><LuClipboardList className="icon" />Notice</Link>
        <Link to="/dashboard/busshedule" className="card"> <FaBus className="icon" /> Bus Schedule</Link>
        {/* <Link to="/dashboard/lostandfound" className="card"><FaSearch className="icon" />Lost & Found</Link> */}
        <Link to="/dashboard/emergency" className="card"><BiSolidContact className="icon" />Emergency Contact</Link>
      </div>
<br/>
      <button class="btn btn-danger" onClick={handleLogout}>Logout</button>

    </div>
  );
}

export default Dashboard;

