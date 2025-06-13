import propTypes from "prop-types";

const Footer = ({ resumeBasicInfo }) => {
  if (!resumeBasicInfo) {
    return null;
  }

  const networks = resumeBasicInfo.contact.map((network) => (
    <span key={network.name} className="m-4">
      <a href={network.url} target="_blank" rel="noopener noreferrer">
        <i className={network.class}></i>
      </a>
    </span>
  ));

  return (
    <footer>
      <div className="col-md-12">
        <div className="social-links">{networks}</div>

        <div className="copyright py-4 text-center">
          <div className="container">
            
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  resumeBasicInfo: propTypes.object,
};

export default Footer;
