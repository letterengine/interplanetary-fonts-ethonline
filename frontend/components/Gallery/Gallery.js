import { useState } from 'react';
import ProjectPreview from './ProjectPreview';

const dummyProjects = [
  {
    nme: 'Hola Sans',
    url: 'font/test-font',
    projectImage:
      'https://fonts.gstatic.com/s/img/knowledge/modules/choosing_type/lessons/a_checklist_for_choosing_type/images/a_checklist_for_choosing_type_1_439626857.svg',
    author: {
      nme: 'gutenberg.lens',
      url: '/user/0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      avatar:
        'https://upload.wikimedia.org/wikipedia/commons/3/33/Gutenberg.jpg',
    },
  },
  {
    nme: 'Adios Sans',
    url: 'font/test-font',
    projectImage:
      'https://fonts.gstatic.com/s/img/knowledge/modules/choosing_type/lessons/a_checklist_for_choosing_type/images/a_checklist_for_choosing_type_1_439626857.svg',
    author: {
      nme: 'sheila.lens',
      url: '/user/0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      avatar:
        'https://www.calligraphersguild.org/images/SHEILA-WATERS-Zoe--by-Yukimi-Annand-2016.jpg',
    },
  },
  {
    nme: 'Adios Text',
    url: 'font/test-font',
    projectImage:
      'https://fonts.gstatic.com/s/img/knowledge/modules/choosing_type/lessons/a_checklist_for_choosing_type/images/a_checklist_for_choosing_type_1_439626857.svg',
    author: {
      nme: 'bodoni.lens',
      url: '/user/0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      avatar:
        'https://upload.wikimedia.org/wikipedia/commons/5/55/Giambattista_Bodoni_by_Giuseppe_Lucatelli.jpg',
    },
  },
  {
    nme: 'Hola Text',
    url: 'font/test-font',
    projectImage:
      'https://fonts.gstatic.com/s/img/knowledge/modules/choosing_type/lessons/a_checklist_for_choosing_type/images/a_checklist_for_choosing_type_1_439626857.svg',
    author: {
      nme: 'twombly.lens',
      url: '/user/0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      avatar:
        'https://www.fontshop.com/cdn-cgi/image/format=auto/https://fontshop-prod-responsive-images.s3.amazonaws.com/uploads/profile_image/attachment/386499/large_Carol-Twombly_crop@2x.jpg',
    },
  },
  {
    nme: 'Hola Text',
    url: 'font/test-font',
    projectImage:
      'https://fonts.gstatic.com/s/img/knowledge/modules/choosing_type/lessons/a_checklist_for_choosing_type/images/a_checklist_for_choosing_type_1_439626857.svg',
    author: {
      nme: 'carter.lens',
      url: '/user/0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      avatar:
        'https://upload.wikimedia.org/wikipedia/commons/0/05/20180914-ATypI-2018-Matthew_Carter-NP.jpg',
    },
  },
  {
    nme: 'Adios Text',
    url: 'font/test-font',
    projectImage:
      'https://fonts.gstatic.com/s/img/knowledge/modules/choosing_type/lessons/a_checklist_for_choosing_type/images/a_checklist_for_choosing_type_1_439626857.svg',
    author: {
      nme: 'gudrun.lens',
      url: '/user/0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      avatar:
        'https://upload.wikimedia.org/wikipedia/commons/c/c7/20160320T160542-GZvH-NP.jpg',
    },
  },
];

export default function Gallery() {
  const [projects] = useState(dummyProjects);
  return (
    <div className='container max-w-screen-xl flex flex-col flex-wrap md:flex-row gap-5 items-star pl-6 pr-6 pb-12'>
      {projects.map((project, i) => {
        return (
          <ProjectPreview
            key={`project-${i}`}
            projectName={project.nme}
            author={project.author.nme}
            avatar={project.author.avatar}
            authorurl={project.author.url}
            projectImage={project.projectImage}
            url={project.url}
          />
        );
      })}
    </div>
  );
}
