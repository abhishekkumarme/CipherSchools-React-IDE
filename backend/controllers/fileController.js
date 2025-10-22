const { Files } = require("../models/files");
const { Project } = require("../models/projects");

const buildTree = (files, parentId = null) => {
  const tree = {};
  files
    .filter((f) => String(f.parentId) === String(parentId))
    .forEach((file) => {
      if (file.type === "folder") {
        tree[file.name] = buildTree(files, file._id);
      } else {
        tree[file.name] = file.content || "";
      }
    });
  return tree;
};

// Fetch files in hierarchy
const getProjectFiles = async (req, res) => {
  try {
    const { projectId } = req.params;
    const files = await Files.find({ projectId });
    const structured = buildTree(files);
    res.status(200).json(structured);
  } catch (error) {
    console.error("Error fetching project files:", error);
    res.status(500).json({ message: error.message });
  }
};


const createFileOrFolder = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { parentId, name, type, language, content = "" } = req.body;

    const project = await Project.findOne({ _id: projectId, userId: req.user._id });
    if (!project) return res.status(404).send({ message: "Project not found or unauthorized" });

    const newFile = await Files.create({
      projectId,
      parentId: parentId || null,
      name,
      type,
      language: type === "file" ? language : undefined,
      content: type === "file" ? content : undefined,
    });

    return res.status(201).send({ message: `${type} created`, file: newFile });
  } catch (error) {
    console.error("Error creating file/folder:", error);
    return res.status(500).send({ message: error.message });
  }
};

// Update file content (autosave from Sandpack)
const updateFileContent = async (req, res) => {
  try {
    const { fileId } = req.params;
    const { content, name } = req.body;

    const file = await Files.findById(fileId);
    if (!file) return res.status(404).send({ message: "File not found" });

    const project = await Project.findOne({ _id: file.projectId, userId: req.user._id });
    if (!project) return res.status(403).send({ message: "Unauthorized access" });

    if (name) file.name = name;
    if (typeof content === "string") file.content = content;
    file.updatedAt = Date.now();
    await file.save();

    return res.status(200).send({ message: "File updated", file });
  } catch (error) {
    console.error("Error updating file:", error);
    return res.status(500).send({ message: error.message });
  }
};

// Delete file/folder
const deleteFileOrFolder = async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await Files.findById(fileId);
    if (!file) return res.status(404).send({ message: "File not found" });

    const project = await Project.findOne({ _id: file.projectId, userId: req.user._id });
    if (!project) return res.status(403).send({ message: "Unauthorized access" });

    await deleteRecursively(fileId);

    return res.status(200).send({ message: "File/folder deleted" });
  } catch (error) {
    console.error("Error deleting file/folder:", error);
    return res.status(500).send({ message: error.message });
  }
};

// Recursive delete helper
const deleteRecursively = async (fileId) => {
  const children = await Files.find({ parentId: fileId });
  for (const child of children) {
    await deleteRecursively(child._id);
  }
  await Files.findByIdAndDelete(fileId);
};

module.exports = {
  getProjectFiles,
  createFileOrFolder,
  updateFileContent,
  deleteFileOrFolder,
};
