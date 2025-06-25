import * as Dialog from '@radix-ui/react-dialog';

export default function TaskCard({ task, open, onOpenChange }) {
  if (!task) return null;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 max-w-md w-[90vw] bg-white p-6 rounded-2xl shadow-xl -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="text-xl font-bold mb-4">{task.title}</Dialog.Title>

          <div className="space-y-2">
            <p><strong>Deadline:</strong> {task.deadline || 'N/A'}</p>
            <p><strong>Estimated time:</strong> {task.estimatedTime || 'N/A'}</p>
            <p><strong>Difficulty:</strong> {task.difficulty || 'N/A'}</p>
            <p><strong>Comments:</strong> {task.comments || 'None'}</p>
          </div>

          <Dialog.Close asChild>
            <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Close
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
