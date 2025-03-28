import React from 'react'
import projects from '../../assets/data/projects.json'
// import ThreeImage from './ThreeImage'
import { useWindowSize } from '../../hooks/useWindowSize'

export default function Projects() {
  const { width } = useWindowSize();
  return (
    <>
      {projects.map((weekProjects, weekIndex) => (
        <React.Fragment key={weekIndex}>
          <div className="intro">
            {weekIndex === 0 && <p className="intro-left">{width <= 930 ? <>WEEKLY <br/>DROPS</> : 'WEEKLY DROPS'}</p>}
            <p className="intro-week">W-{projects.length - 1 - weekIndex}</p>
            {weekIndex === 0 && <p className="intro-right">{width <= 930 ? <>FREE TIME <br/>INITIATIVE</> : 'FREE TIME INITIATIVE'}</p>}
          </div>

          <div className="projects" style={{ paddingTop: weekIndex === 0 ? 'var(--sp-firstgrid)' : 'var(--sp-nextgrids)' }}>
            {weekProjects.map((project, projectIndex) => (
              <div className="projects-wrapper" key={projectIndex}>
                <div className="projects-label">
                  <div className="projects-label-line" />
                  <p className="rotated-text">{project.name}</p>
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="projects-item"
                >
                  <LazyImage 
                    src={project.image.replace(/\.png$/, '.webp')} 
                    alt={project.name}
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