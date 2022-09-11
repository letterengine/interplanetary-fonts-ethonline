import ProjectPreview from './ProjectPreview';
import { useState } from 'react';

const dummyProjects = [
  { nme: 'Hola Sans', author: { nme: 'user.lens', avatar: 'img/url' } },
  { nme: 'Adios Sans', author: { nme: 'mmm.lens', avatar: 'img/url' } },
  { nme: 'Hola Text', author: { nme: 'ttt.lens', avatar: 'img/url' } },
  { nme: 'Adios Text', author: { nme: 'rrr.lens', avatar: 'img/url' } },
  { nme: 'Hola Text', author: { nme: 'aaa.lens', avatar: 'img/url' } },
  { nme: 'Adios Text', author: { nme: 'user.lens', avatar: 'img/url' } },
];

export default function Gallery() {
  const [projects] = useState(dummyProjects);
  return (
    <div className='container max-w-screen-xl flex flex-col flex-wrap md:flex-row gap-5 items-star'>
      {projects.map((project, i) => {
        return (
          <ProjectPreview
            key={`project-${i}`}
            projectName={project.nme}
            author={project.author.nme}
            avatar={project.author.avatar}
          />
        );
      })}
    </div>
  );
}
