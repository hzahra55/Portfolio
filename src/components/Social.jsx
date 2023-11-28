import propTypes from "prop-types";

const Social = ({ resumeSocial }) => {
  if (!resumeSocial) {
    return null;
  }

  const socials = resumeSocial.map((social, i) => (
    <li className="list-inline-item mx-3" key={i}>
      <span>
        <div className="text-center skills-tile">
          <a href={social.url} target="_blank" rel="noopener noreferrer">
            <i className={social.class} style={{ fontSize: "220%" }}>
              <p
                className="text-center"
                style={{ fontSize: "30%", marginTop: "4px" }}
              >
                {social.name}
              </p>
            </i>
          </a>
        </div>
      </span>
    </li>
  ));

  return (
    <section id="skills">
      <div className="col-md-12">
        <div className="col-md-12">
          <h1 className="section-title">
            <span className="text-white">
              <i className="fa-solid fa-hashtag">&nbsp;</i>
              {"profiles"}
            </span>
          </h1>
        </div>
        <div className="col-md-12 text-center">
          <ul className="list-inline mx-auto skill-icon">{socials}</ul>
        </div>
      </div>
    </section>
  );
};

Social.propTypes = {
  resumeSocial: propTypes.array,
};

export default Social;
