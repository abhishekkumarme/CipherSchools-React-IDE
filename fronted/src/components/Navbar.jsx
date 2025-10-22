import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun, Code2 } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";
import { getLocalUser, logoutUserFunction } from "../utils/UserUtils";
import { themeUpdateFunction } from "../utils/UserUtils";

export default function Navbar() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleTheme = async () => {
  if (user) {
    // Logged-in user: update theme on backend
    const updatedUser = await themeUpdateFunction();
    setUser(updatedUser);
    setTheme(updatedUser.theme);
    localStorage.setItem("theme", updatedUser.theme);
    document.body.classList.toggle("bg-dark", updatedUser.theme === "dark");
    document.body.classList.toggle("text-light", updatedUser.theme === "dark");
  } else {
    // Guest: just toggle locally
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.classList.toggle("bg-dark", newTheme === "dark");
    document.body.classList.toggle("text-light", newTheme === "dark");
  }
};

  // ---------- INITIAL THEME ----------
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    document.body.classList.toggle("bg-dark", initialTheme === "dark");
    document.body.classList.toggle("text-light", initialTheme === "dark");
  }, [setTheme]);

  // ---------- CHECK USER LOGIN ----------
  useEffect(() => {
    const currentUser = getLocalUser();
    setUser(currentUser);
  }, []);

  useEffect(() => {
  const currentUser = getLocalUser();
  setUser(currentUser);

  const savedTheme = currentUser?.theme || localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const initialTheme = savedTheme || systemTheme;

  setTheme(initialTheme);
  document.body.classList.toggle("bg-dark", initialTheme === "dark");
  document.body.classList.toggle("text-light", initialTheme === "dark");
}, [setTheme]);



  // ---------- LOGOUT ----------
  const handleLogout = async () => {
    await logoutUserFunction();
    setUser(null);
    navigate("/auth");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top ${
        theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"
      } shadow-sm`}
    >
      <div className="container-fluid px-4">
        {/* Brand */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <div className="p-2 rounded bg-primary bg-opacity-25 me-2">
            <Code2 size={22} className="text-primary" />
          </div>
          <span className="fw-bold text-primary">CodeFlow IDE</span>
        </Link>

        {/* Toggler Button (Fix) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Items */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center gap-2">
            {/* Theme Toggle */}
            <li className="nav-item">
              <button
                onClick={toggleTheme}
                className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
              >
                {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            </li>

            {/* Projects */}
            <li className="nav-item">
              <Link to="/projects" className="btn btn-outline-primary">
                Projects
              </Link>
            </li>

            {/* Auth Buttons */}
            {user ? (
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-danger text-white"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/auth" className="btn btn-primary text-white">
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
