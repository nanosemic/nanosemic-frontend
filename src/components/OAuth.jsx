import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase";
import { useModal } from "../context/loginBox";
import { useLoad } from "../context/loading";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../redux/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

function OAuth() {
  const { setError, setLoading } = useLoad();
  const { setIsLoginOpen } = useModal();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleGoogleSignin = async (e) => {
  e.preventDefault();
  console.log("Google Sign-In button clicked");
  try {
    setError("");
    setLoading(true);
    setIsLoginOpen(true);

    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    console.log(result.user.displayName);
    console.log(result.user.email);

    const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/google`, {
      name: result.user.displayName,
      email: result.user.email,
    },{withCredentials: true});

    const data = res.data; // ✅ Use this instead of res.json()

    dispatch(setUser({ username: data.username, email: data.email }));
    setIsLoginOpen(false);
    setLoading(false);
    toast.success("Google sign-in successful!");
  } catch (error) {
    console.error("Error during Google Sign-In:", error);
    setLoading(false); // Optional: reset loading state on error
    setError("Google sign-in failed");
    toast.error("Google sign-in failed.");
  }
};


  return (
    <>
      <button
        onClick={handleGoogleSignin}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition"
        // disabled={loading}
        type="button"
      >
        Continue with Google
      </button>
    </>
  );
}

export default OAuth;
