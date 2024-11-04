const projects = require("../Models/projectModal");

exports.addProject = async (req, res) => {
  console.log("inside add project request");
  console.log("User id :", req.payload);
  console.log("data", req.body);
  console.log("file:", req.file);

  const userId = req.payload;
  const { title, language, overview, github, website } = req.body;
  const projectImage = req.file.filename;
  try {
    const existingProject = await projects.findOne({ github });
    if (existingProject) {
      res
        .status(406)
        .json(
          "project already available in out system , kindly upload another"
        );
    } else {
      const newProject = new projects({
        title,
        language,
        overview,
        github,
        website,
        projectImage,
        userId,
      });
      await newProject.save();
      res.status(200).json(newProject);
    }
  } catch (e) {
    console.log("error", e);
    res.status(401).json(e);
  }
};

//get all projects
exports.getAllProjects = async (req, res) => {
  const searchKey = req.query.search;
  //$regex : searchKey , $options : 'i' is regex syntax in the mongo db "i" indicates that  the search is case insensitive
  const query = {
    language: {
      $regex: searchKey,
      $options: "i",
    },
  };
  try {
    const allProjects = await projects.find(query);
    res.status(200).json(allProjects);
  } catch (e) {
    res.status(401).json(e);
  }
};
//get user project
exports.getAllUserProjects = async (req, res) => {
  try {
    const userId = req.payload;
    const userProjects = await projects.find({ userId });
    res.status(200).json(userProjects);
  } catch (e) {
    res.status(201).json(e);
  }
};
//get home project
exports.getHomeProjects = async (req, res) => {
  try {
    const homeProjects = await projects.find().limit(3);
    res.status(200).json(homeProjects);
  } catch (e) {
    res.status(401).json(e);
  }
};

//edit project
exports.editProject = async (req, res) => {
  console.log("inside edit project");
  const { pid } = req.params;
  const userId = req.payload;
  const { title, language, overview, github, website, projectImage } = req.body;
  const uploadImage = req.file ? req.file.filename : projectImage;
  try {
    const updatedProject = await projects.findByIdAndUpdate(
      { _id: pid },
      {
        title,
        language,
        overview,
        github,
        website,
        projectImage: uploadImage,
        userId,
      },
      { new: true }
    );
    await updatedProject.save();
    res.status(200).json(updatedProject);
  } catch (e) {
    res.status(401).json(e);
  }
};

//remove project
exports.removeProject = async (req, res) => {
  console.log("inside remove project");
  const { pid } = req.params;
  try {
    const projectDetails = await projects.findByIdAndDelete({ _id: pid });
    res.status(200).json(projectDetails);
  } catch (e) {
    res.status(401).json(e);
  }
};
