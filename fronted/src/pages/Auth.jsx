import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Code2, Mail, Lock, User } from "lucide-react";
import { Container, Card, Button, Nav, Tab } from "react-bootstrap";
import { loginUserFunction, signupUserFunction } from "../utils/UserUtils";
import { ThemeContext } from "../context/ThemeContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("signin");
  const navigate = useNavigate();

  const [LoginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const [SignUpCredentials, setSignUpCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { theme } = useContext(ThemeContext);
  const iconColor = theme === "dark" ? "#f8f9fa" : "#212529";

  const bgClass =
    theme === "dark"
      ? "bg-gradient-dark text-light"
      : "bg-gradient-light text-dark";

  const inputClass =
    theme === "dark"
      ? "form-control bg-dark text-light border-secondary ps-5"
      : "form-control ps-5";

  // ---------- VALIDATIONS ----------
  const LoginValidate = () =>
    LoginCredentials.email?.length > 0 && LoginCredentials.password?.length > 0;

  const SignUpValidateData = () =>
    SignUpCredentials.firstName?.length > 0 &&
    SignUpCredentials.lastName?.length > 0 &&
    SignUpCredentials.email?.length > 0 &&
    SignUpCredentials.password?.length > 0;

  // ---------- FORM SUBMIT HANDLER ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeTab === "signin") {
      await handleLoginSubmit();
    } else {
      await handleSignUpSubmit();
    }
  };

  // ---------- LOGIN ----------
  const handleLoginSubmit = async () => {
    console.log("Login submitted with credentials:", LoginCredentials);
    if (LoginValidate()) {
      const user = await loginUserFunction(LoginCredentials);
      navigate("/");
      alert("Login Successful!");
    } else {
      alert("Please fill all login fields.");
    }
  };

  // ---------- SIGNUP ----------
  const handleSignUpSubmit = async () => {
    console.log("Signup submitted with data:", SignUpCredentials);
    if (SignUpValidateData()) {
      const user = await signupUserFunction(SignUpCredentials);
      navigate("/");
      alert("Signup Successful!");
    } else {
      alert("Please fill all signup fields.");
    }
  };

  // ---------- INPUT HANDLERS ----------
  const handleLoginChange = (e) => {
    setLoginCredentials({
      ...LoginCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUpChange = (e) => {
    setSignUpCredentials({
      ...SignUpCredentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Navbar />
      <div
        className={`d-flex align-items-center justify-content-center min-vh-100 position-relative ${bgClass}`}
      >
        <Container
          className="position-relative"
          style={{ zIndex: 2, maxWidth: "480px" }}
        >
          {/* Header */}
          <div className="text-center mb-4 mt-5">
            <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 p-3 rounded-3 mt-5">
              <Code2 className="text-primary" size={28} />
            </div>
            <h3 className="fw-bold mt-3 mb-0 text-primary">CodeFlow IDE</h3>
          </div>

          {/* Tabs */}
          <Tab.Container
            activeKey={activeTab}
            onSelect={(key) => setActiveTab(key)}
          >
            <Nav variant="tabs" fill className="mb-3">
              <Nav.Item>
                <Nav.Link
                  eventKey="signin"
                  className={
                    theme === "dark"
                      ? "bg-dark bg-opacity-75 text-light"
                      : ""
                  }
                >
                  Sign In
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="signup"
                  className={
                    theme === "dark"
                      ? "bg-dark bg-opacity-75 text-light"
                      : ""
                  }
                >
                  Sign Up
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              {/* ---------- SIGN IN ---------- */}
              <Tab.Pane eventKey="signin">
                <Card
                  className={`shadow-sm border-0 mb-5 ${
                    theme === "dark"
                      ? "bg-dark bg-opacity-75 text-light"
                      : ""
                  }`}
                >
                  <Card.Body>
                    <h5 className="fw-bold mb-2">Welcome back</h5>
                    <p className="mb-4">Sign in to your account to continue</p>

                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="signinEmail" className="form-label">
                          Email
                        </label>
                        <div className="position-relative">
                          <Mail
                            size={16}
                            className="position-absolute top-50 translate-middle-y ms-2"
                            color={iconColor}
                          />
                          <input
                            type="email"
                            id="signinEmail"
                            name="email"
                            className={inputClass}
                            placeholder="you@example.com"
                            value={LoginCredentials.email}
                            onChange={handleLoginChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="signinPassword" className="form-label">
                          Password
                        </label>
                        <div className="position-relative">
                          <Lock
                            size={16}
                            className="position-absolute top-50 translate-middle-y ms-2"
                            color={iconColor}
                          />
                          <input
                            type="password"
                            id="signinPassword"
                            name="password"
                            className={inputClass}
                            placeholder="••••••••"
                            value={LoginCredentials.password}
                            onChange={handleLoginChange}
                            required
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-100"
                        variant="primary"
                      >
                        Sign In
                      </Button>
                    </form>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* ---------- SIGN UP ---------- */}
              <Tab.Pane eventKey="signup">
                <Card
                  className={`shadow-sm border-0 mb-5 ${
                    theme === "dark"
                      ? "bg-dark bg-opacity-75 text-light"
                      : ""
                  }`}
                >
                  <Card.Body>
                    <h5 className="fw-bold mb-2">Create an account</h5>
                    <p className="mb-4">
                      Get started with CodeFlow IDE for free
                    </p>

                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="signupFirstName" className="form-label">
                          First Name
                        </label>
                        <div className="position-relative">
                          <User
                            size={16}
                            className="position-absolute top-50 translate-middle-y ms-2"
                            color={iconColor}
                          />
                          <input
                            type="text"
                            id="signupFirstName"
                            name="firstName"
                            className={inputClass}
                            placeholder="John"
                            value={SignUpCredentials.firstName}
                            onChange={handleSignUpChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="signupLastName" className="form-label">
                          Last Name
                        </label>
                        <div className="position-relative">
                          <User
                            size={16}
                            className="position-absolute top-50 translate-middle-y ms-2"
                            color={iconColor}
                          />
                          <input
                            type="text"
                            id="signupLastName"
                            name="lastName"
                            className={inputClass}
                            placeholder="Doe"
                            value={SignUpCredentials.lastName}
                            onChange={handleSignUpChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="signupEmail" className="form-label">
                          Email
                        </label>
                        <div className="position-relative">
                          <Mail
                            size={16}
                            className="position-absolute top-50 translate-middle-y ms-2"
                            color={iconColor}
                          />
                          <input
                            type="email"
                            id="signupEmail"
                            name="email"
                            className={inputClass}
                            placeholder="you@example.com"
                            value={SignUpCredentials.email}
                            onChange={handleSignUpChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="signupPassword" className="form-label">
                          Password
                        </label>
                        <div className="position-relative">
                          <Lock
                            size={16}
                            className="position-absolute top-50 translate-middle-y ms-2"
                            color={iconColor}
                          />
                          <input
                            type="password"
                            id="signupPassword"
                            name="password"
                            className={inputClass}
                            placeholder="••••••••"
                            value={SignUpCredentials.password}
                            onChange={handleSignUpChange}
                            required
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-100"
                        variant="primary"
                      >
                        Create Account
                      </Button>
                    </form>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Auth;
