import { useSelector } from "react-redux";
import { Outlet,Navigate } from "react-router-dom";
import { useEffect } from "react";

export default function PrivateRoute (){
    const {user} = useSelector((state)=>state.user);
//     useEffect(() => {
//     if (!user) {
//       dispatch(clearUser()); // just update state, no navigation
//     }
//   }, [user, dispatch]);
    return user? <Outlet/>:<Navigate to="/" />
}

