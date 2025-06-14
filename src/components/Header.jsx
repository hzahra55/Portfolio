
// import { useEffect, useState } from "react";
// import { Button } from "react-bootstrap";
// import { TypeAnimation } from "react-type-animation";
// import PropTypes from "prop-types";

// const Header = ({ resumeBasicInfo }) => {
//   const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
//     ? "dark"
//     : "light";

//   const [theme, setTheme] = useState(systemTheme);

//   useEffect(() => {
//     const body = document.body;
//     if (theme === "dark") {
//       body.setAttribute("data-theme", "dark");
//     } else {
//       body.setAttribute("data-theme", "light");
//     }
//   }, [theme]);

//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     setTimeout(() => {
//       setLoaded(true);
//     }, 100);
//   }, []);

//   if (!resumeBasicInfo) {
//     return null;
//   }

//   const profilepic = "/assets/profile.png";
//   const { name, titles } = resumeBasicInfo;

//   const titleElements = titles
//     ? titles.map((title, index) => (
//         <TypeAnimation
//           key={index}
//           sequence={[title.toUpperCase(), 1500]}
//           repeat={Infinity}
//           cursor={false}
//           className="title-styles"
//         />
//       ))
//     : null;

//   return (
//     <header id="home" style={{ height: "100vh", display: "block",backgroundColor: "#242828" }}>
//       <div className="row aligner " style={{  alignItems: "center", flexWrap: "wrap", backgroundColor: "#242828" }}>
//         {/* Left Column - Big Profile Image */}
//         <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
//           <div className="polaroid">
//             <span style={{ cursor: "auto" }}>
//               <img
//                 className={loaded ? "fade-in" : ""}
//                 height="auto"
//                 width="100%"
//                 src={profilepic}
//                 alt="Avatar placeholder"
//               />
//             </span>
//           </div>
//         </div>

//         {/* Right Column - Name, Titles, Resume Button */}
//         <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
//           <div className={`text-center fade-in-text ${loaded ? "show" : ""}`}>
//             <span
//               className="iconify header-icon"
//               data-icon="fa6-solid:laptop-code"
//               data-inline="false"
//             ></span>
//             <br />
//             <TypeAnimation
//               sequence={[name]}
//               wrapper="h1"
//               cursor={false}
//               className="mb-0"
//             />
//             <div className="title-container">{titleElements}</div>

//             <div className="btn-wrapper  my-4 col-md-12 mx-auto text-center">
//               <Button
//                 id="resume-file"
//                 className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
//                 variant="light"
//                 href="https://drive.google.com/file/d/1zqzO5OiBTa-qNjbthWbCCf5qRnijOhmk/view?usp=sharing"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <span
//                   className="iconify btn-icon"
//                   data-icon="solar:file-bold"
//                   data-inline="false"
//                 ></span>
//                 <span className="btn-text mx-2 px-2">See My Resume</span>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// Header.propTypes = {
//   resumeBasicInfo: PropTypes.object,
// };

// export default Header;









// import { useEffect, useState } from "react";
// import { Button } from "react-bootstrap";
// import { TypeAnimation } from "react-type-animation";
// import PropTypes from "prop-types";

// const Header = ({ resumeBasicInfo }) => {
//   const [loaded, setLoaded] = useState(false);

//   // Always use dark mode
//   useEffect(() => {
//     document.body.setAttribute("data-theme", "dark");
//   }, []);

//   // For fade-in animation
//   useEffect(() => {
//     setTimeout(() => {
//       setLoaded(true);
//     }, 100);
//   }, []);

//   if (!resumeBasicInfo) return null;

//   const { name, titles } = resumeBasicInfo;
//   const profilepic = "/assets/profile.png";

//   return (
//     <header
//       id="home"
//       className="hero-section text-light"
//       style={{
//         backgroundColor: "#1e1e1e",
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center"
//       }}
//     >
//       <div className="container py-5">
//         <div className="row align-items-center text-center text-md-start">
//           {/* Profile image */}
//           <div className="col-12 col-md-5 d-flex justify-content-center mb-4 mb-md-0">
//             <img
//               src={profilepic}
//               alt="Profile"
//               className={`img-fluid rounded-circle shadow ${loaded ? "fade-in" : ""}`}
//               style={{ maxWidth: "250px", height: "auto" }}
//             />
//           </div>

//           {/* Right side text */}
//           <div className="col-12 col-md-7 d-flex flex-column justify-content-center align-items-center align-items-md-start">
//             <span
//               className="iconify display-4 mb-3"
//               data-icon="fa6-solid:laptop-code"
//             />

//             <h1 className="fw-bold mb-3">{name}</h1>

//             {titles && (
//               <TypeAnimation
//                 sequence={titles.flatMap((title) => [title.toUpperCase(), 2000])}
//                 wrapper="h4"
//                 repeat={Infinity}
//                 className="mb-3 text-light"
//               />
//             )}

//             <Button
//               variant="light"
//               href="https://drive.google.com/file/d/1zqzO5OiBTa-qNjbthWbCCf5qRnijOhmk/view?usp=sharing"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="mt-3"
//             >
//               <i className="fas fa-file-alt me-2" />
//               See My Resume
//             </Button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// Header.propTypes = {
//   resumeBasicInfo: PropTypes.object,
// };

// export default Header;




import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { TypeAnimation } from "react-type-animation";
import PropTypes from "prop-types";

const Header = ({ resumeBasicInfo }) => {
  const [loaded, setLoaded] = useState(false);

  // Force dark mode
  useEffect(() => {
    document.body.setAttribute("data-theme", "dark");
  }, []);

  // Fade-in animation for image
  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  if (!resumeBasicInfo) return null;

  const { name, titles } = resumeBasicInfo;
  const profilepic = "/assets/profile.png";

  return (
    <header
      id="home"
      className="hero-section text-light"
      style={{
        backgroundColor: "#1e1e1e",
        display: "flex",
        alignItems: "center",
        paddingTop: "40px", // adjusted for less gap
        paddingBottom: "40px", // balanced spacing
        minHeight: "90vh", // slightly less than full height
      }}
    >
      <div className="container">
        <div className="row align-items-center justify-content-center">
          {/* Profile image - Left */}
          <div className="col-12 col-md-5 d-flex justify-content-center mb-4 mb-md-0">
            <img
              src={profilepic}
              alt="Profile"
              className={`img-fluid rounded-circle shadow ${loaded ? "fade-in" : ""}`}
              style={{
                maxWidth: "240px",
                height: "auto",
                transition: "opacity 1s ease-in-out",
              }}
            />
          </div>

          {/* Text content - Right */}
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center align-items-md-start text-center text-md-start">
            <span
              className="iconify display-5 mb-2"
              data-icon="fa6-solid:laptop-code"
              style={{ color: "#fff" }}
            />

            <h1 className="fw-bold mb-2" style={{ fontSize: "2.2rem", color: "#fff" }}>
              {name}
            </h1>

            {titles && (
              <TypeAnimation
                sequence={titles.flatMap((title) => [title.toUpperCase(), 2000])}
                wrapper="h4"
                repeat={Infinity}
                className="mb-3 text-light"
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "400",
                  minHeight: "30px",
                }}
              />
            )}

            <Button
              variant="light"
              href="https://drive.google.com/file/d/1zqzO5OiBTa-qNjbthWbCCf5qRnijOhmk/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2"
            >
              <i className="fas fa-file-alt me-2" />
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
