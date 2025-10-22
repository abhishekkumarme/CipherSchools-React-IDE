import React, { useState, useEffect, useContext } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import { dracula, ecoLight } from "@codesandbox/sandpack-themes";
import { Button, Dropdown, DropdownButton, Form } from "react-bootstrap";
import { Save } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThemeContext } from "../context/ThemeContext";
import { getLocalUser } from "../utils/UserUtils";
import { getUserProjects, deleteProject } from "../api's/ProjectApi";
import {
  getProjectFiles,
  updateFileContent,
  createFileOrFolder,
  deleteFileOrFolder,
  
} from "../api's/FilesApi";
import FileExplorer from "../components/FileExplorer";

export default function Studio() {
  const { theme } = useContext(ThemeContext);
  const user = getLocalUser();

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [files, setFiles] = useState({});
  const [fileContents, setFileContents] = useState({});
  const [activeFile, setActiveFile] = useState(null);
  const [autoSave, setAutoSave] = useState(true);

  const ideNavBg = theme === "light" ? "#f8f9fa" : "#212529";
  const ideTextColor = theme === "light" ? "text-dark" : "text-light";

  // Fetch user projects
  const fetchProjects = async () => {
    try {
      const data = await getUserProjects(user._id);
      setProjects(data || []);
      if (data?.length) {
        const proj = data[0];
        setSelectedProject(proj);
        setAutoSave(proj.settings?.autoSave || true);
        console.log(proj.settings.a);
        await fetchFiles(proj._id);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  // Fetch project files
  const fetchFiles = async (projectId) => {
    try {
      const data = await getProjectFiles(projectId);
      setFiles(data || {});
      const fileMap = {};
      const buildMap = (node) => {
        for (const key in node) {
          const item = node[key];
          if (typeof item === "object") buildMap(item);
          else fileMap[key] = item || "";
        }
      };
      buildMap(data || {});
      setFileContents(fileMap);
    } catch (err) {
      console.error("Error fetching files:", err);
    }
  };

  // Save all files manually
  const saveAllFiles = async () => {
    if (!selectedProject) return;
    for (const [fileId, content] of Object.entries(fileContents)) {
      await updateFileContent(fileId, content);
    }
  };

  // Handle code editor change
  const handleFileChange = async (code) => {
    if (!activeFile) return;
    setFileContents((prev) => ({ ...prev, [activeFile]: code }));
    if (autoSave) await updateFileContent(activeFile, code);
  };

  // Handle file creation
  const handleCreate = async (name) => {
    try {
      await createFileOrFolder(selectedProject._id, name);
      await fetchFiles(selectedProject._id);
    } catch (err) {
      console.error("Create failed:", err);
    }
  };

  // Handle file rename
  const handleRename = async (oldPath, newName) => {
    try {
      await renameFileOrFolder(selectedProject._id, oldPath, newName);
      await fetchFiles(selectedProject._id);
    } catch (err) {
      console.error("Rename failed:", err);
    }
  };

  // Handle file deletion
  const handleDelete = async (path) => {
    try {
      await deleteFileOrFolder(selectedProject._id, path);
      await fetchFiles(selectedProject._id);
      if (activeFile === path) setActiveFile(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Auto refresh when project changes
  useEffect(() => {
    if (selectedProject) fetchFiles(selectedProject._id);
  }, [selectedProject]);

  useEffect(() => {
    fetchProjects();
    console.log()
  }, []);

  return (
    <>
      <Navbar />
      <div
        className={`d-flex flex-column vh-100 ${theme === "light" ? "bg-light text-dark" : "bg-dark text-light"} mt-4`}
      >
        {/* --- Top IDE Bar --- */}
        <div
          className={`d-flex justify-content-between align-items-center px-3 py-2 shadow-sm mt-5 ${ideTextColor}`}
          style={{ backgroundColor: ideNavBg }}
        >
          <DropdownButton
            title={selectedProject ? selectedProject.projectName : "Select Project"}
            variant={theme === "light" ? "secondary" : "dark"}
          >
            {projects.map((proj) => (
              <Dropdown.Item
                key={proj._id}
                onClick={() => setSelectedProject(proj)}
              >
                {proj.projectName}
              </Dropdown.Item>
            ))}
          </DropdownButton>

          <div className="d-flex align-items-center gap-2">
            <Form.Check
              type="switch"
              id="auto-save-switch"
              label="Auto Save"
              checked={autoSave}
              onChange={(e) => setAutoSave(e.target.checked)}
            />
            <Button onClick={saveAllFiles}>
              <Save size={18} className="me-1" /> Save
            </Button>
          </div>
        </div>

        {/* --- Main Editor Section --- */}
        <div className="flex-grow-1 d-flex mt-2">
          {/* --- File Explorer Sidebar --- */}
          <div
            className="border-end p-2"
            style={{ width: 250, backgroundColor: ideNavBg }}
          >
            {selectedProject && (
              <FileExplorer
                projectId={selectedProject._id}
                onSelect={(path) => setActiveFile(path)}
                onCreate={handleCreate}
                onDelete={handleDelete}
                onRename={handleRename}
                selectedFile={activeFile}
                theme={theme}
              />
            )}
          </div>

          {/* --- Code Editor --- */}
          <div className="flex-grow-1">
            <SandpackProvider
              files={
                files && Object.keys(files).length > 0
                  ? fileContents
                  : {
                      "/index.js": "// Start coding by creating or selecting files from the explorer.",
                    }
              }
              template="react"
              theme={theme === "light" ? ecoLight : dracula}
              customSetup={{
                dependencies: { react: "^18.2.0", "react-dom": "^18.2.0" },
              }}
            >
              <SandpackLayout style={{ height: "85vh", width: "100%" }}>
                <SandpackCodeEditor
                  key={activeFile || "empty"}
                  style={{ height: "85vh", flex: 1 }}
                  showLineNumbers
                  showInlineErrors
                  wrapContent
                  showTabs
                  closableTabs
                  onChange={handleFileChange}
                />
                <SandpackPreview style={{ height: "85vh", flex: 1 }} 
                showNavigator ={true}
                showOpenInCodeSandbox={false}/>
              </SandpackLayout>
            </SandpackProvider>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
