import React from "react";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";

const MainLayout = ({ component }) => {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="flex-none w-64  border-r-[2px] border-[#E3E3E3]">
        <SideBar />
      </div>

      <div className="flex flex-col w-full ">
        {/* Topbar */}
        <div className="flex-none p-1 border-[#E3E3E3] border-b-[2px]">
          <TopBar />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100 bg-[#fafafa]">
          {component}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
