import propTypes from "prop-types";

const About = ({ resumeAbout }) => {
  if (!resumeAbout) {
    return null;
  }

  const profilepic = "/assets/" + resumeAbout.image;
  const hello = resumeAbout.description_header;
  const about = resumeAbout.description;

  return (
    <section id="about">
      <div className="col-md-12">
        <h1 style={{ color: "black" }}>
          <span>
            <i className="fa-solid fa-user">&nbsp;</i>
            {"about me"}
          </span>
        </h1>
        <div className="row center mx-auto my-5">
          <div className="col-md-4 center">
            <div className="polaroid">
              <span style={{ cursor: "auto" }}>
                <img
                  height="auto"
                  width="100%"
                  src={profilepic}
                  alt="Avatar placeholder"
                />
              </span>
            </div>
          </div>

          <div className="col-md-8 center">
            <div className="col-md-10">
              <div className="card">
                <div className="card-header">
                  <span
                    className="iconify"
                    data-icon="emojione:red-circle"
                    data-inline="false"
                  ></span>{" "}
                  &nbsp;{" "}
                  <span
                    className="iconify"
                    data-icon="twemoji:yellow-circle"
                    data-inline="false"
                  ></span>{" "}
                  &nbsp;{" "}
                  <span
                    className="iconify"
                    data-icon="twemoji:green-circle"
                    data-inline="false"
                  ></span>
                </div>
                <div
                  className="card-body font-trebuchet text-justify ml-3 mr-3"
                  style={{
                    height: "auto",
                    fontSize: "132%",
                    lineHeight: "200%",
                  }}
                >
                  <br />
                  <span className="wave">{hello}</span>
                  <br />
                  <br />
                  {about}
                </div>
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
