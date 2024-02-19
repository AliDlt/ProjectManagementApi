const Project = require("../models/projectModel");
const User = require("../models/userModel");

const getAllProjectsByUserId = async (req, res) => {
  try {
    const { page, count, userId } = req.query;

    // Check if the userRole is 0 (Admin)
    const isAdmin = await User.exists({ _id: userId, userRole: 0 });

    let projects;
    let totalProjects;

    if (isAdmin) {
      // If userRole is 0 (Admin), get all projects
      projects = await Project.find()
        .skip((page - 1) * count)
        .limit(Number(count));

      totalProjects = await Project.countDocuments();
    } else {
      // For other userRoles, filter projects by userId
      projects = await Project.find({ usersIds: userId })
        .skip((page - 1) * count)
        .limit(Number(count));

      totalProjects = await Project.countDocuments({
        usersIds: userId,
      });
    }

    const totalPages = Math.ceil(totalProjects / count);

    // Check if the requested page number is valid
    if (page > totalPages) {
      return res.status(404).json({
        message: "این صفحه وجود ندارد.",
        data: null,
        status: false,
      });
    }

    return res
      .status(200)
      .json({ message: "موفقیت آمیز", data: projects, status: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null, status: false });
  }
};

const getProjectTotalPages = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();

    if (totalProjects == 0) {
      return res
        .status(400)
        .json({ message: "پروژه ای یافت نشد.", data: null, status: false });
    }

    const pages = Math.ceil(totalProjects / 10);

    return res
      .status(200)
      .json({ message: "موفقیت آمیز", data: pages, status: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null, status: false });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.query;

    const project = await Project.findById(id);

    if (!project) {
      return res
        .status(400)
        .json({ message: "پروژه ای یافت نشد.", data: null, status: false });
    }

    return res
      .status(200)
      .json({ message: "موفقیت آمیز", data: project, status: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null, status: false });
  }
};

const addProject = async (req, res) => {
  try {
    const { name, description, startDate, endDate, situation, userId } =
      req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: " کاربری یافت نشد.", data: null, status: false });
    }

    // Create a new project with the provided data
    const projectData = {
      name,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      situation,
      usersIds: [userId], // Associate the user with the project
    };

    // Save the project to the database
    const project = await Project.create(projectData);
    user.projectIds = [...user.projectIds, project._id];
    await user.save();

    return res
      .status(201)
      .json({ message: "موفقیت آمیز", data: project, status: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null, status: false });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.query;

    const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProject) {
      return res
        .status(400)
        .json({ message: "پروژه ای یافت نشد.", data: null, status: false });
    }

    // Update the project ID in the associated user model
    const user = await User.findOneAndUpdate(
      { projectIds: id },
      { $set: { "projectIds.$": updatedProject._id } },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "موفقیت آمیز", data: updatedProject, status: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null, status: false });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.query;

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res
        .status(400)
        .json({ message: "پروژه ای یافت نشد.", data: null, status: false });
    }

    // Delete the project ID from the associated user model
    await User.updateMany({ projectIds: id }, { $pull: { projectIds: id } });

    return res
      .status(200)
      .json({ message: "موفقیت آمیز", data: deletedProject, status: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null, status: false });
  }
};

const GetUsersByProjectId = async (req, res) => {
  try {
    const { id } = req.query;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(400).json({
        message: "پروژه ای یافت نشد.",
        data: null,
        status: false,
      });
    }

    const usersDetail = await Promise.all(
      project.usersIds.map(async (userId) => {
        const user = await User.findById(userId);
        return user ? user.toObject() : null;
      })
    );

    return res.status(200).json({
      message: "موفقیت آمیز",
      data: usersDetail.filter((user) => user !== null),
      status: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `خطا : ${error.message}`,
      data: null,
      status: false,
    });
  }
};

const UpdateUsersByProjectId = async (req, res) => {
  try {
    const { id } = req.query;
    const { selectedUserIds } = req.body;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(400).json({
        message: "پروژه ای یافت نشد.",
        data: null,
        status: false,
      });
    }

    project.usersIds = selectedUserIds;
    const updatedProject = await project.save();

    return res.status(200).json({
      message: "به روز رسانی با موفقیت انجام شد.",
      data: true,
      status: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `خطا : ${error.message}`,
      data: null,
      status: false,
    });
  }
};

module.exports = {
  getAllProjectsByUserId,
  getProjectById,
  GetUsersByProjectId,
  getProjectTotalPages,
  UpdateUsersByProjectId,
  addProject,
  updateProject,
  deleteProject,
};
