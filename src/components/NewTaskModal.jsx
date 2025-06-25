import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

export default function NewTaskModal({ onAdd }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700">
          ➕ New Task
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-md bg-white rounded-2xl p-6 shadow-xl -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="text-xl font-bold mb-4">New Task</Dialog.Title>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;

              const newTask = {
                title: form.title.value.trim(),
                deadline: form.deadline.value || '',
                estimatedTime: form.estimatedTime.value || '',
                difficulty: form.difficulty.value || '',
                comments: form.comments.value.trim() || '',
              };

              if (!newTask.title) return; // Title required

              onAdd(newTask);
              form.reset();
              setOpen(false); // close the modal here
            }}
          >
            <input
              name="title"
              type="text"
              placeholder="Title (required)"
              className="w-full mb-3 p-2 border rounded"
              required
            />

            <input
              name="deadline"
              type="date"
              className="w-full mb-3 p-2 border rounded"
            />

            <input
              name="estimatedTime"
              type="text"
              placeholder="Estimated time (e.g. 2 hours)"
              className="w-full mb-3 p-2 border rounded"
            />

            <select
              name="difficulty"
              className="w-full mb-3 p-2 border rounded"
              defaultValue=""
            >
              <option value="" disabled>
                Difficulty
              </option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <textarea
              name="comments"
              placeholder="Comments"
              className="w-full mb-3 p-2 border rounded resize-none"
              rows={3}
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
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add Task
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
