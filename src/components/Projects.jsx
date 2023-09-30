import { useState } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import propTypes from "prop-types";

const Projects = ({ resumeProjects }) => {
  const [detailsModalShow, setDetailsModalShow] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  const openDetailsModal = (project) => {
    setSelectedProject(project);
    setDetailsModalShow(true);
  };

  const closeDetailsModal = () => setDetailsModalShow(false);

  if (!resumeProjects) {
    return null;
  }

  const projectsList = resumeProjects.map((project) => (
    <div className="col-sm-12 col-md-6 col-lg-4" key={project.title}>
      <span className="portfolio-item d-block">
        <div
          className="foto"
          style={{ cursor: "pointer" }}
          onClick={() => openDetailsModal(project)}
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
    </div>
  ));

  return (
    <section id="portfolio">
      <div className="col-md-12">
        <h1 className="section-title" style={{ color: "black" }}>
          <i className="fa-solid fa-code-fork">&nbsp;</i>
          <span>{"projects"}</span>
        </h1>
        <div className="col-md-11 mx-auto">
          <div className="row mx-auto">
            <Slider {...settings}>{projectsList}</Slider>
          </div>
        </div>
        <ProjectDetailsModal
          show={detailsModalShow}
          onHide={closeDetailsModal}
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
