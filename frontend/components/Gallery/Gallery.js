import { useState } from "react";
import ProjectPreview from "./ProjectPreview";

const dummyProjects = [
  {
    nme: "Hola Sans",
    projectImage:
      "https://fonts.gstatic.com/s/img/knowledge/modules/choosing_type/lessons/a_checklist_for_choosing_type/images/a_checklist_for_choosing_type_1_439626857.svg",
    author: {
      nme: "Gutemberg.lens",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/3/33/Gutenberg.jpg",
    },
  },
  {
    nme: "Adios Sans",
    projectImage:
      "https://fonts.gstatic.com/s/img/knowledge/modules/choosing_type/lessons/a_checklist_for_choosing_type/images/a_checklist_for_choosing_type_1_439626857.svg",
    author: {
      nme: "mmm.lens",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/3/33/Gutenberg.jpg",
    },
  },
  {
    nme: "Hola Text",
    projectImage:
      "https://fonts.gstatic.com/s/img/knowledge/modules/choosing_type/lessons/a_checklist_for_choosing_type/images/a_checklist_for_choosing_type_1_439626857.svg",
    author: {
      nme: "ttt.lens",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/3/33/Gutenberg.jpg",
    },
  },
  {
    nme: "Adios Text",
    projectImage:
      "https://fonts.gstatic.com/s/img/knowledge/modules/choosing_type/lessons/a_checklist_for_choosing_type/images/a_checklist_for_choosing_type_1_439626857.svg",
    author: {
      nme: "rrr.lens",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/3/33/Gutenberg.jpg",
    },
  },
  {
    nme: "Hola Text",
    projectImage:
      "https://fonts.gstatic.com/s/img/knowledge/modules/choosing_type/lessons/a_checklist_for_choosing_type/images/a_checklist_for_choosing_type_1_439626857.svg",
    author: {
      nme: "aaa.lens",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/3/33/Gutenberg.jpg",
    },
  },
  {
    nme: "Adios Text",
    projectImage:
      "https://fonts.gstatic.com/s/img/knowledge/modules/choosing_type/lessons/a_checklist_for_choosing_type/images/a_checklist_for_choosing_type_1_439626857.svg",
    author: {
      nme: "user.lens",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/3/33/Gutenberg.jpg",
    },
  },
];

export default function Gallery() {
  const [projects] = useState(dummyProjects);
  return (
    <div className="container max-w-screen-xl flex flex-col flex-wrap md:flex-row gap-5 items-star pl-6 pr-6 pb-12">
      {projects.map((project, i) => {
        return (
          <ProjectPreview
            key={`project-${i}`}
            projectName={project.nme}
            author={project.author.nme}
            avatar={project.author.avatar}
            projectImage={project.projectImage}
          />
        );
      })}
    </div>
  );
}
