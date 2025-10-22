import { useLocation, Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { Container, Button } from "react-bootstrap";
import { ThemeContext } from "../context/ThemeContext";

const NotFound = () => {
  const location = useLocation();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const bgClass = theme === "dark" ? "bg-dark text-light" : "bg-light text-dark";
  const textMutedClass = theme === "dark" ? "text-light-50" : "text-muted";

  return (
    <div className={`d-flex min-vh-100 align-items-center justify-content-center ${bgClass}`}>
      <Container className="text-center">
        <h1 className="display-1 fw-bold mb-3">404</h1>
        <p className={`fs-4 mb-4 ${textMutedClass}`}>Oops! Page not found</p>
        <Link to="/">
          <Button variant="primary">
            Return to Home
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default NotFound;
