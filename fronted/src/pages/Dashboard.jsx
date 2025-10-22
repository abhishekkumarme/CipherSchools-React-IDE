import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThemeContext } from "../context/ThemeContext";
import { getLocalUser } from "../utils/UserUtils";
import { getUserProjects } from "../api's/ProjectApi";

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (isSignedIn) {
      const fetchProjects = async () => {
        try {
          const userProjects = await getUserProjects();

          const latestProjects = userProjects
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3);
          setProjects(latestProjects);
        } catch (err) {
          console.error("Failed to fetch projects:", err);
        }
      };
      fetchProjects();
    }
  }, [isSignedIn]);

  useEffect(() => {
    const user = getLocalUser();
    setIsSignedIn(!!user);
    setFadeIn(true);
  }, []);

  const handleStartBuilding = () => {
    if (isSignedIn) navigate("/projects");
    else navigate("/auth");
  };


  const bgClass = theme === "dark" ? "bg-gradient-dark text-light" : "bg-gradient-light text-dark";
  const cardBgClass = theme === "dark" ? "bg-dark bg-opacity-50 text-light" : "bg-white";

  return (
    <div className={`d-flex flex-column min-vh-100 ${bgClass} ${fadeIn ? "fade-in" : ""}`}>
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section py-5 mt-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0 text-start hero-text">
              <h1 className="display-4 fw-bold mb-3">
                Build, Edit & Run Your Code <span className="text-gradient-primary">In One Place</span>
              </h1>
              <p className="lead mb-4">
                CodeFlow IDE gives you a browser-based coding experience — write, manage, and test your
                projects anytime, anywhere without installing heavy tools.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <button onClick={handleStartBuilding} className="btn btn-gradient-primary btn-lg">
                  Start Building Free 🚀
                </button>
                <Link to="/studio" className="btn btn-outline-gradient btn-lg">
                  Explore Features
                </Link>
              </div>
            </div>

            <div className="col-lg-6 d-none d-lg-block">
              <div className="rounded-4 shadow hero-image-container">
                <img
                  src="/hero-code.jpg"
                  alt="Code editor interface"
                  className="img-fluid rounded-4 hero-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-3 display-5 text-gradient-secondary">
            Powerful Tools for Smarter Coding
          </h2>
          <p className={`fs-5 mb-5 ${theme === "dark" ? "text-light-50" : ""}`}>
            Everything you need to create, manage, and run your web projects with ease.
          </p>

          <div className="row g-4">
            {[
              {
                title: "Fast & Lightweight",
                icon: "⚡",
                desc: "Experience quick loading times and an efficient coding environment built for productivity.",
                list: ["Instant preview", "Optimized performance", "Smooth navigation"],
                border: "primary",
              },
              {
                title: "Smart File Management",
                icon: "📁",
                desc: "Create, edit, and organize your project files effortlessly — all inside your browser.",
                list: ["Create projects", "Edit code files", "Auto-save functionality"],
                border: "info",
              },
              {
                title: "Customizable Theme",
                icon: "🎨",
                desc: "Switch between light and dark mode instantly to suit your style and comfort.",
                list: ["User preference saved", "Dark/light toggle", "Smooth theme transition"],
                border: "success",
              },
            ].map((feature, idx) => (
              <div key={idx} className="col-md-4">
                <div className={`card h-100 shadow-sm border-${feature.border} feature-card ${theme === "dark" ? "bg-dark bg-opacity-75 text-light" : ""}`}>
                  <div className="card-body text-start">
                    <div className={`mb-3 bg-${feature.border} bg-opacity-10 d-inline-flex p-3 rounded`}>
                      {feature.icon}
                    </div>
                    <h3 className="fw-bold">{feature.title}</h3>
                    <p className={`${theme === "dark" ? "text-light-50" : ""}`}>{feature.desc}</p>
                    <ul className="list-unstyled">
                      {feature.list.map((item, i) => (
                        <li key={i}>✅ {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {isSignedIn && (
        <section className="py-5">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold fs-2 text-gradient-primary">Your Projects</h2>
              {projects.length > 0 && (
                <button
                  onClick={() => navigate("/projects")}
                  className="btn btn-gradient-primary"
                >
                  Show All
                </button>
              )}
            </div>

            {projects.length > 0 ? (
              <div className="row g-4">
                {projects.map((project) => (
                  <div key={project._id} className="col-md-4">
                    <div className={`card shadow-sm border ${cardBgClass} project-card`}>
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div className="bg-primary bg-opacity-10 p-3 rounded">💻</div>
                          <span className="badge bg-primary">{project.status}</span>
                        </div>
                        <h5 className="fw-semibold">{project.name}</h5>
                        <p className={`small mb-0 ${theme === "dark" ? "text-light-50" : ""}`}>
                          Last edited {new Date(project.updatedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <div className="mb-3" style={{ fontSize: "3rem" }}>📂</div>
                <h4 className="fw-bold mb-2">No Projects Yet!</h4>
                <p className={`fs-5 mb-4 ${theme === "dark" ? "text-light-50" : ""}`}>
                  It looks like you haven’t started any projects. Let’s create something amazing!
                </p>
                <button
                  onClick={() => navigate("/projects")}
                  className="btn btn-gradient-primary btn-lg"
                >
                  ➕ Create Your First Project
                </button>
              </div>
            )}
          </div>
        </section>
      )}


      {/* CTA Section */}
      <section className="py-5 text-center">
        <div className="container">
          <h2 className="fw-bold display-5 text-gradient-primary mb-3">
            Ready to Start Your Next Project?
          </h2>
          <p className={`fs-5 mb-4 ${theme === "dark" ? "text-light-50" : ""}`}>
            Get started now and experience the simplest way to build and manage your code online.
          </p>
          <button onClick={handleStartBuilding} className="btn btn-gradient-primary btn-lg">
            Start Building 🚀
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
