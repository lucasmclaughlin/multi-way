import React, { useState, useEffect } from 'react';
import ProjectView from './components/ProjectView';
import NewProjectModal from './components/NewProjectModal';
import NewTaskModal from './components/NewTaskModal';

const LOCAL_STORAGE_KEY = 'todo-projects';

const loadProjects = () => {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const saveProjects = (projects) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
};

function App() {
  const [projects, setProjects] = useState(() => {
    return (
      loadProjects() || [
        {
          name: 'Example Project',
          tasks: [],
        },
      ]
    );
  });

  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  useEffect(() => {
    saveProjects(projects);
  }, [projects]);

  const currentProject = projects[currentProjectIndex];

  // Add new project by name, adding tasks: []
  const addProject = (newProject) => {
    setProjects((prevProjects) => {
      const updated = [...prevProjects, { ...newProject, tasks: [] }];
      console.log('Adding project:', updated);
      setCurrentProjectIndex(updated.length - 1); // last added project's index
      return updated;
    });
  };
  

  // Add task immutably to current project
  const addTask = (task) => {
    setProjects((prevProjects) => {
      const updated = prevProjects.map((project, index) => {
        if (index === currentProjectIndex) {
          return {
            ...project,
            tasks: [...project.tasks, task],
          };
        }
        return project;
      });
      console.log('Adding task:', updated);
      return updated;
    });
  };

  const goLeft = () => {
    setCurrentProjectIndex((prev) =>
      prev === 0 ? projects.length - 1 : prev - 1
    );
  };

  const goRight = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
  };

  console.log('Current project:', currentProject);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {/* Navigation */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={goLeft}
          className="px-4 py-2 bg-blue-200 rounded hover:bg-blue-300"
        >
        previous
        </button>

        <button
          onClick={goRight}
          className="px-4 py-2 bg-blue-200 rounded hover:bg-blue-300"
        >
        next
        </button>

        <h1 className="text-2xl font-bold">{currentProject.name}</h1>

      </div>

      {/* Project and Tasks */}
      <ProjectView project={currentProject} />

      {/* Fixed bottom buttons */}
      <div className="fixed bottom-6 flex gap-4">
        <NewProjectModal onAdd={addProject} />
        <NewTaskModal onAdd={addTask} />
      </div>
    </div>
  );
}

export default App;
