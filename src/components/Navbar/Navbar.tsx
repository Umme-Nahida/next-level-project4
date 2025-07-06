import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/images/logo.png"
import { Link } from "react-router";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Title */}
          <div className="flex items-center justify-start">
            <img className="size-16" src={logo} alt="" />
            <h1 className="text-2xl font-bold text-green-500">BookManager</h1>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <ul className="flex space-x-6">
               <Link to={'/books'}> 
                  <li className="text-gray-700 hover:text-green-600 font-medium">All Books</li>
               </Link>
               <Link to={'/addBook'}> 
                  <li className="text-gray-700 hover:text-green-600 font-medium">Add Book</li>
               </Link>
               <Link to={'/borrowSummery'}> 
                  <li className="text-gray-700 hover:text-green-600 font-medium">Borrow Summery</li>
               </Link>
            </ul>
            
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <a href="#" className="block text-gray-700 hover:text-green-600 font-medium">All Books</a>
          <a href="#" className="block text-gray-700 hover:text-green-600 font-medium">Add Book</a>
          <a href="#" className="block text-gray-700 hover:text-green-600 font-medium">Borrow Summary</a>
        </div>
      )}
    </nav>
  );
}
