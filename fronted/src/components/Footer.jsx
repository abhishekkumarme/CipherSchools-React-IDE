import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Code2 } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // Ensure body classes stay consistent with theme
    document.body.classList.toggle("bg-dark", theme === "dark");
    document.body.classList.toggle("text-light", theme === "dark");
  }, [theme]);

  return (
    <footer className={`${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"} mt-5 border-top py-5`}>
      <div className="container">
        <div className="row gy-4">
          {/* Brand */}
          <div className="col-12 col-md-6">
            <Link to="/" className="d-flex align-items-center mb-3 text-decoration-none">
              <div className="p-2 rounded bg-primary bg-opacity-25 me-2 d-flex align-items-center justify-content-center">
                <Code2 size={22} className="text-primary" />
              </div>
              <span className="fs-4 fw-bold text-primary">React IDE</span>
            </Link>
            <p className="">
              The modern browser-based IDE for React development. Build, test, and deploy your applications with ease.
            </p>
          </div>

          {/* Product */}
          <div className="col-6 col-md-3">
            <h5 className="fw-semibold mb-3">Product</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/about" className=" text-decoration-none">
                  About
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/projects" className=" text-decoration-none">
                  Projects
                </Link>
              </li>
              
            </ul>
          </div>

          {/* Support */}
          <div className="col-6 col-md-3">
            <h5 className="fw-semibold mb-3">Support</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/contact" className=" text-decoration-none">
                  Contact
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/support" className=" text-decoration-none">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom line */}
        <div className="border-top mt-4 pt-3 text-center  small">
          <p className="mb-0">&copy; {currentYear} CodeFlow IDE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
