import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { useSelector } from "react-redux";

const AccountSettings = () => {
     const {user} =  useSelector((state)=>state.user);
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

      {/* Personal Details */}
      <div className="border p-5 rounded-md mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold mb-2">Personal Details</h2>
          <p><span className="font-bold">Last Name:</span> Rustom</p>
          <p><span className="font-bold">First Name:</span> Choubey</p>
          <p><span className="font-bold">Phone:</span> +91 XXX-XXX-XXXX</p>
        </div>
        <FiEdit2 className="text-gray-600 cursor-pointer mt-1" />
      </div>

      {/* Email and Password */}
      <div className="border p-5 rounded-md flex justify-between items-start">
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-2">Email & Password</h2>
          <p><span className="font-bold">Email:</span> {user.email}</p>
          <hr className="my-3" />
          <p><span className="font-bold">Password:</span> ••••••••••••••</p>
        </div>
        <FiEdit2 className="text-gray-600 cursor-pointer mt-1" />
      </div>
    </div>
  );
};

export default AccountSettings;
