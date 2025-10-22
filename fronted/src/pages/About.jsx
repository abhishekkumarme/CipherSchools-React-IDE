import React, { useContext } from "react";
import { Code2, Target, Lightbulb, Heart } from "lucide-react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThemeContext } from "../context/ThemeContext";

const About = () => {
  const { theme } = useContext(ThemeContext);

  const bgClass =
    theme === "dark"
      ? "bg-gradient-dark text-light"
      : "bg-gradient-light text-dark";

  return (
    <div className={`min-vh-100 d-flex flex-column mt-5 ${bgClass}`}>
      <Navbar />

      <main className={`flex-grow-1 pt-5 pb-5 px-4 ${bgClass}`}>
        <Container className="text-center mb-5">
          <h1 className="display-4 mb-3">About CodeFlow IDE</h1>
          <p className="lead">
            Empowering developers to build amazing applications, anywhere
          </p>
        </Container>

        <Container className="mb-5">
          <p className="fs-5 text-center mb-5">
            CodeFlow IDE is a revolutionary browser-based development environment designed for modern web developers.
            We believe that powerful development tools should be accessible to everyone, anywhere, without the need
            for complex installations or expensive hardware.
          </p>

          <Row className="g-4 mb-5">
            <Col md={4}>
              <Card className={`text-center shadow-sm h-100 ${theme === "dark" ? "bg-dark bg-opacity-75 text-light" : ""}`}>
                <Card.Body>
                  <div className="mb-3 d-flex justify-content-center align-items-center rounded-circle bg-primary bg-opacity-10" style={{ width: 64, height: 64 }}>
                    <Target className="text-primary" size={28} />
                  </div>
                  <Card.Title>Our Mission</Card.Title>
                  <Card.Text>
                    To democratize web development by providing powerful, accessible tools for developers worldwide
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className={`text-center shadow-sm h-100 ${theme === "dark" ? "bg-dark bg-opacity-75 text-light" : ""}`}>
                <Card.Body>
                  <div className="mb-3 d-flex justify-content-center align-items-center rounded-circle bg-dark bg-opacity-75" style={{ width: 64, height: 64 }}>
                    <Lightbulb className="text-secondary" size={28} />
                  </div>
                  <Card.Title>Our Vision</Card.Title>
                  <Card.Text>
                    A future where anyone can build and deploy web applications without barriers
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className={`text-center shadow-sm h-100 ${theme === "dark" ? "bg-dark bg-opacity-75 text-light" : ""}`}>
                <Card.Body>
                  <div className="mb-3 d-flex justify-content-center align-items-center rounded-circle bg-primary bg-opacity-10" style={{ width: 64, height: 64 }}>
                    <Heart className="text-primary" size={28} />
                  </div>
                  <Card.Title>Our Values</Card.Title>
                  <Card.Text>
                    Accessibility, innovation, and community-driven development at our core
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card className={`shadow-sm p-4 p-md-5 ${theme === "dark" ? "bg-dark bg-opacity-75 text-light" : ""}`}>
            <h2 className="mb-4">Why CodeFlow IDE?</h2>
            <p>
              Traditional development environments often require complex setup processes, powerful hardware,
              and significant storage space. We set out to change that.
            </p>
            <p>
              With CodeFlow IDE, you can start coding immediately from any device with a web browser.
              Our cloud-based infrastructure handles the heavy lifting, allowing you to focus on what
              matters most - building great applications.
            </p>
            <p>
              Whether you're a beginner learning to code or an experienced developer working on complex
              projects, CodeFlow IDE provides the tools and flexibility you need to succeed.
            </p>
          </Card>
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default About;
