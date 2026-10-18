import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { navbarConfig } from "../../config/navbarConfig";
const Navbar = () => {
    const navigate = useNavigate();
    const { logout, isLoggedIn } = useAuth();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            await logout();
            navigate("/login", { replace: true });
        }
        catch (error) {
            console.error("Logout failed:", error);
            navigate("/login", { replace: true });
        }
        finally {
            setIsLoggingOut(false);
        }
    };
    return (<nav className="border-b border-gray-800 bg-black px-8 py-4">
      <div className="flex items-center justify-between gap-4">
        <Link to="/" className="text-xl font-light tracking-wider text-white transition hover:text-gray-300">
          Resonance
        </Link>

        <div className="flex items-center gap-12">
          {navbarConfig.map((item) => (<NavLink key={item.path} to={item.path} className={({ isActive }) => `pb-1 text-xs font-semibold uppercase tracking-[0.12em] transition ${isActive
                ? "border-b-2 border-white text-white"
                : "text-gray-400 hover:text-white"}`}>
              {item.label}
            </NavLink>))}
        </div>

        {isLoggedIn ? (<button type="button" aria-label="Log out" title="Log out" onClick={handleLogout} disabled={isLoggingOut} className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 p-2 text-gray-200 transition hover:border-white/30 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-60">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-[1.8]">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <path d="M16 17l5-5-5-5"/>
              <path d="M21 12H9"/>
            </svg>
          </button>) : null}
      </div>
    </nav>);
};
export default Navbar;
