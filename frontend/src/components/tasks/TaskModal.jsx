import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const defaultState = {
  title: "",
  description: "",
  stage: "todo",
  priority: "medium",
  dueDate: "",
};

const TaskModal = ({ open, onClose, onSubmit, initial }) => {
  const [form, setForm] = useState(defaultState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(initial || defaultState);
    setErrors({});
  }, [initial, open]);

  if (!open) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = {};
    if (!form.title) err.title = "Title is required";
    if (form.title && form.title.length > 100) err.title = "Max 100 chars";
    if (form.description && form.description.length > 500)
      err.description = "Max 500 chars";
    setErrors(err);
    if (Object.keys(err).length) return;
    setLoading(true);
    try {
      await onSubmit(form);
      onClose();
    } catch (e) {
      setErrors({ form: e.message || "Failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded p-6 w-full max-w-lg modal-anim">
        <h3 className="text-lg font-semibold mb-3">
          {initial ? "Edit Task" : "Create Task"}
        </h3>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-700 mt-1"
          />
          <div className="text-xs text-slate-400">
            {(form.title || "").length}/100
          </div>
          {errors.title && (
            <div className="text-red-400 text-sm">{errors.title}</div>
          )}

          <label className="block text-sm mt-3">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-700 mt-1"
            rows={4}
          />
          <div className="text-xs text-slate-400">
            {(form.description || "").length}/500
          </div>
          {errors.description && (
            <div className="text-red-400 text-sm">{errors.description}</div>
          )}

          <div className="grid grid-cols-2 gap-3 mt-3">
            <div>
              <label className="block text-sm">Stage</label>
              <select
                name="stage"
                value={form.stage}
                onChange={handleChange}
                className="w-full p-2 rounded bg-slate-700 mt-1"
              >
                <option value="todo">Todo</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div>
              <label className="block text-sm">Priority</label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full p-2 rounded bg-slate-700 mt-1"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <label className="block text-sm mt-3">Due Date</label>
          <input
            name="dueDate"
            type="date"
            value={form.dueDate ? form.dueDate.slice(0, 10) : ""}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-700 mt-1"
          />

          {errors.form && (
            <div className="text-red-400 mt-3">{errors.form}</div>
          )}

          <div className="mt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 bg-slate-600 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-1 bg-brand rounded text-white"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;

TaskModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initial: PropTypes.object,
};
