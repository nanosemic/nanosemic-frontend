import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../redux/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-6">
      <div className="bg-[#18181b] shadow-2xl rounded-2xl p-8 w-full max-w-xl border border-gray-800">
        <h2 className="text-3xl font-extrabold mb-4 text-center text-white tracking-wide">
          Dashboard
        </h2>
        <div className="text-center">
          <img
            src={`https://i.pravatar.cc/150?u=${user.email}`}
            alt="Avatar"
            className="w-24 h-24 mx-auto rounded-full mb-4 shadow-lg border-4 border-gray-700"
          />
          <p className="text-xl font-semibold text-white">
            {user.username}
          </p>
          <p className="text-sm text-gray-300">{user.email}</p>
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLogout}
            className="bg-white text-black font-semibold px-6 py-2 rounded-full shadow hover:bg-gray-200 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
