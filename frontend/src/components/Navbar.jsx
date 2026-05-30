import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between z-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-brand rounded flex items-center justify-center font-bold">
          TF
        </div>
        <div className="text-lg font-semibold">TaskFlow</div>
      </div>
      <div className="flex items-center gap-3">
        {user && (
          <>
            <div className="text-sm mr-2">{user.fullName}</div>
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
              {getInitials(user.fullName)}
            </div>
            <button onClick={logout} className="text-sm text-red-400 ml-3">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
