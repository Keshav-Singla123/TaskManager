const Task = require('../models/Task');

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: tasks });
  } catch (err) {
    next(err);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, stage = 'todo', priority = 'medium', dueDate = null } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Title is required' });

    const task = await Task.create({ userId: req.user._id, title, description, stage, priority, dueDate });
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    if (String(task.userId) !== String(req.user._id)) return res.status(403).json({ success: false, message: 'Forbidden' });

    const { title, description, stage, priority, dueDate } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (stage !== undefined) task.stage = stage;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;

    await task.save();
    res.json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    if (String(task.userId) !== String(req.user._id)) return res.status(403).json({ success: false, message: 'Forbidden' });

    await task.deleteOne();
    res.json({ success: true, data: null });
  } catch (err) {
    next(err);
  }
};
