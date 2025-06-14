// import { useState } from "react";
// import ProjectDetailsModal from "./ProjectDetailsModal";
// import { Carousel, Row, Col } from "react-bootstrap";
// import propTypes from "prop-types";

// const Projects = ({ resumeProjects }) => {
//   const [detailsModalShow, setDetailsModalShow] = useState(false);
//   const [selectedProject, setSelectedProject] = useState({});

//   const getProjectsPerSlide = () => {
//     if (window.innerWidth >= 992) return 3;
//     if (window.innerWidth >= 768) return 2;
//     return 1;
//   };

//   const chunkProjects = (arr) => {
//     const size = getProjectsPerSlide();
//     return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
//       arr.slice(i * size, i * size + size)
//     );
//   };

//   if (!resumeProjects) return null;

//   const projectChunks = chunkProjects(resumeProjects);

//   const projectItems = projectChunks.map((chunk, index) => (
//     <Carousel.Item key={index}>
//       <Row>
//         {chunk.map((project) => (
//           <Col key={project.title} xs={12} md={6} lg={4}>
//             <span className="portfolio-item d-block">
//               <div
//                 className="foto"
//                 onClick={() => {
//                   setSelectedProject(project);
//                   setDetailsModalShow(true);
//                 }}
//                 style={{ cursor: "pointer" }}
//               >
//                 <div style={{ maxWidth: "325px" }}>
//                   <img
//                     src={`/assets/project/${project.images[0]}`}
//                     alt={project.title}
//                     height="216"
//                     style={{
//                       marginBottom: 0,
//                       paddingBottom: 0,
//                       position: "relative",
//                     }}
//                   />
//                   <span className="project-date">{project.startDate}</span>
//                   <br />
//                   <p className="project-title-settings mt-3">{project.title}</p>
//                 </div>
//               </div>
//             </span>
//           </Col>
//         ))}
//       </Row>
//     </Carousel.Item>
//   ));

//   return (
//     <section id="portfolio">
//       <div className="col-md-12">
//         <h1 className="section-title" style={{ color: "black" }}>
//           <i className="fa-solid fa-code-fork">&nbsp;</i>
//           <span>{"projects"}</span>
//         </h1>
//         <div className="col-md-12 mx-auto">
//           <Carousel>{projectItems}</Carousel>
//         </div>
//         <ProjectDetailsModal
//           show={detailsModalShow}
//           onHide={() => setDetailsModalShow(false)}
//           data={selectedProject}
//         />
//       </div>
//     </section>
//   );
// };

// Projects.propTypes = {
//   resumeProjects: propTypes.array,
// };

// export default Projects;


















// import { useState } from "react";
// import ProjectDetailsModal from "./ProjectDetailsModal";
// import { Container, Row, Col, Card } from "react-bootstrap";
// import propTypes from "prop-types";

// const Projects = ({ resumeProjects }) => {
//   const [detailsModalShow, setDetailsModalShow] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);

//   if (!resumeProjects) return null;

//   return (
//     <section id="portfolio" className="projects-section py-5">
//       <Container>
//         <h1 className="section-title text-center mb-4">
//           <i className="fa-solid fa-code-fork me-2"></i>Projects
//         </h1>
//         <Row className="g-4">
//           {resumeProjects.map((project) => (
//             <Col key={project.title} xs={12} sm={6} lg={4}>
//               <Card className="project-card h-100" onClick={() => {
//                 setSelectedProject(project);
//                 setDetailsModalShow(true);
//               }}>
//                 <Card.Img
//                   variant="top"
//                   src={`/assets/project/${project.images[0]}`}
//                   alt={project.title}
//                   className="project-image"
//                 />
//                 <Card.Body>
//                   <Card.Title className="text-center">
//                     {project.title}
//                   </Card.Title>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>

//       <ProjectDetailsModal
//         show={detailsModalShow}
//         onHide={() => setDetailsModalShow(false)}
//         data={selectedProject}
//       />
//     </section>
//   );
// };

// Projects.propTypes = {
//   resumeProjects: propTypes.array,
// };

// export default Projects;


import React, { useState } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";
import projectData from "../data/projects.json";

const Projects = () => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setModalShow(true);
  };

  return (
    <section id="projects" className="section-projects py-5">
      <div className="container">
        <h2 className="text-center mb-4">Projects</h2>
        <div className="row">
          {projectData.map((project, index) => (
            <div
              className="col-md-4 mb-4"
              key={index}
              onClick={() => handleCardClick(project)}
              style={{ cursor: "pointer" }}
            >
              <div className="card project-card shadow-sm h-100">
                <img
                  src={`/assets/project/${project.images[0]}`}
                  alt={project.title}
                  className="card-img-top project-image"
                />
                {/* <div className="card-body">
                  <h5 className="card-title">{project.title}</h5>
                  <p className="card-text text-muted">{project.startDate}</p>
                </div> */}
                <div className="card-body d-flex justify-content-between align-items-center">
  <div>
    <h5 className="card-title mb-1">{project.title}</h5>
    <p className="card-text text-muted">{project.startDate}</p>
  </div>
  {project.url && (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-dark"
      onClick={(e) => e.stopPropagation()} // prevents modal from opening when clicking icon
    >
      <i className="fab fa-github fa-lg"></i>
    </a>
  )}
</div>

              </div>
            </div>
          ))}
        </div>
        {modalShow && (
          <ProjectDetailsModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            data={selectedProject}
          />
        )}
      </div>
    </section>
  );
};

export default Projects;
