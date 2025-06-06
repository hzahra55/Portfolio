
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { TypeAnimation } from "react-type-animation";
import PropTypes from "prop-types";

const Header = ({ resumeBasicInfo }) => {
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  const [theme, setTheme] = useState(systemTheme);

  useEffect(() => {
    const body = document.body;
    if (theme === "dark") {
      body.setAttribute("data-theme", "dark");
    } else {
      body.setAttribute("data-theme", "light");
    }
  }, [theme]);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 100);
  }, []);

  if (!resumeBasicInfo) {
    return null;
  }

  const profilepic = "/assets/profile.png";
  const { name, titles } = resumeBasicInfo;

  const titleElements = titles
    ? titles.map((title, index) => (
        <TypeAnimation
          key={index}
          sequence={[title.toUpperCase(), 1500]}
          repeat={Infinity}
          cursor={false}
          className="title-styles"
        />
      ))
    : null;

  return (
    <header id="home" style={{ height: "100vh", display: "block",backgroundColor: "#242828" }}>
      <div className="row aligner " style={{  alignItems: "center", flexWrap: "wrap", backgroundColor: "#242828" }}>
        {/* Left Column - Big Profile Image */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <div className="polaroid">
            <span style={{ cursor: "auto" }}>
              <img
                className={loaded ? "fade-in" : ""}
                height="auto"
                width="100%"
                src={profilepic}
                alt="Avatar placeholder"
              />
            </span>
          </div>
        </div>

        {/* Right Column - Name, Titles, Resume Button */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <div className={`text-center fade-in-text ${loaded ? "show" : ""}`}>
            <span
              className="iconify header-icon"
              data-icon="fa6-solid:laptop-code"
              data-inline="false"
            ></span>
            <br />
            <TypeAnimation
              sequence={[name]}
              wrapper="h1"
              cursor={false}
              className="mb-0"
            />
            <div className="title-container">{titleElements}</div>

            <div className="btn-wrapper  my-4 col-md-12 mx-auto text-center">
              <Button
                id="resume-file"
                className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
                variant="light"
                href="https://drive.google.com/file/d/1zqzO5OiBTa-qNjbthWbCCf5qRnijOhmk/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span
                  className="iconify btn-icon"
                  data-icon="solar:file-bold"
                  data-inline="false"
                ></span>
                <span className="btn-text mx-2 px-2">See My Resume</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  resumeBasicInfo: PropTypes.object,
};

export default Header;
