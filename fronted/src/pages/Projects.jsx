import React, { useState, useEffect, useContext } from "react";
import { Code2, Plus, Search, Edit, Trash2 } from "lucide-react";
import { Container, Row, Col, Card, Form, Button, InputGroup, FormControl, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThemeContext } from "../context/ThemeContext";
import { getUserProjects, createProject, deleteProject } from "../api's/ProjectApi";

const Projects = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [displayedCount, setDisplayedCount] = useState(9);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ projectName: "", description: "" });
  const [loading, setLoading] = useState(false);

  // Fetch projects on load
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getUserProjects();
        setProjects(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

 const filteredProjects = projects.filter(
  (project) =>
    project.projectName &&
    project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
);


  // Modal handlers
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleProjectChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleCreateProject = async () => {
    if (!newProject.projectName) return alert("Project name is required!");
    try {
      const created = await createProject(newProject);
      setProjects([created, ...projects]);
      setNewProject({ projectName: "", description: "" });
      setShowModal(false);
      alert(`${created.projectName}Project created successfully!`);
      navigate(`/studio/${created._id}`);
    } catch (err) {
      console.error("Failed to create project:", err);
    }
  };

  // Delete project
  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  // Navigate to edit
  const handleEditProject = (id) => {
    navigate(`/studio/${id}`);
  };

  // Load more
  const handleLoadMore = () => {
    setDisplayedCount(displayedCount + 9);
  };

  const bgClass = theme === "dark" ? "bg-gradient-dark text-light" : "bg-gradient-light text-dark";
  const inputBgClass = theme === "dark" ? "bg-secondary bg-opacity-10 text-light" : "bg-white text-dark";
  const cardBgClass = theme === "dark" ? "bg-dark bg-opacity-75 text-light" : "";

  return (
    <>
      <Navbar />
      <div className={`d-flex flex-column min-vh-100 ${bgClass}`}>
        <main className="flex-grow-1 py-5 mt-5">
          <Container>
            {/* Header */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
              <div>
                <h1 className="fw-bold mb-1">Your Projects</h1>
                <p className="mb-0">Manage and organize all your CodeFlow projects</p>
              </div>
              <Button variant="primary" className="d-flex align-items-center mt-3 mt-md-0" onClick={handleModalShow}>
                <Plus className="me-2" size={18} /> New Project
              </Button>
            </div>

            {/* Search */}
            <div className="mb-4">
              <InputGroup>
                <InputGroup.Text className={bgClass}>
                  <Search size={16} />
                </InputGroup.Text>
                <FormControl
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={inputBgClass}
                />
              </InputGroup>
            </div>

            {/* Projects Grid */}
            {loading ? (
              <p className="text-center fs-5">Loading projects...</p>
            ) : filteredProjects.length > 0 ? (
              <>
                <Row xs={1} md={2} lg={3} className="g-4">
                  {filteredProjects.slice(0, displayedCount).map((project) => (
                    <Col key={project._id}>
                      <Card className={`h-100 shadow-sm ${cardBgClass}`}>
                        <Card.Body className="d-flex flex-column">
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div className="bg-primary bg-opacity-10 rounded-3 p-2 d-flex align-items-center justify-content-center">
                              <Code2 className="text-primary" size={24} />
                            </div>
                            <div className="d-flex gap-2">
                              <Button variant="outline-primary" size="sm" onClick={() => handleEditProject(project._id)}>
                                <Edit size={16} /> Edit
                              </Button>
                              <Button variant="outline-danger" size="sm" onClick={() => handleDeleteProject(project._id)}>
                                <Trash2 size={16} /> Delete
                              </Button>
                            </div>
                          </div>
                          <h5 className="fw-semibold">{project.projectName}</h5>
                          <p className="small mb-3">Last edited {new Date(project.updatedAt).toLocaleString()}</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
                {displayedCount < filteredProjects.length && (
                  <div className="text-center mt-4">
                    <Button variant="secondary" onClick={handleLoadMore}>
                      Load More
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-5">
                <div className="mb-3" style={{ fontSize: "3rem" }}>📂</div>
                <h4 className="fw-bold mb-2">No Projects Yet!</h4>
                <p className={`fs-5 mb-4 ${theme === "dark" ? "text-light-50" : ""}`}>
                  You haven’t started any projects yet. Click below to create your first awesome project!
                </p>
                <Button variant="primary" size="lg" onClick={handleModalShow}>
                  ➕ Create Your First Project
                </Button>
              </div>
            )}

            {/* Create Project Modal */}
            <Modal show={showModal} onHide={handleModalClose}>
              <Modal.Header closeButton>
                <Modal.Title>Create New Project</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Project Name *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter project name"
                      name="projectName"
                      value={newProject.projectName}
                      onChange={handleProjectChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter project description"
                      name="description"
                      value={newProject.description}
                      onChange={handleProjectChange}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleCreateProject}>
                  Create Project
                </Button>
              </Modal.Footer>
            </Modal>
          </Container>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Projects;
