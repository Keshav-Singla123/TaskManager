import React from "react";
import PropTypes from "prop-types";

const priorityColor = (p) =>
  p === "high"
    ? "bg-red-500"
    : p === "medium"
      ? "bg-amber-400"
      : "bg-slate-400";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const due = task.dueDate ? new Date(task.dueDate) : null;
  const isOverdue = due && due < new Date();

  return (
    <div className="bg-slate-700 p-3 rounded card-anim flex justify-between items-start">
      <div>
        <div className="font-semibold">{task.title}</div>
        <div className="text-sm text-slate-300 line-clamp-2">
          {task.description}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div
            className={`text-xs px-2 py-0.5 rounded ${priorityColor(task.priority)}`}
          >
            {task.priority}
          </div>
          {due && (
            <div
              className={`text-xs ${isOverdue ? "text-red-400" : "text-slate-300"}`}
            >
              {due.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 ml-3">
        <button aria-label="Edit" onClick={onEdit} className="text-slate-300">
          ✏️
        </button>
        <button aria-label="Delete" onClick={onDelete} className="text-red-400">
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
