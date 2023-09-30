import propTypes from "prop-types";

const Skills = ({ resumeSkills }) => {
  if (!resumeSkills) {
    return null;
  }

  const skillsList = resumeSkills.icons.map((skill, i) => (
    <li className="list-inline-item mx-3" key={i}>
      <span>
        <div className="text-center skills-tile">
          <img
            src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-original.svg`}
            data-src={`https://cdn.simpleicons.org/${skill.icon}`}
            alt={skill.name}
            width="30"
            height="30"
            onError={(e) => {
              if (e.target.dataset.src === "resize") {
                e.target.src = "/assets/transparent.png";
                e.target.dataset.src = "null";
              }
              if (e.target.dataset.src !== "null") {
                e.target.src = e.target.dataset.src;
                e.target.dataset.src = "resize";
              }
            }}
          />
          <p
            className="text-center"
            style={{ fontSize: "50%", marginTop: "4px" }}
          >
            {skill.name}
          </p>
        </div>
      </span>
    </li>
  ));

  return (
    <section id="skills">
      <div className="col-md-12">
        <div className="col-md-12">
          <h1 className="section-title">
            <i className="fa-solid fa-gears">&nbsp;</i>
            <span className="text-white">{"skills"}</span>
          </h1>
        </div>
        <div className="col-md-12 text-center">
          <ul className="list-inline mx-auto skill-icon">{skillsList}</ul>
        </div>
      </div>
    </section>
  );
};

Skills.propTypes = {
  resumeSkills: propTypes.object,
};

export default Skills;
