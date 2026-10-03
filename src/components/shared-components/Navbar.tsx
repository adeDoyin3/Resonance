import { Link, NavLink } from "react-router-dom";
import { navbarConfig } from "../../config/navbarConfig";

const Navbar = () => {
  return (
    <nav className="bg-black border-b border-gray-800 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-light tracking-wider text-white hover:text-gray-300 transition"
        >
          Resonance
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-12">
          {navbarConfig.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-xs font-semibold tracking-[0.12em] uppercase transition pb-1 ${
                  isActive
                    ? "text-white border-b-2 border-white"
                    : "text-gray-400 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
