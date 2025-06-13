import React, { useState } from "react";
import Sidebar from "./Sidebar";
import AccountOverview from "./AccountOverview";
import MyOrders from "./MyOrders";
// import Wishlist from "./Wishlist";
import Addresses from "./Addresses";
import AccountSettings from "./AccountSettings";

const AccountLayout = () => {
  const [currentTab, setCurrentTab] = useState("overview");

  const renderTab = () => {
    switch (currentTab) {
      case "overview":
        return <AccountOverview />;
      case "orders":
        return <MyOrders />;
    //   case "wishlist":
    //     return <Wishlist />;
      case "addresses":
        return <Addresses />;
      case "settings":
        return <AccountSettings />;
      default:
        return <AccountOverview />;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
        <div className="">
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </div>
      <main className="flex-1 bg-white">{renderTab()}</main>
    </div>
  );
};

export default AccountLayout;
