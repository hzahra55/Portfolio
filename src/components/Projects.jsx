import { useState } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";
import { Carousel, Row, Col } from "react-bootstrap";
import propTypes from "prop-types";

const Projects = ({ resumeProjects }) => {
  const [detailsModalShow, setDetailsModalShow] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});

  const getProjectsPerSlide = () => {
    if (window.innerWidth >= 992) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const chunkProjects = (arr) => {
    const size = getProjectsPerSlide();
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  if (!resumeProjects) return null;

  const projectChunks = chunkProjects(resumeProjects);

  const projectItems = projectChunks.map((chunk, index) => (
    <Carousel.Item key={index}>
      <Row>
        {chunk.map((project) => (
          <Col key={project.title} xs={12} md={6} lg={4}>
            <span className="portfolio-item d-block">
              <div
                className="foto"
                onClick={() => {
                  setSelectedProject(project);
                  setDetailsModalShow(true);
                }}
                style={{ cursor: "pointer" }}
              >
                <div style={{ maxWidth: "325px" }}>
                  <img
                    src={`/assets/project/${project.images[0]}`}
                    alt={project.title}
                    height="216"
                    style={{
                      marginBottom: 0,
                      paddingBottom: 0,
                      position: "relative",
                    }}
                  />
                  <span className="project-date">{project.startDate}</span>
                  <br />
                  <p className="project-title-settings mt-3">{project.title}</p>
                </div>
              </div>
            </span>
          </Col>
        ))}
      </Row>
    </Carousel.Item>
  ));

  return (
    <section id="portfolio">
      <div className="col-md-12">
        <h1 className="section-title" style={{ color: "black" }}>
          <i className="fa-solid fa-code-fork">&nbsp;</i>
          <span>{"projects"}</span>
        </h1>
        <div className="col-md-12 mx-auto">
          <Carousel>{projectItems}</Carousel>
        </div>
        <ProjectDetailsModal
          show={detailsModalShow}
          onHide={() => setDetailsModalShow(false)}
          data={selectedProject}
        />
      </div>
    </section>
  );
};

Projects.propTypes = {
  resumeProjects: propTypes.array,
};

export default Projects;
