import { Link } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import useLogout from "../hooks/useLogout";
import { Bell, SignOut, Users } from "phosphor-react";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-neutral-900 border-b border-neutral-800 fixed top-0 z-30 h-16 w-full">
      <div className="px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between w-full">
        {/* Brand */}
        <Link
          to="/"
          className="text-xl font-mono font-semibold tracking-widest text-slate-300"
        >
          Tarunet
        </Link>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Link
            to="/notifications"
            className="hover:bg-neutral-800 rounded-full p-2 transition"
            title="Notifications"
          >
            <Bell
              size={22}
              weight="bold"
              className="text-gray-400 hover:text-white"
            />
          </Link>

          {/* Friends */}
          <Link
            to="/friends"
            className="hover:bg-neutral-800 rounded-full p-2 transition"
            title="Friends"
          >
            <Users
              size={22}
              weight="bold"
              className="text-gray-400 hover:text-white"
            />
          </Link>

          {/* Avatar */}
          <div
            className="w-9 h-9 rounded-full overflow-hidden border border-neutral-700"
            title={authUser?.fullName || "User"}
          >
            <img
              src={authUser?.profilePic || "/default-avatar.png"}
              alt="User Avatar"
              className="w-full h-full object-cover"
              loading="lazy"
              draggable="false"
            />
          </div>

          {/* Logout */}
          <button
            onClick={logoutMutation}
            className="hover:bg-neutral-800 rounded-full p-2 transition"
            title="Logout"
          >
            <SignOut
              size={22}
              weight="bold"
              className="text-gray-400 hover:text-white"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
