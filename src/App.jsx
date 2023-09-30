import "./App.scss";
import resumeData from "./assets/resume";
import Header from "./components/Header";
import About from "./components/About";
import Experience from "./components/Experience";
import Social from "./components/Social";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header resumeBasicInfo={resumeData.basic_info} />
      <About resumeAbout={resumeData.about} />
      <Experience resumeExperience={resumeData.experience} />
      <Social resumeSocial={resumeData.social} />
      <Education resumeEducation={resumeData.education} />
      <Skills resumeSkills={resumeData.skills} />
      <Projects resumeProjects={resumeData.projects} />
      <Footer resumeBasicInfo={resumeData.basic_info} />
    </div>
  );
}

export default App;
