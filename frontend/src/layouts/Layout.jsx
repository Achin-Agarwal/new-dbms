// src/layouts/Layout.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaHome, FaUsers, FaUtensils, FaFileInvoiceDollar, FaBoxOpen, FaRegListAlt, FaClipboardList, FaSignOutAlt } from "react-icons/fa";

const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 p-4">
        <h2 className="text-2xl font-bold mb-8">Mess Management</h2>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard" className="flex items-center py-2">
                <FaHome className="mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/students" className="flex items-center py-2">
                <FaUsers className="mr-3" />
                Students
              </Link>
            </li>
            <li>
              <Link to="/meals" className="flex items-center py-2">
                <FaUtensils className="mr-3" />
                Meals
              </Link>
            </li>
            <li>
              <Link to="/billing" className="flex items-center py-2">
                <FaFileInvoiceDollar className="mr-3" />
                Billing
              </Link>
            </li>
            <li>
              <Link to="/menu" className="flex items-center py-2">
                <FaRegListAlt className="mr-3" />
                Menu
              </Link>
            </li>
            <li>
              <Link to="/stock" className="flex items-center py-2">
                <FaBoxOpen className="mr-3" />
                Stock
              </Link>
            </li>
            <li>
              <Link to="/suppliers" className="flex items-center py-2">
                <FaClipboardList className="mr-3" />
                Suppliers
              </Link>
            </li>
            <li>
              <Link to="/feedback" className="flex items-center py-2">
                <FaClipboardList className="mr-3" />
                Feedback
              </Link>
            </li>
            <li>
              <Link to="/leave" className="flex items-center py-2">
                <FaClipboardList className="mr-3" />
                Leave Requests
              </Link>
            </li>
            <li>
              <Link to="/profile" className="flex items-center py-2">
                <FaSignOutAlt className="mr-3" />
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button className="bg-red-600 text-white p-2 rounded-lg">Log out</button>
        </div>
        <div className="mt-8">
          <Outlet /> {/* Routes will render here */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
