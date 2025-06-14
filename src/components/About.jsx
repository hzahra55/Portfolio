// import propTypes from "prop-types";

// const About = ({ resumeAbout }) => {
//   if (!resumeAbout) {
//     return null;
//   }

//   const profilepic = "/assets/" + resumeAbout.image;
//   const hello = resumeAbout.description_header;
//   const about = resumeAbout.description;

//   return (
//     <section id="about">
//       <div className="col-md-12" style={{backgroundColor: "#242828"}}>
//         <h1 style={{ color: "black" }}>
//           <span>
//             <i className="fa-solid fa-user">&nbsp;</i>
//             {"about me"}
//           </span>
//         </h1>
//         <div className="row center mx-auto my-5">
          

//           <div className="col-md-8 center" >
//             <div className="col-md-20 " >
//               <div className="card">
                
//                 <div
//                   className="card-body font-trebuchet text-justify ml-3 mr-3 " 
//                   style={{
//                     height: "auto",
//                     fontSize: "132%",
//                     lineHeight: "200%",
//                     backgroundColor: "#242828"
//                   }}
//                 >
//                   <br />
//                   <span className="wave">{hello}</span>
//                   <br />
//                   <br />
//                   {about}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// About.propTypes = {
//   resumeAbout: propTypes.object,
// };

// export default About;


// import PropTypes from "prop-types";

// const About = ({ resumeAbout }) => {
//   if (!resumeAbout) return null;

//   const hello = resumeAbout.description_header;
//   const about = resumeAbout.description;

//   return (
//     <section id="about" className="about-section py-5" style={{ backgroundColor: "#242828" }}>
//       <div className="container">
//         <h2 className="text-center text-light mb-4">
//           <i className="fa-solid fa-user"></i> &nbsp;About Me
//         </h2>
//         <div className="row justify-content-center">
//           <div className="col-lg-10 col-md-12">
//             <div className="about-text text-light" style={{ fontSize: "1.15rem", lineHeight: "1.8" }}>
//               <p className="mb-3">{hello}</p>
//               <p>{about}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// About.propTypes = {
//   resumeAbout: PropTypes.object,
// };

// export default About;


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
        <h2 className="text-center mb-5" style={{ color: "#ffffff" }}>
          <i className="fa-solid fa-user me-2"></i> About Me
        </h2>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div
              className="card shadow-lg border-0"
              style={{ backgroundColor: "#2c2c2c", color: "#e0e0e0" }}
            >
              <div className="card-body p-4">
                <h4 className="mb-3" style={{ fontWeight: "bold" }}>
                  <span className="wave">{hello}</span>
                </h4>
                <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>{about}</p>
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
