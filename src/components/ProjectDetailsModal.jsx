// import { Modal } from "react-bootstrap";
// import AwesomeSlider from "react-awesome-slider";
// import "../scss/light-slider.module.scss";
// import "../scss/dark-slider.module.scss";
// import "react-awesome-slider/dist/custom-animations/scale-out-animation.css";
// import propTypes from "prop-types";

// const ProjectDetailsModal = ({ data, onHide, show }) => {
//   if (!data) {
//     return null;
//   }

//   const { technologies, images, title, description, url } = data;

//   const techList = technologies?.map((icons, i) => (
//     <li className="list-inline-item mx-3 px-3" key={i}>
//       <span>
//         <div className="text-center">
//           <i className={icons.class} style={{ fontSize: "300%" }}>
//             <p className="text-center" style={{ fontSize: "30%" }}>
//               {icons.name}
//             </p>
//           </i>
//         </div>
//       </span>
//     </li>
//   ));

//   const imgList = images?.map((elem, i) => (
//     <div key={i} data-src={`/assets/project/${elem}`} />
//   ));
//   return (
//     <Modal
//       show={show}
//       onHide={onHide}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//       className="modal-inside"
//     >
//       <span onClick={onHide} className="modal-close">
//         <i className="fa-solid fa-xmark fa-3x"></i>
//       </span>
//       <div className="col-md-12">
//         <div className="col-md-10 mx-auto" style={{ paddingBottom: "50px" }}>
//           <div className="slider-tab">
//             <span
//               className="iconify slider-iconfiy"
//               data-icon="emojione:red-circle"
//               data-inline="false"
//               style={{ marginLeft: "5px" }}
//             ></span>{" "}
//             &nbsp;{" "}
//             <span
//               className="iconify slider-iconfiy"
//               data-icon="twemoji:yellow-circle"
//               data-inline="false"
//             ></span>{" "}
//             &nbsp;{" "}
//             <span
//               className="iconify slider-iconfiy"
//               data-icon="twemoji:green-circle"
//               data-inline="false"
//             ></span>
//            </div>{/*
//           <AwesomeSlider
//             animation="scaleOutAnimation"
//             className="slider-image light-slider dark-slider"
//           >
//             {imgList}
//           </AwesomeSlider>*/}
//         </div> 
//               <div className="text-center mb-4">
//         <img
//           src={`/assets/project/${images[0]}`}
//           alt={title}
//           className="img-fluid rounded"
//           style={{ maxHeight: "400px", objectFit: "contain" }}
//         />
//       </div>

//         <div className="col-md-10 mx-auto">
//           <h3 style={{ padding: "5px 5px 0 5px" }}>
//             {title}
//             {url ? (
//               <a
//                 href={url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="link-href"
//               >
//                 <i
//                   className="fas fa-external-link-alt"
//                   style={{ marginLeft: "10px" }}
//                 ></i>
//               </a>
//             ) : null}
//           </h3>
//           <p className="modal-description">{description}</p>
//           <div className="col-md-12 text-center">
//             <ul className="list-inline mx-auto">{techList}</ul>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// ProjectDetailsModal.propTypes = {
//   data: propTypes.object,
//   onHide: propTypes.func,
//   show: propTypes.bool,
// };

// export default ProjectDetailsModal;
import { Modal } from "react-bootstrap";
import "../scss/light-slider.module.scss";
import "../scss/dark-slider.module.scss";
import "react-awesome-slider/dist/custom-animations/scale-out-animation.css";
import propTypes from "prop-types";

const ProjectDetailsModal = ({ data, onHide, show }) => {
  if (!data) return null;

  const { technologies, images, title, description, url } = data;

  const techList = technologies?.map((tech, i) => (
    <li className="list-inline-item mx-3 px-3" key={i}>
      <div className="text-center">
        <i className={tech.class} style={{ fontSize: "300%" }}>
          <p className="text-center" style={{ fontSize: "30%" }}>
            {tech.name}
          </p>
        </i>
      </div>
    </li>
  ));

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      className="modal-inside"
    >
      <span onClick={onHide} className="modal-close">
        <i className="fa-solid fa-xmark fa-3x"></i>
      </span>

      <div className="col-md-12">
        <div className="col-md-10 mx-auto" style={{ paddingBottom: "50px" }}>
          <div className="slider-tab">
            <span className="iconify slider-iconfiy" data-icon="emojione:red-circle" />
            &nbsp;
            <span className="iconify slider-iconfiy" data-icon="twemoji:yellow-circle" />
            &nbsp;
            <span className="iconify slider-iconfiy" data-icon="twemoji:green-circle" />
          </div>

          <div className="text-center mb-4">
            <img
              src={`/assets/project/${images[0]}`}
              alt={title}
              className="img-fluid rounded"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          </div>

          <div className="col-md-10 mx-auto">
            <h3 style={{ padding: "5px 5px 0 5px" }}>
              {title}
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-href"
                >
                  <i
                    className="fab fa-github"
                    style={{ marginLeft: "10px" }}
                  ></i>
                </a>
              )}
            </h3>

            <p className="modal-description">{description}</p>

            <div className="col-md-12 text-center">
              <ul className="list-inline mx-auto">{techList}</ul>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

ProjectDetailsModal.propTypes = {
  data: propTypes.object,
  onHide: propTypes.func,
  show: propTypes.bool,
};

export default ProjectDetailsModal;
