const Task = require('../models/Task');

// @desc    Create task
// @route   POST /api/tasks
const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, category } = req.body;

    if (!title) {
      return res.status(400).json({ 
        success: false, 
        error: 'Task title is required' 
      });
    }

    const task = await Task.create({
      title: title.charAt(0).toUpperCase() + title.slice(1),
      description,
      priority: priority || 'medium',
      dueDate,
      category: category || 'personal',
      user: req.userId
    });

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get all tasks
// @route   GET /api/tasks
const getTasks = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      completed, 
      priority, 
      category,
      sortBy = 'createdAt',
      order = 'desc'
    } = req.query;
    
    const filter = { user: req.userId };
    
    if (completed !== undefined) {
      filter.completed = completed === 'true';
    }
    
    if (priority) {
      filter.priority = priority;
    }
    
    if (category) {
      filter.category = category;
    }
    
    const sortOrder = order === 'asc' ? 1 : -1;
    
    const tasks = await Task.find(filter)
      .sort({ [sortBy]: sortOrder })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Task.countDocuments(filter);
    
    res.json({
      success: true,
      data: tasks,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ 
        success: false, 
        error: 'Task not found' 
      });
    }

    if (task.user.toString() !== req.userId.toString()) {
      return res.status(401).json({ 
        success: false, 
        error: 'Not authorized' 
      });
    }

    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
const updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ 
        success: false, 
        error: 'Task not found' 
      });
    }

    if (task.user.toString() !== req.userId.toString()) {
      return res.status(401).json({ 
        success: false, 
        error: 'Not authorized' 
      });
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, 
      runValidators: true 
    });

    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ 
        success: false, 
        error: 'Task not found' 
      });
    }

    if (task.user.toString() !== req.userId.toString()) {
      return res.status(401).json({ 
        success: false, 
        error: 'Not authorized' 
      });
    }

    await task.deleteOne();

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = { 
  createTask, 
  getTasks, 
  getTask, 
  updateTask, 
  deleteTask 
};