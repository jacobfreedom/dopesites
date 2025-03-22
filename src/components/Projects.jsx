import React from 'react'
import projects from '../assets/data/projects.json'

export default function Projects() {
  return (
    <div className="projects">
      {projects.map((project) => (
        <a
          key={project.id}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="projects__item"
        >
          <img src={project.image} alt={project.name} />
        </a>
      ))}
    </div>
  )
}