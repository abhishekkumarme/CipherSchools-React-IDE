import React, { useState, useContext } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThemeContext } from "../context/ThemeContext";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useContext(ThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const bgClass =
    theme === "dark"
      ? "bg-gradient-dark text-light"
      : "bg-gradient-light text-dark";
  const cardBgClass = theme === "dark" ? "bg-dark bg-opacity-75 text-light" : "";

  return (
    <div className={`d-flex flex-column min-vh-100 ${bgClass}`}>
      <Navbar />

      <main className="flex-grow-1 py-5">
        <Container className="pt-5 pb-4">
          <div className="text-center mb-5">
            <h1 className="fw-bold mb-3">Get in Touch</h1>
            <p className={`fs-5 ${theme === "dark" ? "text-light" : ""}`}>
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <Row className="g-4">
            <Col lg={8}>
              <Card className={`shadow-sm border-0 ${cardBgClass}`}>
                <Card.Body className={`p-4 ${cardBgClass}`}>
                  <Form onSubmit={handleSubmit}>
                    <Row className="g-3 mb-3">
                      <Col md={6}>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="John Doe"
                          required
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="you@example.com"
                          required
                        />
                      </Col>
                    </Row>

                    <div className="mb-3 ">
                      <Form.Label>Subject</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="How can we help you?"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Tell us more about your inquiry..."
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-100 d-flex justify-content-center align-items-center"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "Send Message"}
                      <Send size={18} className="ms-2" />
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              <Card className={`shadow-sm border-0 mb-4 ${cardBgClass}`}>
                <Card.Body className="d-flex">
                  <div className="bg-primary bg-opacity-10 rounded-3 p-3 me-3 d-flex align-items-center justify-content-center">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <h5 className="fw-semibold mb-1">Email</h5>
                    <a
                      href="mailto:support@codeflow.dev"
                      className={`text-decoration-none ${theme === "dark" ? "text-light" : "text-muted"}`}
                    >
                      support@codeflow.dev
                    </a>
                  </div>
                </Card.Body>
              </Card>

              <Card className={`shadow-sm border-0 mb-4 ${cardBgClass}`}>
                <Card.Body className="d-flex">
                  <div className="bg-info bg-opacity-10 rounded-3 p-3 me-3 d-flex align-items-center justify-content-center">
                    <Phone className="text-info" size={24} />
                  </div>
                  <div>
                    <h5 className="fw-semibold mb-1">Phone</h5>
                    <a
                      href="tel:+1234567890"
                      className={`text-decoration-none ${theme === "dark" ? "text-light" : "text-muted"}`}
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </Card.Body>
              </Card>

              <Card className={`shadow-sm border-0 ${cardBgClass}`}>
                <Card.Body className="d-flex">
                  <div className="bg-primary bg-opacity-10 rounded-3 p-3 me-3 d-flex align-items-center justify-content-center">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h5 className="fw-semibold mb-1">Office</h5>
                    <p className={`mb-0 ${theme === "dark" ? "text-light-50" : "text-muted"}`}>
                      123 Tech Street <br />
                      San Francisco, CA 94102
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
