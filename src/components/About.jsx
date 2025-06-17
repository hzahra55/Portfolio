
import propTypes from "prop-types";

const About = ({ resumeAbout }) => {
  if (!resumeAbout) return null;

  const hello = resumeAbout.description_header;
  const about = resumeAbout.description;

  return (
    <section
      id="about"
      className="d-none d-md-block" // hides on small screens
      style={{ backgroundColor: "#1f1f1f", padding: "4rem 0" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div
              className="card shadow-lg border-0"
              style={{ backgroundColor: "#2c2c2c", color: "#e0e0e0" }}
            >
              <div className="card-body p-4">
                <p style={{ fontSize: "1.5rem", lineHeight: "1.9" }}>{about}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

About.propTypes = {
  resumeAbout: propTypes.object,
};

export default About;
