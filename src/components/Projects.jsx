import React, { useState, useEffect } from 'react'
import projects from '../assets/data/projects.json'

export default function Projects() {
  return (
    <>
      {projects.map((weekProjects, weekIndex) => (
        <React.Fragment key={weekIndex}>
          <div className="intro">
            {weekIndex === 0 && <p className="intro-left">WEEKLY DROPS</p>}
            <p className="intro-week">W-{projects.length - 1 - weekIndex}</p>
            {weekIndex === 0 && <p className="intro-right">FREE TIME INITIATIVE</p>}
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
                  <img 
                    src={project.image.replace(/\.png$/, '.webp')} 
                    alt={project.name}
                    onError={(e) => {
                      e.target.src = project.image;
                    }}
                  />
                </a>
              </div>
            ))}
          </div>
        </React.Fragment>
      ))}
    </>
  );
}