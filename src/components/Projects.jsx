
import { useState } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";
import { Container, Row, Col, Card } from "react-bootstrap";
import propTypes from "prop-types";

const Projects = ({ resumeProjects }) => {
  const [detailsModalShow, setDetailsModalShow] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  if (!resumeProjects) return null;

  return (
    <section id="portfolio" className="projects-section py-5 bg-dark text-light">
      <Container>
        <h1 className="section-title text-center mb-4">
          <i className="fa-solid fa-code-fork me-2"></i>Projects
        </h1>

        <Row className="g-4">
          {resumeProjects.map((project) => (
            <Col key={project.title} xs={12} sm={6} lg={4}>
              <Card
                className="project-card h-100 shadow-sm bg-secondary text-light"
                onClick={() => {
                  setSelectedProject(project);
                  setDetailsModalShow(true);
                }}
                style={{ cursor: "pointer" }}
              >
                <Card.Img
                  variant="top"
                  src={`/assets/project/${project.images[0]}`}
                  alt={project.title}
                  className="project-image"
                />

                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title className="mb-1">{project.title}</Card.Title>
                    <Card.Text className="text-muted">{project.startDate}</Card.Text>
                  </div>

                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-light"
                      onClick={(e) => e.stopPropagation()} // prevent modal trigger on icon click
                    >
                      <i className="fab fa-github fa-lg"></i>
                    </a>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <ProjectDetailsModal
          show={detailsModalShow}
          onHide={() => setDetailsModalShow(false)}
          data={selectedProject}
        />
      </Container>
    </section>
  );
};

Projects.propTypes = {
  resumeProjects: propTypes.array,
};

export default Projects;

