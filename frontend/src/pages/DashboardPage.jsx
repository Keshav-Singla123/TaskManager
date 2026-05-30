import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import KanbanBoard from "../components/tasks/KanbanBoard";
import TaskModal from "../components/tasks/TaskModal";
import DeleteConfirmDialog from "../components/tasks/DeleteConfirmDialog";
import { TaskContext } from "../context/TaskContext";
import { AuthContext } from "../context/AuthContext";
import Toast from "../components/ui/Toast";

const DashboardPage = () => {
  const { tasks, addTask, editTask, removeTask, isLoading } =
    useContext(TaskContext);
  const { user } = useContext(AuthContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [toasts, setToasts] = useState([]);

  const pushToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  };

  const handleAdd = (stageKey) => {
    setEditing({ stage: stageKey });
    setModalOpen(true);
  };

  const handleEdit = (task) => {
    setEditing(task);
    setModalOpen(true);
  };

  const handleDelete = (task) => {
    setDeleting(task);
  };

  const handleSubmit = async (form) => {
    if (editing && editing._id) {
      await editTask(editing._id, form);
      pushToast("Task updated successfully");
    } else {
      await addTask(form);
      pushToast("Task created successfully");
    }
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    await removeTask(deleting._id);
    pushToast("Task deleted successfully");
    setDeleting(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <div className="p-4">
          <h1 className="text-2xl font-semibold">Welcome, {user?.fullName}</h1>
        </div>
        <KanbanBoard
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAdd}
        />
      </div>

      <TaskModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        initial={editing}
        onSubmit={handleSubmit}
      />
      <DeleteConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        title={deleting?.title}
      />

      <div className="fixed bottom-6 right-6 space-y-2">
        {toasts.map((t) => (
          <Toast key={t.id} message={t.message} type={t.type} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
