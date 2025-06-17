


import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { TypeAnimation } from "react-type-animation";
import PropTypes from "prop-types";

const Header = ({ resumeBasicInfo }) => {
  const [loaded, setLoaded] = useState(false);

  // Force dark theme
  useEffect(() => {
    document.body.setAttribute("data-theme", "dark");
  }, []);

  // Trigger fade-in
  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  if (!resumeBasicInfo) return null;

  const { name, titles } = resumeBasicInfo;
  const profilepic = "/assets/profile.png";

  return (
    <header
      id="home"
      className="hero-section text-light d-flex align-items-center"
      style={{
        backgroundColor: "#1e1e1e",
        height: "100vh",
        overflow: "hidden",
        padding: 0,
        margin: 0,
      }}
    >
      <div className="container">
        <div className="row align-items-center justify-content-center">
          {/* Profile Image */}
          {/* <div
           className="col-12 col-md-5 d-flex justify-content-center mb-3 mb-md-0"> */}
           <div className="col-12 col-md-5 d-flex justify-content-md-end justify-content-center mt-4 mt-md-0">
            <img
              src={profilepic}
              alt="Profile"
              className={`img-fluid rounded-circle shadow ${loaded ? "fade-in" : ""}`}
              style={{
                maxWidth: "340px",
                height: "auto",
                transition: "opacity 1s ease-in-out",
              }}
            />
          </div>

          <div className="col-12 col-md-7 d-flex flex-column justify-content-center align-items-center text-center">
  <h1 className="fw-bold mb-3" style={{ fontSize: "3.8rem" }}>
    {name}
  </h1>

  {titles && (
    <TypeAnimation
      sequence={titles.flatMap((title) => [title.toUpperCase(), 2000])}
      wrapper="h4"
      repeat={Infinity}
      className="mb-4 text-light"
      style={{
        fontSize: "1.9rem",
        fontWeight: "400",
        minHeight: "36px",
      }}
    />
  )}

  <Button
    variant="light"
    href="https://drive.google.com/file/d/12MB2cOw5MHDfYWO6AfDIi5UKiVMvdp7a/view?usp=sharing"
    target="_blank"
    rel="noopener noreferrer"
    className="mt-2"
    style={{
        fontSize: "1.2rem",
        padding : "10px 20px"
      }}
  >
    <i className="fas fa-file-alt me-2" style={{
        fontSize: "1.2rem",
        verticalAlign: "middle"
      }} />
    See My Resume
  </Button>
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
