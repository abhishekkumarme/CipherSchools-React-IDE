import React, { useState } from "react";
import { Book, MessageCircle, Video, FileText, Search, X } from "lucide-react";
import { Container, Row, Col, Card, Form, Button, Accordion, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

const Support = () => {
  const { theme } = useContext(ThemeContext);
  const faqs = [
    {
      question: "How do I get started with CodeFlow IDE?",
      answer: "Simply sign up for a free account, and you'll be redirected to your dashboard where you can create your first project. No installation required!"
    },
    {
      question: "Is CodeFlow IDE free to use?",
      answer: "Yes! CodeFlow IDE offers a generous free tier that includes all core features. We also offer premium plans with additional resources and features for power users."
    },
    {
      question: "Can I collaborate with my team?",
      answer: "Absolutely! CodeFlow IDE supports real-time collaboration. You can invite team members to your projects and work together seamlessly."
    },
    {
      question: "How do I deploy my application?",
      answer: "Deploying is as simple as clicking the 'Deploy' button in your project. We'll handle all the infrastructure and provide you with a live URL instantly."
    },
    {
      question: "What frameworks are supported?",
      answer: "CodeFlow IDE primarily supports React and modern JavaScript frameworks. We're constantly adding support for more frameworks based on user feedback."
    },
    {
      question: "Is my code secure?",
      answer: "Yes, we take security seriously. All code is encrypted, and we use industry-standard security practices to protect your projects and data."
    }
  ];

  const resources = [
    { icon: Book, title: "Documentation", description: "Comprehensive guides and API references", color: "primary" },
    { icon: Video, title: "Video Tutorials", description: "Step-by-step video guides for beginners", color: "secondary" },
    { icon: MessageCircle, title: "Community Forum", description: "Get help from our active community", color: "primary" },
    { icon: FileText, title: "Blog", description: "Latest updates and development tips", color: "secondary" }
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const bgClass =
    theme === "dark"
      ? "bg-gradient-dark text-light"
      : "bg-gradient-light text-dark";

  return (
    <div className={`min-vh-100 d-flex flex-column mt-5 ${bgClass}`}>
      <Navbar />

      <main className="flex-grow-1 py-5">
        <Container>
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="fw-bold mb-3">How can we help you?</h1>
            <p className=" mb-4">
              Find answers to common questions and get the support you need
            </p>

            <div className={`mx-auto position-relative ${theme === "dark" ? "bg-dark bg-opacity-75 text-light" : ""}`} style={{ maxWidth: "400px" }}>
              <InputGroup>
                <InputGroup.Text>
                  <Search size={16} />
                </InputGroup.Text>
                <FormControl
                  placeholder="Search for help..."
                  aria-label="Search for help"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <Button
                    variant="outline-secondary"
                    onClick={() => setSearchTerm("")}
                    className={`position-absolute end-0 top-50 translate-middle-y border-0 ${theme === "dark" ? "bg-dark bg-opacity-75 text-light" : ""}`}
                  >
                    <X size={16} />
                  </Button>
                )}
              </InputGroup>
            </div>
          </div>

          

          {/* FAQs */}
          <div className={`mb-5 ${theme === "dark" ? "bg-dark bg-opacity-75 text-light" : ""}`}>
            <h2 className="text-center fw-bold mb-4">Frequently Asked Questions</h2>
            {filteredFaqs.length === 0 ? (
              <p className="text-center ">No FAQs match your search.</p>
            ) : (
              <Accordion defaultActiveKey="0" >
                {filteredFaqs.map((faq, index) => (
                  <Accordion.Item eventKey={index.toString()} key={index}>
                    <Accordion.Header>{faq.question}</Accordion.Header>
                    <Accordion.Body className="text-muted">{faq.answer}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            )}
          </div>

          {/* Contact CTA */}
          <div className="text-center p-5 border rounded-4 mb-5 shadow-sm">
            <h2 className="fw-bold mb-3">Still need help?</h2>
            <p className=" mb-4">
              Our support team is here to help you with any questions or issues
            </p>
            <Link to="/contact">
              <Button variant="primary" className="d-flex align-items-center justify-content-center mx-auto">
                Contact Support <MessageCircle className="ms-2" size={16} />
              </Button>
            </Link>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default Support;
