const Project = require("../models/projectModel");

const getAllProjectsByPagination = async (req, res) => {
  try {
    const { page, count } = req.params;

    const projects = await Project.find()
      .skip((page - 1) * count)
      .limit(Number(count));

    return res.status(200).json({ message: "موفقیت آمیز", data: projects });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null });
  }
};

const getAllProjectsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const projects = await Project.find({ usersIds: userId });

    return res.status(200).json({ message: "موفقیت آمیز", data: projects });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { Id } = req.params;

    const project = await Project.findById(Id);

    if (!project) {
      return res
        .status(404)
        .json({ message: "پروژه ای یافت نشد.", data: null });
    }

    return res.status(200).json({ message: "موفقیت آمیز", data: project });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null });
  }
};

const addProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);

    return res.status(201).json({ message: "موفقیت آمیز", data: project });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null });
  }
};

const updateProject = async (req, res) => {
  try {
    const { Id } = req.params;

    const updatedProject = await Project.findByIdAndUpdate(Id, req.body, {
      new: true,
    });

    if (!updatedProject) {
      return res
        .status(404)
        .json({ message: "پروژه ای یافت نشد.", data: null });
    }

    return res
      .status(200)
      .json({ message: "موفقیت آمیز", data: updatedProject });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { Id } = req.params;

    const deletedProject = await Project.findByIdAndDelete(Id);

    if (!deletedProject) {
      return res
        .status(404)
        .json({ message: "پروژه ای یافت نشد.", data: null });
    }

    return res.status(200).json({ message: "موفقیت آمیز", data: null });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: `خطا : ${error.message}`, data: null });
  }
};

module.exports = {
  getAllProjectsByPagination,
  getAllProjectsByUserId,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
};
