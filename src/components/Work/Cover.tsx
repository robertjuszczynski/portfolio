import { useState } from 'react'
import type { Project } from '../../data/projects'

export function Cover({ project, index }: { project: Project; index: number }) {
  const [failed, setFailed] = useState(!project.imgSrc)

  return (
    <div className={`cover ${failed && index % 2 === 0 ? 'invert' : ''}`}>
      {failed ? (
        <>
          <span className="cover-top">
            <span>{project.number}</span>
            <span>{project.category}</span>
          </span>
          <span className="cover-title">{project.title}</span>
          <span className="cover-stack">{project.stack.slice(0, 4).join(' / ')}</span>
        </>
      ) : (
        <img src={project.imgSrc} alt={`${project.title} screenshot`} loading="lazy" decoding="async" onError={() => setFailed(true)} />
      )}
    </div>
  )
}
