import { useEffect, useState } from "react";
import Switch from "react-switch";
import { Button } from "react-bootstrap";
import { TypeAnimation } from "react-type-animation";
import PropTypes from "prop-types";

const Header = ({ resumeBasicInfo }) => {
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const [checked, setChecked] = useState(systemTheme == "dark" ? true : false);
  const [theme, setTheme] = useState(systemTheme);

  useEffect(() => {
    const body = document.body;
    if (theme === "dark") {
      body.setAttribute("data-theme", "dark");
    } else {
      body.setAttribute("data-theme", "light");
    }
  }, [theme]);

  if (!resumeBasicInfo) {
    return null;
  }

  const { name, titles } = resumeBasicInfo;

  const toggleTheme = () => {
    setChecked(!checked);
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const titleElements = titles
    ? titles.map((title, index) => (
        <TypeAnimation
          key={index}
          sequence={[title.toUpperCase(), 1500]}
          repeat={Infinity}
          className="title-styles"
        />
      ))
    : null;

  return (
    <header id="home" style={{ height: window.innerHeight, display: "block" }}>
      <div className="row aligner" style={{ height: "100%" }}>
        <div className="col-md-12">
          <div>
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
            <Switch
              checked={checked}
              onChange={toggleTheme}
              offColor="#baaa80"
              onColor="#353535"
              className="react-switch mx-auto"
              width={90}
              height={40}
              uncheckedIcon={
                <span
                  className="iconify"
                  data-icon="noto-v1:new-moon-face"
                  data-inline="false"
                  style={{
                    display: "block",
                    height: "100%",
                    fontSize: 25,
                    textAlign: "end",
                    marginLeft: "20px",
                    color: "#353239",
                  }}
                ></span>
              }
              checkedIcon={
                <span
                  className="iconify"
                  data-icon="noto-v1:sun-with-face"
                  data-inline="false"
                  style={{
                    display: "block",
                    height: "100%",
                    fontSize: 25,
                    textAlign: "end",
                    marginLeft: "10px",
                    color: "#353239",
                  }}
                ></span>
              }
              id="icon-switch"
            />
            <div className="btn-wrapper my-4 col-md-12 mx-auto text-center">
              <Button
                id="resume-file"
                className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
                variant="light"
                href="https://www.overleaf.com/project/65db74c590af0b00d48e06c9/output/output.pdf"
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
