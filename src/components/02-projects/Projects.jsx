import React, { useState, useEffect, useMemo } from 'react'
import projects from '../../assets/data/projects.json'
import LazyImage from './LazyImage'
import { useWindowSize } from '../../hooks/useWindowSize'

// Project item component
const ProjectItem = ({ project, priority }) => (
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
)

// Project wrapper component
const ProjectWrapper = ({ project, projectIndex, priority }) => (
  <div className="projects-wrapper">
    <div className="projects-label">
      <div className="projects-label-line" />
      <p className="rotated-text">{project.name}</p>
    </div>
    <ProjectItem project={project} priority={priority} />
  </div>
)

function Projects() {
  const { width } = useWindowSize();
  const [loadedWeeks, setLoadedWeeks] = useState(new Set());
  
  // Track loaded weeks sequentially
  useEffect(() => {
    // Always load first week eagerly
    if (loadedWeeks.size === 0) {
      setLoadedWeeks(new Set([0]));
      return;
    }
    
    // Load next week after previous one is loaded
    const maxLoadedWeek = Math.max(...Array.from(loadedWeeks));
    if (maxLoadedWeek < projects.length - 1) {
      setLoadedWeeks(prev => new Set([...prev, maxLoadedWeek + 1]));
    }
  }, [loadedWeeks]);
  
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
        // Week 0 has highest priority, week 1 next, etc.
        const isPriority = !loadedWeeks.has(weekIndex) && 
          (weekIndex === 0 || loadedWeeks.has(weekIndex - 1));
        
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
              data-week-index={weekIndex}
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

export default Projects;