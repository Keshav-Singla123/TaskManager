import React from "react";
import PropTypes from "prop-types";
import TaskCard from "./TaskCard";

const accentMap = {
  blue: "border-l-4 border-blue-500",
  amber: "border-l-4 border-amber-400",
  green: "border-l-4 border-green-400",
};

const KanbanColumn = ({
  title,
  accent,
  tasks,
  onEdit,
  onDelete,
  onAdd,
  emptyText,
  stageKey,
}) => {
  return (
    <div className={`bg-slate-800 rounded p-4 ${accentMap[accent]}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">
          {title} · <span className="text-slate-400">{tasks.length}</span>
        </h3>
      </div>
      <div className="space-y-3">
        {tasks.length ? (
          tasks.map((t) => (
            <TaskCard
              key={t._id}
              task={t}
              onEdit={() => onEdit(t)}
              onDelete={() => onDelete(t)}
            />
          ))
        ) : (
          <div className="text-slate-400">{emptyText}</div>
        )}
      </div>
      <div className="mt-4 text-right">
        <button
          onClick={() => onAdd(stageKey)}
          className="px-3 py-1 bg-slate-700 rounded"
        >
          ➕ Add Task
        </button>
      </div>
    </div>
  );
};

KanbanColumn.propTypes = {
  title: PropTypes.string.isRequired,
  accent: PropTypes.string,
  tasks: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  emptyText: PropTypes.string,
  stageKey: PropTypes.string,
};
export default KanbanColumn;
