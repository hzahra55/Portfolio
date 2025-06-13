import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Badge } from "react-bootstrap";
import propTypes from "prop-types";

const Education = ({ resumeEducation }) => {
  if (!resumeEducation) {
    return null;
  }

  const educationElements = resumeEducation.map((study, i) => (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      date={study.years}
      iconStyle={{
        background: "#fff",
        color: "#00558d",
        textAlign: "center",
      }}
      icon={
        <img
          src={`/assets/education/${study.logo}`}
          alt={study.name}
          className="vertical-timeline-element-icon"
        />
      }
      key={i}
    >
      <h4
        className="vertical-timeline-element-subtitle"
        style={{ textAlign: "left" }}
      >
        {study.name}
      </h4>
      <h3
        className="vertical-timeline-element-title"
        style={{ textAlign: "left" }}
      >
        {study.title}
      </h3>
      <div
        className="text-left mt-3"
        style={{ textAlign: "left", marginTop: "15px" }}
      >
        <Badge className="main-badge mr-2 mb-2">{study.grade}</Badge>
      </div>
    </VerticalTimelineElement>
  ));

  return (
    <section id="portfolio" className="pb-5">
      <div className="col-md-12 mx-auto">
        <div className="col-md-12">
          <h1 className="section-title" style={{ color: "black" }}>
            <i className="fa-solid fa-school">&nbsp;</i>
            {"education"}
          </h1>
        </div>
      </div>
      <div className="col-md-8 mx-auto">
        <VerticalTimeline>
          {educationElements}
          <VerticalTimelineElement
            iconStyle={{
              background: "#AE944F",
              color: "#fff",
              textAlign: "center",
            }}
            icon={
              <i className="fas fa-user-graduate mx-auto experience-icon"></i>
            }
          />
        </VerticalTimeline>
      </div>
    </section>
  );
};

Education.propTypes = {
  resumeEducation: propTypes.array,
};

export default Education;
