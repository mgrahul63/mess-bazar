const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-surface rounded-2xl p-6 w-full max-w-sm border shadow-2xl border-red-700">
        {/* Message */}
        <p className="text-sm text-gray-200 mb-4">
          {message || "Are you sure?"}
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="text-xs px-3 py-2 rounded-md border border-gray-600 text-gray-300 hover:bg-gray-700/30"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="text-xs px-3 py-2 rounded-md bg-red-900/40 border border-red-700/30 text-red-400 hover:bg-red-800/50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
