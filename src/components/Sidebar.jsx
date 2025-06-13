import { FiUser, FiPackage, FiHeart, FiMapPin, FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { clearUser } from "../redux/user/userSlice";
import { toast } from "react-toastify";

const navItems = [
  { label: "Account Overview", icon: <FiUser />, value: "overview" },
  { label: "My Orders", icon: <FiPackage />, value: "orders" },
//   { label: "Wishlist", icon: <FiHeart />, value: "wishlist" },
  { label: "Addresses", icon: <FiMapPin />, value: "addresses" },
  { label: "Account Settings", icon: <FiSettings />, value: "settings" },
];

const Sidebar = ({ currentTab, setCurrentTab }) => {

    const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
  try {
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/logout`, {},{
      withCredentials: true,
    });
    dispatch(clearUser());

    navigate('/');
    toast.success("Successfully logged out!");
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("Failed to log out. Please try again.");
  }
};

  return (
    <div className=" w-full sm:w-64 bg-gray-50 p-4 space-y-4 border-r">
      {navItems.map((item) => (
        <button
          key={item.value}
          onClick={() => setCurrentTab(item.value)}
          className={`flex items-center gap-3 px-4 py-2 rounded text-left w-full ${
            currentTab === item.value
              ? "bg-white border-l-4 border-black font-semibold"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
      <div  className="mt-10 text-sm text-gray-500">Need Help?</div>
      <button onClick={handleLogout} className="text-sm underline">LOGOUT</button>
    </div>
  );
};

export default Sidebar;
