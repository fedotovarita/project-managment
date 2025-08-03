import Sidebar from "./components/Sidebar";
import NoProjects from "./components/NoProjects";
import NewProject from "./components/NewProject";
import SelectedProject from "./components/SelectedProject";

import { useState } from "react";

function App() {
  const [newProjectIsActive, setNewProjectIsActive] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState();

  function handleAddProject(project) {
    setProjects((prev) => [...prev, { ...project, tasks: [] }]);
  }

  function handleRemovingProject(remProject) {
    setProjects((prev) => {
      const updated = prev.filter((p) => p.name !== remProject);
      return updated;
    });
    setSelectedProject();
  }

  function handleAddTaskToProject(task) {
    setProjects((prev) =>
      prev.map((p) =>
        p.name === selectedProject ? { ...p, tasks: [...p.tasks, task] } : p
      )
    );
  }
  function handleRemoveTaskFromProject(taskIndex) {
    setProjects((prev) =>
      prev.map((p) =>
        p.name === selectedProject
          ? { ...p, tasks: p.tasks.filter((_, i) => i !== taskIndex) }
          : p
      )
    );
  }

  function handleNewProjectWindowActivation() {
    setNewProjectIsActive(true);
  }

  function handleNewProjectWindowDectivation() {
    setNewProjectIsActive(false);
    setSelectedProject(undefined);
  }

  function handleProjectSelection(project) {
    setSelectedProject(project);
    setNewProjectIsActive(false);
  }

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <Sidebar
          newProjectIsActive={newProjectIsActive}
          onProjectSelection={handleProjectSelection}
          projects={projects}
          onActivateNewProjectWindow={handleNewProjectWindowActivation}
        />

        {newProjectIsActive ? (
          <NewProject
            onAddProject={handleAddProject}
            onDectivateNewProjectWindow={handleNewProjectWindowDectivation}
          />
        ) : selectedProject ? (
          <SelectedProject
            onRemoveProject={handleRemovingProject}
            project={projects.find(
              (project) => project.name === selectedProject
            )}
            onAddTask={handleAddTaskToProject}
            onRemoveTask={handleRemoveTaskFromProject}
          />
        ) : (
          <NoProjects
            onActivateNewProjectWindow={handleNewProjectWindowActivation}
          />
        )}
      </main>
    </>
  );
}

export default App;
