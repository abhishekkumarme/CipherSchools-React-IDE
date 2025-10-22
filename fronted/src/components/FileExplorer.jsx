import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Folder,
  File,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
} from "lucide-react";
import {
  getProjectFiles,
  createFileOrFolder,
  deleteFileOrFolder,
  
} from "../api's/FilesApi";

const FileExplorer = ({
  projectId,
  onSelect,
  selectedFile,
  theme,
}) => {
  const [files, setFiles] = useState({});
  const [expanded, setExpanded] = useState({});
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [renaming, setRenaming] = useState(null);
  const [renameValue, setRenameValue] = useState("");

  const bg = theme === "light" ? "#f8f9fa" : "#212529";
  const color = theme === "light" ? "#212529" : "#f8f9fa";

  useEffect(() => {
    if (projectId) fetchFiles();
  }, [projectId]);

  const fetchFiles = async () => {
    try {
      const data = await getProjectFiles(projectId);
      setFiles(data || {});
    } catch (err) {
      console.error("Error fetching files:", err);
    }
  };

  const toggleExpand = (path) => {
    setExpanded((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const handleCreate = async () => {
    if (!newName.trim()) return;
    try {
      await createFileOrFolder(projectId, newName);
      await fetchFiles();
      setCreating(false);
      setNewName("");
    } catch (err) {
      console.error("Create failed:", err);
    }
  };

  const handleDelete = async (path) => {
    if (!window.confirm("Delete this file/folder?")) return;
    try {
      await deleteFileOrFolder(projectId, path);
      await fetchFiles();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleRename = async (path) => {
    if (!renameValue.trim()) {
      setRenaming(null);
      return;
    }
    try {
      await renameFileOrFolder(projectId, path, renameValue);
      await fetchFiles();
      setRenaming(null);
      setRenameValue("");
    } catch (err) {
      console.error("Rename failed:", err);
    }
  };

  const renderTree = (nodes, parentPath = "") => {
    return Object.entries(nodes).map(([name, value]) => {
      const fullPath = parentPath ? `${parentPath}/${name}` : name;
      const isFolder = typeof value === "object";

      return (
        <div key={fullPath} style={{ marginLeft: parentPath ? 16 : 0 }}>
          <div
            className={`d-flex align-items-center justify-content-between py-1 px-2 rounded ${
              selectedFile === fullPath ? "bg-primary text-light" : ""
            }`}
            style={{
              cursor: "pointer",
              backgroundColor: selectedFile === fullPath ? "" : bg,
              color: selectedFile === fullPath ? "#fff" : color,
            }}
            onClick={() => (isFolder ? toggleExpand(fullPath) : onSelect(fullPath))}
          >
            <div className="d-flex align-items-center gap-1">
              {isFolder ? (
                expanded[fullPath] ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )
              ) : null}
              {isFolder ? (
                <Folder size={14} color={color} />
              ) : (
                <File size={14} color={color} />
              )}
              {renaming === fullPath ? (
                <input
                  autoFocus
                  className="form-control form-control-sm"
                  style={{
                    backgroundColor: bg,
                    color: color,
                    border: "1px solid #999",
                    width: "120px",
                  }}
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  onBlur={() => handleRename(fullPath)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleRename(fullPath);
                    if (e.key === "Escape") setRenaming(null);
                  }}
                />
              ) : (
                <span>{name}</span>
              )}
            </div>

            <div className="d-flex align-items-center gap-1">
              <Edit2
                size={13}
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setRenaming(fullPath);
                  setRenameValue(name);
                }}
              />
              <Trash2
                size={13}
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(fullPath);
                }}
              />
            </div>
          </div>

          {isFolder && expanded[fullPath] && (
            <div>{renderTree(value, fullPath)}</div>
          )}
        </div>
      );
    });
  };

  return (
    <div 
      style={{
        backgroundColor: bg,
        color: color,
        fontSize: "14px",
        height: "95%",
        overflowY: "auto",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-2 px-2">
        <strong>Files</strong>
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => setCreating(!creating)}
        >
          <Plus size={14} />
        </button>
      </div>

      {creating && (
        <div className="d-flex align-items-center gap-1 mb-2 px-2">
          <input
            className="form-control form-control-sm"
            style={{
              backgroundColor: bg,
              color: color,
              border: "1px solid #888",
              width: "120px",
            }}
            placeholder="New file/folder name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button className="btn btn-sm btn-success" onClick={handleCreate}>
            <Save size={13} />
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => setCreating(false)}
          >
            <X size={13} />
          </button>
        </div>
      )}

      <div>{renderTree(files)}</div>
    </div>
  );
};

export default FileExplorer;
