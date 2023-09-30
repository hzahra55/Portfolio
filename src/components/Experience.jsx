import { Card, Col, Container, Row, ListGroup } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";
import PropTypes from "prop-types";

const ExperienceCard = ({ experience }) => {
  return (
    <Col lg="6" className="mx-auto">
      <Fade direction={"up"} triggerOnce={true}>
        <Card
          className="shadow-lg--hover mb-4 shadow border-0 text-center rounded"
          style={{ flex: 1, height: "auto", lineHeight: "200%" }}
        >
          <Card.Body>
            <img
              src={`/assets/experience/${experience.companyLogo}`}
              className="shadow mb-3"
              alt={experience.companyLogo}
              style={{
                objectFit: "cover",
                left: 0,
                right: 0,
                top: "7rem",
                marginLeft: "auto",
                marginRight: "auto",
                width: "8rem",
                height: "8rem",
                borderRadius: "50%",
              }}
            />
            <Card.Title as="h3" className="mb-2">
              {experience.company}
            </Card.Title>
            <Card.Subtitle as="h4" className="mb-2">
              {experience.role}
            </Card.Subtitle>
            <Card.Subtitle as="div">{experience.date}</Card.Subtitle>
            <Card.Text
              as="div"
              className="description my-3 text-left mx-4 px-5"
              style={{
                fontSize: "132%",
                textAlign: "justify",
                lineHeight: 1.6,
              }}
            >
              {experience.desc}
              <ListGroup className="list-group-flush">
                {experience.descBullets.map((desc, index) => (
                  <ListGroup.Item key={index}>{desc}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Text>
          </Card.Body>
        </Card>
      </Fade>
    </Col>
  );
};

const Experience = ({ resumeExperience }) => {
  if (!resumeExperience) {
    return null;
  }

  const experienceItems = resumeExperience.map((experience, i) => (
    <ExperienceCard key={i} experience={experience} />
  ));

  return (
    <section id="portfolio" className="pb-5">
      <Container>
        <div className="col-md-12 mx-auto">
          <div className="col-md-12">
            <h1 className="section-title" style={{ color: "black" }}>
              <i className="fa-solid fa-briefcase">&nbsp;</i>
              {"experience"}
            </h1>
          </div>
        </div>
        <Row className="row-grid align-items-start">{experienceItems}</Row>
      </Container>
    </section>
  );
};

ExperienceCard.propTypes = {
  experience: PropTypes.object,
};

Experience.propTypes = {
  resumeExperience: PropTypes.array,
};

export default Experience;
