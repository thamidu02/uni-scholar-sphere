
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <div className="mr-2 h-8 w-8 rounded-full bg-academic-navy flex items-center justify-center">
              <span className="text-white font-bold">U</span>
            </div>
            <span className="hidden md:inline-block font-serif text-xl font-bold text-academic-navy">
              UniAcademic
            </span>
          </Link>
        </div>

        <div className="flex-1 px-2 md:px-8">
          <div className="relative w-full max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Search discussions..." 
              className="pl-10 bg-gray-50 border border-gray-200"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">Sign In</Button>
          <Button size="sm" className="bg-academic-navy hover:bg-academic-navy/90">Sign Up</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
