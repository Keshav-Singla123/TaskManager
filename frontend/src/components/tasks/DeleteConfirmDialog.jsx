import React from "react";
import PropTypes from "prop-types";

const DeleteConfirmDialog = ({ open, onClose, onConfirm, title }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold">Delete task</h3>
        <p className="text-slate-300 mt-2">
          Are you sure you want to delete '{title}'? This action cannot be
          undone.
        </p>
        <div className="mt-4 flex justify-end gap-3">
          <button onClick={onClose} className="px-3 py-1 bg-slate-600 rounded">
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-3 py-1 bg-red-600 rounded text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmDialog;

DeleteConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
};
