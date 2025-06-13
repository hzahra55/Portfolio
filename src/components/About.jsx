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
      <div className="col-md-12" style={{backgroundColor: "#242828"}}>
        <h1 style={{ color: "black" }}>
          <span>
            <i className="fa-solid fa-user">&nbsp;</i>
            {"about me"}
          </span>
        </h1>
        <div className="row center mx-auto my-5">
          

          <div className="col-md-8 center" >
            <div className="col-md-20 " >
              <div className="card">
                
                <div
                  className="card-body font-trebuchet text-justify ml-3 mr-3 " 
                  style={{
                    height: "auto",
                    fontSize: "132%",
                    lineHeight: "200%",
                    backgroundColor: "#242828"
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
