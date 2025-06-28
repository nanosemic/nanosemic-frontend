import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { auth } from "../Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import axios from "axios";
import LoginModal from "./login";
import { useModal } from "../context/loginBox";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../redux/user/userSlice";
import { toast } from "react-toastify";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [mongoUser, setMongoUser] = useState(null);
  const { user } = useSelector((state) => state.user);
  const { isLoginOpen, setIsLoginOpen } = useModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNav = () => setNav(!nav);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    // Firebase Auth Listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setFirebaseUser(currentUser);
    });

    // MongoDB Auth via JWT
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/admin/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setMongoUser(res.data))
        .catch(() => localStorage.removeItem("token"));
    }

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      if (firebaseUser) {
        await signOut(auth);
        setFirebaseUser(null);
      }

      if (mongoUser) {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/admin/logout`,
          {},
          { withCredentials: true }
        );
        setMongoUser(null);
      }

      localStorage.removeItem("token");
      dispatch(clearUser());
      navigate("/");
      toast.success("Successfully logged out!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <>
      <nav className="bg-[#000000] py-2">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between md:px-2 sm:px-2">
          <NavLink to="/">
            <div className="flex text-2xl items-center gap-2 mx-7">
              <img src="/logo3.png" alt="Logo" className="w-[65px]" />
              <span className="text-white font-ancizar py-2 text-[23px] font-semibold">
                nanosemic
              </span>
            </div>
          </NavLink>

          <div className="hidden md:flex">
            <ul className="text-white font-bold text-[16px] flex gap-12">
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/product">Products</NavLink></li>
              <li><NavLink to="/services">Services</NavLink></li>
              <li><NavLink to="/contact">Contact Us</NavLink></li>
            </ul>
          </div>

          <div className="hidden md:flex gap-4 px-3 mr-5 items-center">
            {user && (
              <button onClick={() => navigate("/cart")}>
                <img src="/cart.svg" alt="Cart" className="h-[31px] w-[31px] invert" />
              </button>
            )}
            {user && (
              <div className="relative">
                <button onClick={toggleDropdown}>
                  <img src="/profile1.svg" alt="Profile" className="h-[31px] w-[31px] invert rounded-full" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-50">
                    <ul className="py-2 text-sm text-gray-700">
                      <li><NavLink to="/account" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>My Account</NavLink></li>
                      <li><NavLink to="/cart" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>My Cart</NavLink></li>
                      <li><NavLink to="/my-orders" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>My Orders</NavLink></li>
                      <li><button onClick={() => { handleLogout(); setDropdownOpen(false); }} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">Logout</button></li>
                    </ul>
                  </div>
                )}
              </div>
            )}
            {!user && (
              <>
                <button onClick={() => setIsLoginOpen(true)} className="group relative py-1 px-6 rounded-md border border-slate-600 text-slate-200 animate-shimmer bg-[linear-gradient(110deg,#1a1a1a,45%,#3a3a3a,55%,#1a1a1a)] bg-[length:200%_100%] font-medium shadow-[0px_1px_0px_0px_#ffffff60_inset,0px_-1px_0px_0px_#ffffff60_inset]">
                  <span className="flex justify-center items-center gap-2 text-[18px]">Login</span>
                  <span className="absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition" />
                  <span className="absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm opacity-0 group-hover:opacity-100 transition" />
                </button>
               
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden" onClick={handleNav}>
            {nav ? <AiOutlineClose size={25} className="text-white" /> : <AiOutlineMenu size={25} className="text-white" />}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed top-0 left-0 h-full w-[250px] bg-black text-white z-50 transform ${nav ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
          <div className="flex justify-between items-center px-4 py-5">
            <img src="/logo3.png" alt="Logo" className="w-12" />
            <AiOutlineClose size={25} className="text-white cursor-pointer" onClick={handleNav} />
          </div>
          <ul className="flex flex-col gap-4 px-4 mt-8">
            <li><NavLink to="/" onClick={handleNav}>Home</NavLink></li>
            <li><NavLink to="/about" onClick={handleNav}>About</NavLink></li>
            <li><NavLink to="/product" onClick={handleNav}>Product</NavLink></li>
            <li><NavLink to="/services" onClick={handleNav}>Services</NavLink></li>
            <li><NavLink to="/contact" onClick={handleNav}>Contact</NavLink></li>
            {!user && (
              
                <button
                  onClick={() => {
                    setIsLoginOpen(true);
                    handleNav();
                  }}
                  className="bg-white text-black rounded-full py-2 px-4 mt-4 font-semibold"
                >
                  Login
                </button>
                
            )}

            {user && (
              <button onClick={() => { handleLogout(); handleNav(); }} className="bg-white text-black rounded-full py-2 px-4 mt-4 font-semibold">Logout</button>
            )}
            

          </ul>
        </div>
      </nav>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

    </>
  );
}

export default Navbar;
