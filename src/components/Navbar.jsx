import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { auth } from "../Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import axios from "axios";
import LoginModal from "./login";
import { useModal } from "../context/loginBox"; // Adjust the import path as needed
import { useSelector } from "react-redux";
import {toast} from "react-toastify"
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/user/userSlice";


function Navbar() {
  const [nav, setNav] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [mongoUser, setMongoUser] = useState(null);
  // const [showLogin, setShowLogin] = useState(false);
  const { isLoginOpen, setIsLoginOpen } = useModal(); // Use context for login modal state
  // Toggle mobile nav menu
  const handleNav = () => {
    setNav(!nav);
  };
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    // Firebase user observer
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setFirebaseUser(currentUser);
    });

    // Check MongoDB JWT token
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

  const handleLogout1 = async () => {
    try {
      await axios.post( `${import.meta.env.VITE_API_BASE_URL}/admin/logout`, {},{
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

  const handleLogout = async () => {
    if (firebaseUser) {
      localStorage.removeItem("token");
      await signOut(auth);
      setFirebaseUser(null);
    }
    if (mongoUser) {
      localStorage.removeItem("token");
      setMongoUser(null);
    }
    // alert("Successfully logged out!");
    navigate("/");
  };

  // Determine if user is logged in (either Firebase or MongoDB)
  // const isLoggedIn = firebaseUser || mongoUser;

  return (
    <>
      <nav className="bg-[#000000] py-2">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between md:px-2 sm:px-2">
          <NavLink to="/">
            <div className="flex text-2xl items-center  gap-2 mx-7">
              <img src="/logo3.png" alt="Logo" className="w-[65px] bg-cover" />
              <span className="text-white font-ancizar py-2 text-[23px] font-semibold">
                nanosemic
              </span>
            </div>
          </NavLink>

          <div>
            <ul className="text-white text-bold text-[16px] font-bold flex gap-12 hover:cursor-pointer">
              {/* <li className="hover:cursor-pointer">
                <NavLink to="/home">Home</NavLink>
              </li> */}
              <li className="flex items-center">
                <NavLink to="/about">About</NavLink>
              </li>
              <li className="flex items-center">
                <NavLink to="/product">Products</NavLink>
              </li>
              <li className="flex items-center">
                <NavLink to="/services">Services</NavLink>
              </li>
              <li className="flex items-center">
                <NavLink to="/contact">Contact Us</NavLink>
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex gap-4 px-3 mr-5">
              {user && (
                <li>
                  <button
                    onClick={() => navigate("/cart")}
                    className="focus:outline-none  transition duration-150 ease-in-out"
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen}
                  >
                    <img
                      className="h-[31] w-[31px] invert   rounded-full border-2 border-transparent transition"
                      src="/cart.svg"
                      alt="User"
                    />
                  </button>
                </li>
              )}
              {user && (
                <li className="relative" id="profile-dropdown">
                  <button
                    onClick={toggleDropdown}
                    className="focus:outline-none  transition duration-150 ease-in-out"
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen}
                  >
                    <img
                      className="h-[31px] w-[31px] invert   rounded-full border-2 border-transparent  transition"
                      src="/profile1.svg"
                      alt="User"
                    />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-50 animate-dropdown">
                      <ul className="py-2 text-sm text-gray-700">
                        <li>
                          <NavLink
                            to="/account"
                            className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                            onClick={() => setDropdownOpen(false)}
                          >
                            My Account
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/cart"
                            className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                            onClick={() => setDropdownOpen(false)}
                          >
                            My Cart
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/my-orders"
                            className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                            onClick={() => setDropdownOpen(false)}
                          >
                            My Orders
                          </NavLink>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              handleLogout1();
                              setDropdownOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors duration-200"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
              )}
              {!user && (
                <>
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="group relative py-1 items-center justify-center rounded-md border border-slate-600 bg-[linear-gradient(110deg,#1a1a1a,45%,#3a3a3a,55%,#1a1a1a)] bg-[length:200%_100%] px-6 font-medium text-slate-200 shadow-[0px_1px_0px_0px_#ffffff60_inset,0px_-1px_0px_0px_#ffffff60_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-700)_inset,0px_-1px_0px_0px_var(--zinc-700)_inset] transition-colors focus:outline-none animate-shimmer"
                  >
                    <span className="flex w-full justify-center text-[18px] items-center gap-2">
                      Login
                    </span>
                    <span className="group-hover:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></span>
                    <span className="group-hover:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></span>
                  </button>
                  <LoginModal
                    isOpen={isLoginOpen}
                    onClose={() => setIsLoginOpen(false)}
                  />
                </>
              )}
            </ul>
          </div>

          {/* {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="bg-white text-black rounded-full py-1 px-4 hover:cursor-pointer text-lg font-semibold"
              >
                Logout
              </button>
            )} */}

          <div className="md:hidden" onClick={handleNav}>
            {!nav ? (
              <AiOutlineMenu size={25} className="text-white cursor-pointer" />
            ) : (
              <AiOutlineClose size={25} className="text-white cursor-pointer" />
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 h-full w-[250px] bg-ogcolor text-white z-50 transform ${
            nav ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="flex justify-between items-center px-4 py-5">
            <img src={logo} alt="Logo" className="w-12" />
            <AiOutlineClose
              size={25}
              className="text-white cursor-pointer"
              onClick={handleNav}
            />
          </div>
          <ul className="flex flex-col gap-4 px-4 mt-8">
            <li onClick={handleNav}>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li onClick={handleNav}>
              <NavLink to="/about">About</NavLink>
            </li>
            <li onClick={handleNav}>
              <NavLink to="/pro">Product</NavLink>
            </li>
            <li onClick={handleNav}>
              <NavLink to="/services">Services</NavLink>
            </li>
            {user && (
              <li className="relative" id="profile-dropdown">
                <button
                  onClick={toggleDropdown}
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                >
                  <img
                    className="h-[35px] w-[35px] rounded-full border-2 border-transparent hover:border-indigo-500 transition"
                    src="/profile.webp"
                    alt="User"
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-50 animate-dropdown">
                    <ul className="py-2 text-sm text-gray-700">
                      <li>
                        <NavLink
                          to="/dashboard"
                          className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleLogout();
                            setDropdownOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors duration-200"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            )}

            {!user && (
              <>
                <button
                  onClick={() => {
                    navigate("/signup");
                    handleNav();
                  }}
                  className="bg-white text-black rounded-full py-2 px-4 mt-4 text-lg font-semibold"
                >
                  Signup
                </button>
                <button
                  onClick={() => {
                    navigate("/signin");
                    handleNav();
                  }}
                  className="bg-white text-black rounded-full py-2 px-4 mt-4 text-lg font-semibold"
                >
                  Signin
                </button>
              </>
            )}
            {user && (
              <button
                onClick={() => {
                  handleLogout();
                  handleNav();
                }}
                className="bg-white text-black rounded-full py-2 px-4 mt-4 text-lg font-semibold"
              >
                Logout
              </button>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
