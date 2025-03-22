import React from 'react'
import projects from '../assets/data/projects.json'

export default function Projects() {
  return (
    <>
      {projects.map((weekProjects, weekIndex) => (
        <React.Fragment key={weekIndex}>
          <div className="intro">
            <p className="intro-left">WEEKLY DROPS</p>
            <p className="intro-week">W-{weekIndex}</p>
            <p className="intro-right">FREE TIME INITIATIVE</p>
          </div>

          <div className="projects">
            {weekProjects.map((project, projectIndex) => (
              <div className="projects__wrapper" key={projectIndex}>
                <div className="projects__frame-label">{project.name}</div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="projects__item"
                >
                  <img src={project.image} alt={project.name} />
                </a>
              </div>
            ))}
          </div>
        </React.Fragment>
      ))}
    </>
  );
}