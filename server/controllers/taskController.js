import Notification from "../models/notification.js";
import Task from "../models/task.js";
import User from "../models/user.js";

export const createNewTask = async (req, res) => {
  try {
    const { userId } = req.user;
    const { title, team, stage, date, priority, assets } = req.body;

    let message = `New task has been assigned to you`;
    if (team?.length > 1) {
      message += ` and ${team.length - 1} others.`;
    }

    message += ` The task has a ${priority} priority and is due on ${new Date(date).toDateString()}. Please act accordingly.`;

    const activityLog = {
      type: "assigned",
      activity: message,
      by: userId,
    };

    const newTask = await Task.create({
      title,
      team,
      stage: stage.toLowerCase(),
      date,
      priority: priority.toLowerCase(),
      assets,
      activities: activityLog,
    });

    await Notification.create({
      team,
      text: message,
      task: newTask._id,
    });

    res.status(200).json({ success: true, task: newTask, message: "Task created successfully." });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const duplicate = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    const duplicate = await Task.create({
      ...task.toObject(),
      title: `${task.title} - Copy`,
    });

    duplicate.team = task.team;
    duplicate.subTasks = task.subTasks;
    duplicate.assets = task.assets;
    duplicate.priority = task.priority;
    duplicate.stage = task.stage;

    await duplicate.save();

    let message = `A new task has been assigned to you`;
    if (task.team.length > 1) {
      message += ` and ${task.team.length - 1} others.`;
    }

    message += ` The task has a ${task.priority} priority and is due on ${task.date.toDateString()}.`;

    await Notification.create({
      team: task.team,
      text: message,
      task: duplicate._id,
    });

    res.status(200).json({ success: true, message: "Task duplicated successfully." });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const postTaskActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const { type, activity } = req.body;

    const task = await Task.findById(id);

    task.activities.push({
      type,
      activity,
      by: userId,
    });

    await task.save();

    res.status(200).json({ success: true, message: "Activity posted successfully." });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const { userId, isAdmin } = req.user;

    const tasksQuery = isAdmin
      ? { isTrashed: false }
      : { isTrashed: false, team: { $all: [userId] } };

    const tasks = await Task.find(tasksQuery)
      .populate("team", "name role title email")
      .sort({ _id: -1 });

    const users = await User.find({ isActive: true })
      .select("name title role isAdmin createdAt")
      .limit(10)
      .sort({ _id: -1 });

    const groupedTasks = tasks.reduce((acc, task) => {
      acc[task.stage] = (acc[task.stage] || 0) + 1;
      return acc;
    }, {});

    const priorityBreakdown = Object.entries(
      tasks.reduce((acc, task) => {
        acc[task.priority] = (acc[task.priority] || 0) + 1;
        return acc;
      }, {})
    ).map(([name, total]) => ({ name, total }));

    const summary = {
      totalTasks: tasks.length,
      last10Task: tasks.slice(0, 10),
      users: isAdmin ? users : [],
      tasks: groupedTasks,
      graphData: priorityBreakdown,
    };

    res.status(200).json({
      success: true,
      message: "Dashboard statistics retrieved successfully.",
      ...summary,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const fetchTaskDetails = async (req, res) => {
  try {
    const { stage, isTrashed } = req.query;

    const query = { isTrashed: isTrashed === "true" };

    if (stage) {
      query.stage = stage;
    }

    const tasks = await Task.find(query)
      .populate("team", "name title email")
      .sort({ _id: -1 });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id)
      .populate("team", "name title role email")
      .populate("activities.by", "name");

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const addSubTask = async (req, res) => {
  try {
    const { title, tag, date } = req.body;
    const { id } = req.params;

    const task = await Task.findById(id);

    task.subTasks.push({
      title,
      date,
      tag,
    });

    await task.save();

    res.status(200).json({ success: true, message: "Sub-task added successfully." });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, team, stage, priority, assets } = req.body;

    const task = await Task.findById(id);

    task.title = title;
    task.date = date;
    task.priority = priority.toLowerCase();
    task.assets = assets;
    task.stage = stage.toLowerCase();
    task.team = team;

    await task.save();

    res.status(200).json({ success: true, message: "Task updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const trashTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    task.isTrashed = true;

    await task.save();

    res.status(200).json({ success: true, message: "Task moved to trash." });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const manageTaskDeletion = async (req, res) => {
  try {
    const { id } = req.params;
    const { actionType } = req.query;

    if (actionType === "delete") {
      await Task.findByIdAndDelete(id);
    } else if (actionType === "deleteAll") {
      await Task.deleteMany({ isTrashed: true });
    } else if (actionType === "restore") {
      const task = await Task.findById(id);
      task.isTrashed = false;
      await task.save();
    } else if (actionType === "restoreAll") {
      await Task.updateMany({ isTrashed: true }, { isTrashed: false });
    }

    res.status(200).json({
      success: true,
      message: "Action performed successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};