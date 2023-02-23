import React, { useEffect, useRef, useState } from "react";

export const ProjectsTv = () => {
  const [projects, setProjects] = useState([]);
  const projectsListRef = useRef();
  let prevOrNextSectionRunning = false;

  useEffect(() => {
    fetch("https://giulianoconti.github.io/api/myProjects-es.json")
      .then((res) => res.json())
      .then((projects) => setProjects(projects));
  }, []);

  const handlePrev = () => {
    if (!prevOrNextSectionRunning) {
      prevOrNextSectionRunning = true;
      if (projectsListRef.current.scrollLeft === 0) {
        projectsListRef.current.scrollLeft = projectsListRef.current.scrollWidth - projectsListRef.current.clientWidth;
        setTimeout(() => {
          prevOrNextSectionRunning = false;
        }, 800);
      } else {
        projectsListRef.current.scrollLeft -= projectsListRef.current.clientWidth;
        setTimeout(() => {
          prevOrNextSectionRunning = false;
        }, 500);
      }
    }
  };

  const handleNext = () => {
    if (!prevOrNextSectionRunning) {
      prevOrNextSectionRunning = true;
      if (projectsListRef.current.scrollWidth - projectsListRef.current.scrollLeft === projectsListRef.current.clientWidth) {
        projectsListRef.current.scrollLeft = 0;
        setTimeout(() => {
          prevOrNextSectionRunning = false;
        }, 800);
      } else {
        projectsListRef.current.scrollLeft += projectsListRef.current.clientWidth;
        setTimeout(() => {
          prevOrNextSectionRunning = false;
        }, 500);
      }
    }
  };

  return (
    <div className="projects_container">
      <div className="projects_btns_container">
        <button className="projects_btn" onClick={handlePrev}>
          <svg xmlns="http://www.w3.org/2000/svg" width="200" height="48" viewBox="0 0 512 512">
            <path d="M189.8 349.7c3.1-3.1 3-8 0-11.3L123.4 264H408c4.4 0 8-3.6 8-8s-3.6-8-8-8H123.4l66.3-74.4c2.9-3.4 3.2-8.1.1-11.2-3.1-3.1-8.5-3.3-11.4-.1 0 0-79.2 87-80 88S96 253.1 96 256s1.6 4.9 2.4 5.7 80 88 80 88c1.5 1.5 3.6 2.3 5.7 2.3s4.1-.8 5.7-2.3z" />
          </svg>
        </button>
        <h2 className="projects_title">Mis Proyectos</h2>
        <button className="projects_btn" onClick={handleNext}>
          <svg xmlns="http://www.w3.org/2000/svg" width="200" height="48" viewBox="0 0 512 512">
            <path d="M322.2 349.7c-3.1-3.1-3-8 0-11.3l66.4-74.4H104c-4.4 0-8-3.6-8-8s3.6-8 8-8h284.6l-66.3-74.4c-2.9-3.4-3.2-8.1-.1-11.2 3.1-3.1 8.5-3.3 11.4-.1 0 0 79.2 87 80 88s2.4 2.8 2.4 5.7-1.6 4.9-2.4 5.7-80 88-80 88c-1.5 1.5-3.6 2.3-5.7 2.3s-4.1-.8-5.7-2.3z" />
          </svg>
        </button>
      </div>
      <div className="projects_list" ref={projectsListRef}>
        {projects?.map((project) => (
          <div className="project" key={project.id}>
            <img className="project_img" src={project.img} alt={project.name} />
            <div className="project_info">
              <h3 className="project_title">{project.title}</h3>
              <p className="project_description">{project.description}</p>
              <div className="project_links">
                <a href={project.hrefGithub} target="_blank" rel="noreferrer">
                  <svg className="project_link_svg" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href={project.hrefWeb} target="_blank" rel="noreferrer">
                  <svg className="project_link_svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3.51211712,15 L8.17190229,15 C8.05949197,14.0523506 8,13.0444554 8,12 C8,10.9555446 8.05949197,9.94764942 8.17190229,9 L3.51211712,9 C3.18046266,9.93833678 3,10.9480937 3,12 C3,13.0519063 3.18046266,14.0616632 3.51211712,15 L3.51211712,15 Z M3.93551965,16 C5.12590433,18.3953444 7.35207678,20.1851177 10.0280093,20.783292 C9.24889451,19.7227751 8.65216136,18.0371362 8.31375067,16 L3.93551965,16 L3.93551965,16 Z M20.4878829,15 C20.8195373,14.0616632 21,13.0519063 21,12 C21,10.9480937 20.8195373,9.93833678 20.4878829,9 L15.8280977,9 C15.940508,9.94764942 16,10.9555446 16,12 C16,13.0444554 15.940508,14.0523506 15.8280977,15 L20.4878829,15 L20.4878829,15 Z M20.0644804,16 L15.6862493,16 C15.3478386,18.0371362 14.7511055,19.7227751 13.9719907,20.783292 C16.6479232,20.1851177 18.8740957,18.3953444 20.0644804,16 L20.0644804,16 Z M9.18440269,15 L14.8155973,15 C14.9340177,14.0623882 15,13.0528256 15,12 C15,10.9471744 14.9340177,9.93761183 14.8155973,9 L9.18440269,9 C9.06598229,9.93761183 9,10.9471744 9,12 C9,13.0528256 9.06598229,14.0623882 9.18440269,15 L9.18440269,15 Z M9.3349823,16 C9.85717082,18.9678295 10.9180729,21 12,21 C13.0819271,21 14.1428292,18.9678295 14.6650177,16 L9.3349823,16 L9.3349823,16 Z M3.93551965,8 L8.31375067,8 C8.65216136,5.96286383 9.24889451,4.27722486 10.0280093,3.21670804 C7.35207678,3.81488234 5.12590433,5.60465556 3.93551965,8 L3.93551965,8 Z M20.0644804,8 C18.8740957,5.60465556 16.6479232,3.81488234 13.9719907,3.21670804 C14.7511055,4.27722486 15.3478386,5.96286383 15.6862493,8 L20.0644804,8 L20.0644804,8 Z M9.3349823,8 L14.6650177,8 C14.1428292,5.03217048 13.0819271,3 12,3 C10.9180729,3 9.85717082,5.03217048 9.3349823,8 L9.3349823,8 Z M12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
