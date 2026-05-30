import React from "react";
import KanbanColumn from "./KanbanColumn";
import PropTypes from "prop-types";

const KanbanBoard = ({ tasks, onEdit, onDelete, onAdd }) => {
  const groups = {
    todo: tasks.filter((t) => t.stage === "todo"),
    in_progress: tasks.filter((t) => t.stage === "in_progress"),
    done: tasks.filter((t) => t.stage === "done"),
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <KanbanColumn
          title="Todo"
          accent="blue"
          stageKey="todo"
          tasks={groups.todo}
          onEdit={onEdit}
          onDelete={onDelete}
          onAdd={onAdd}
          emptyText="No tasks yet. Add one to get started!"
        />
        <KanbanColumn
          title="In Progress"
          accent="amber"
          stageKey="in_progress"
          tasks={groups.in_progress}
          onEdit={onEdit}
          onDelete={onDelete}
          onAdd={onAdd}
          emptyText="Nothing in progress. Pick a task from Todo!"
        />
        <KanbanColumn
          title="Done"
          accent="green"
          stageKey="done"
          tasks={groups.done}
          onEdit={onEdit}
          onDelete={onDelete}
          onAdd={onAdd}
          emptyText="No completed tasks yet. Keep going!"
        />
      </div>
    </div>
  );
};

export default KanbanBoard;

KanbanBoard.propTypes = {
  tasks: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};
