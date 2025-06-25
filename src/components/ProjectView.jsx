import React, { useState } from 'react';
import TaskCard from './TaskCard'; // your modal component to show task details

export default function ProjectView({ project }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };
  if (!project) return <div>Loading project...</div>;
  return (
    <div className="p-4 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">{project.name}</h2>

      {project.tasks && project.tasks.length > 0 ? (
        <ul className="space-y-2">
          {project.tasks.map((task, i) => (
            <li
              key={i}
              className="p-3 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
              onClick={() => handleTaskClick(task)}
            >
              {task.title}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No tasks yet.</p>
      )}

      {/* Task details modal */}
      <TaskCard
        task={selectedTask}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
