import React, { useMemo, memo } from 'react'
import projects from '../../assets/data/projects.json'
import LazyImage from './LazyImage'
import { useWindowSize } from '../../hooks/useWindowSize'

// Memoized project item to prevent unnecessary re-renders
const ProjectItem = memo(({ project, priority }) => (
  <a
    href={project.url}
    target="_blank"
    rel="noopener noreferrer"
    className="projects-item"
  >
    <LazyImage 
      src={project.image} 
      alt={project.name}
      priority={priority}
    />
  </a>
));

// Memoized project wrapper to prevent unnecessary re-renders
const ProjectWrapper = memo(({ project, projectIndex, priority }) => (
  <div className="projects-wrapper">
    <div className="projects-label">
      <div className="projects-label-line" />
      <p className="rotated-text">{project.name}</p>
    </div>
    <ProjectItem project={project} priority={priority} />
  </div>
));

function Projects() {
  const { width } = useWindowSize();
  
  // Memoize the intro text to prevent re-renders when width doesn't change
  const introLeft = useMemo(() => {
    return width <= 930 ? <>WEEKLY <br/>DROPS</> : 'WEEKLY DROPS';
  }, [width]);

  const introRight = useMemo(() => {
    return width <= 930 ? <>FREE TIME <br/>INITIATIVE</> : 'FREE TIME INITIATIVE';
  }, [width]);

  return (
    <>
      {projects.map((weekProjects, weekIndex) => {
        // Determine if this week's projects should be prioritized for loading
        const isPriority = weekIndex === 0 || weekIndex === 1;
        
        return (
          <React.Fragment key={weekIndex}>
            <div className="intro">
              {weekIndex === 0 && <p className="intro-left">{introLeft}</p>}
              <p className="intro-week">W-{projects.length - 1 - weekIndex}</p>
              {weekIndex === 0 && <p className="intro-right">{introRight}</p>}
            </div>

            <div 
              className="projects" 
              style={{ paddingTop: weekIndex === 0 ? 'var(--sp-firstgrid)' : 'var(--sp-nextgrids)' }}
            >
              {weekProjects.map((project, projectIndex) => (
                <ProjectWrapper 
                  key={`${weekIndex}-${projectIndex}`}
                  project={project} 
                  projectIndex={projectIndex}
                  priority={isPriority}
                />
              ))}          
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
}

export default memo(Projects);