
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container flex flex-col md:flex-row">
        <div className="w-full md:hidden py-2">
          <div className="overflow-x-auto pb-2 pt-2">
            <div className="flex space-x-2 px-4">
              <div className="rounded-full bg-academic-light-gray px-3 py-1 text-sm">All</div>
              <div className="rounded-full bg-white border border-academic-light-gray px-3 py-1 text-sm whitespace-nowrap">Computer Science</div>
              <div className="rounded-full bg-white border border-academic-light-gray px-3 py-1 text-sm whitespace-nowrap">Mathematics</div>
              <div className="rounded-full bg-white border border-academic-light-gray px-3 py-1 text-sm">Biology</div>
              <div className="rounded-full bg-white border border-academic-light-gray px-3 py-1 text-sm">Chemistry</div>
              <div className="rounded-full bg-white border border-academic-light-gray px-3 py-1 text-sm">Literature</div>
            </div>
          </div>
        </div>
        <div className="hidden md:block border-r">
          <Sidebar />
        </div>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
