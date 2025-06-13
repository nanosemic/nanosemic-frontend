import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '../redux/user/userSlice';
import VerifyEmail from "./VerifyEmail"; 
import { useModal } from "../context/loginBox"; 
import { useLoad } from "../context/loading";
import { toast } from "react-toastify";
import OAuth from "./OAuth";



const LoginModal = ({isOpen}) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user);
  const { setIsLoginOpen } = useModal();
  const [status, setStatus] = useState("signup");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const {loading, setLoading,error,setError} = useLoad(); 
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLoginChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/login`,
        {
          email: formData.email,
          password: formData.password,
        },{withCredentials: true}
      );
      // alert(`welcome Back 🥳, ${response.data.username}`);
      dispatch(setUser({ username: response.data.username, email: response.data.email }));
      toast.success("Successfully loggin in!");
      // localStorage.setItem("token", response.data.token);
      navigate("/account");
      setIsLoginOpen(false);
    } catch (err) {
      setError("Invalid email or password.");
      toast.error("Login failed. Please check your credentials.");

    } finally {
      setLoading(false);
    }
  };

  // const handleGoogleSignin = async () => {
  //   setError("");
  //   setLoading(true);
  //   try {
  //     const User = await signInWithGoogle();
  //     // alert(`Welcome, ${user.displayName || user.email}!`);
  //     console.log(User);
  //     // const idToken = await User.getIdToken();
  //     console.log(User.displayName)
  //     dispatch(setUser({ username: User.displayName , email: User.email }));
  //     navigate("/dashboard");
  //     setIsLoginOpen(false);
  //   } catch (err) {
  //     console.error(err);
  //     setError("Google Sign-in failed.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  // const handleGoogleSignup = async () => {
  //   try {
  //     const user = await signInWithGoogle();
  //     const idToken = await user.getIdToken();
  //     await fetch("http://localhost:3000/api/auth/google-signup", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ idToken }),
  //     });
  //     // alert(`Welcome, ${user.displayName || user.email}!`);
  //     navigate("/dashboard");
  //     // dispatch(setUser({ username: User.displayName , email: User.email }));
  //     setIsLoginOpen(false);
  //   } catch (err) {
  //     console.error(err);
  //     setError("Google Sign-in failed.");
  //   }
  // };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/signup`, {
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
      },{
  withCredentials: true
});
      // alert("Verification code sent to your email.");
      setEmail(registerData.email);
      setStep(2);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.msg || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-70"
      onClick={() => setIsLoginOpen(false)}
    >
      <div
        className="flex flex-col md:flex-row  bg-gradient-to-br from-slate-800 to-slate-900 text-black dark:bg-[#0F172A] dark:text-white rounded-l-lg shadow-lg overflow-hidden max-w-4xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="relative hidden md:flex flex-col justify-center items-center bg-dark-blue w-1/2 rounded-l-lg overflow-hidden">
          <img
            src="/nanosemic9.png"
            // alt="Authentication Visual"
            className="w-full max-h-[510px] object-cover rounded-l-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/40 via-blue-800/0 to-blue-500/40 rounded-l-lg" />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 relative bg-[#f2f9f9] dark:bg-slate-900/80 backdrop-blur-md rounded-r-lg shadow-2xl  ">
          <button
            onClick={() => setIsLoginOpen(false)}
            className="absolute top-1 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 text-xl transition"
          >
            &times;
          </button>

          {status === "signin" && (
            <>
              <h2 className="text-3xl font-bold text-center mb-6 text-sky-500 dark:text-sky-300">
                Welcome Back 
              </h2>
              {error && (
                <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
                  {error}
                </div>
              )}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.email}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={formData.password}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>
              <div className="my-4 text-center text-sm text-gray-500">OR</div>
              <OAuth/>
              <p className="mt-6 text-center text-sm">
                Don't have an account?{" "}
                <span
                  onClick={() => setStatus("signup")}
                  className="text-blue-500 hover:text-blue-400 cursor-pointer font-medium"
                >
                  Sign up
                </span>
              </p>
            </>
          )}

          {status === "signup" && (
            <>
              {step === 1 ? (
                <>
                  <h2 className="text-3xl font-bold text-center mb-6 text-sky-500 dark:text-sky-300">
                    Create Your Account 
                  </h2>
                  {error && (
                    <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
                      {error}
                    </div>
                  )}
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={handleRegisterChange}
                        value={registerData.username}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={handleRegisterChange}
                        value={registerData.email}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={handleRegisterChange}
                        value={registerData.password}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
                    >
                      {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                  </form>
                  <p className="mt-6 text-center text-sm">
                    Already have an account?{" "}
                    <span
                      onClick={() => setStatus("signin")}
                      className="text-blue-500 hover:text-blue-400 cursor-pointer font-medium"
                    >
                      Sign in
                    </span>
                  </p>
                  <OAuth/>
                </>
              ) : (
                <VerifyEmail email={email} password={registerData.password}  username={registerData.username} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
