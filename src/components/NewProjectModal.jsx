import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

export default function NewProjectModal({ onAdd }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="px-4 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700">
          ➕ New Project
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-md bg-white rounded-2xl p-6 shadow-xl -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="text-xl font-bold mb-4">New Project</Dialog.Title>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              const name = form.projectName.value.trim();

              if (!name) return; // Require a project name

              onAdd({ name, tasks: [] });
              form.reset();
              setOpen(false); // Close modal after adding
            }}
          >
            <input
              name="projectName"
              type="text"
              placeholder="Project name"
              className="w-full mb-4 p-2 border rounded"
              required
            />

            <div className="flex justify-end gap-2">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </Dialog.Close>

              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Create
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
