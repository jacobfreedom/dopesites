import React from 'react'
import projects from '../assets/data/projects.json'

export default function Projects() {
  return (
    <div className="projects">
      {projects.map((project) => (
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
  )
}