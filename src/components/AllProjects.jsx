import React from 'react';
import projectsData from '../data/projects.json';
import { Header } from './shared/Header';
import { Footer } from './shared/Footer';

const AllProjects = () => {
  const projects = projectsData.projects; // Get all projects

  return (
    <div className="App bg-slate-900 text-gray-100">
      <Header />
      <div className="mx-auto max-w-screen-lg px-3 py-6">
        <div className="mb-6 text-2xl font-bold">
          My <span className="bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent">Projects</span>
        </div>
        <div className="flex flex-col gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const ProjectCard = ({ project }) => {
  return (
    <div className="flex flex-col items-center gap-x-8 rounded-md bg-slate-800 p-3 md:flex-row">
      <div className="shrink-0">
        <a href={project.link}>
          <img
            className="h-36 w-36 object-cover hover:translate-y-1"
            src={`/info-resume-website/${project.image}`}
            alt={project.alt}
            loading="lazy"
          />
        </a>
      </div>
      <div>
        <div className="flex flex-col items-center gap-y-2 md:flex-row">
          <a className="hover:text-cyan-400" href={project.link}>
            <div className="text-xl font-semibold">{project.title}</div>
          </a>
          <div className="ml-3 flex gap-2">
            {project.tags.map((tag, index) => (
              <ProjectTag key={index} name={tag.name} color={tag.color} />
            ))}
          </div>
        </div>
        <p className="mt-3 text-gray-400">{project.description}</p>
      </div>
    </div>
  );
};

const ProjectTag = ({ name, color }) => {
  return (
    <div className={`rounded-md px-2 py-1 text-xs font-semibold bg-${color}-400 text-${color}-900`}>
      {name}
    </div>
  );
};

export default AllProjects;