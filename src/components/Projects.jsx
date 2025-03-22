import React from 'react'
import projects from '../assets/data/projects.json'

export default function Projects() {
  const weeks = ['W-1', 'W-2'];

  return (
    <>
      {weeks.map((week) => {
        const weekProjects = projects.filter((project) => project.week === week);
        return weekProjects.length > 0 ? (
          <React.Fragment key={week}>
            <div className="intro">
              <p className="intro-left">WEEKLY DROPS</p>
              <p className="intro-week">{week}</p>
              <p className="intro-right">FREE TIME INITIATIVE</p>
            </div>

            <div className="projects">
              {weekProjects.map((project) => (
                <div className="projects__wrapper" key={project.id}>
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
        ) : null;
      })}
    </>
  );
}