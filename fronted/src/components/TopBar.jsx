import React, { useState } from "react";
import { Save, Settings, Sun, Moon } from "lucide-react";

export const TopBar = ({ projectId, autoSave, onAutoSaveToggle, onSave }) => {
  const [theme, setTheme] = useState("light");

  

  return (
    <div
      className={`d-flex align-items-center justify-content-between px-3 ${theme === "light" ? "bg-light text-dark" : "bg-dark text-light"}`}
      style={{
        height: "48px",
        borderBottom: "1px solid #dee2e6",
        backgroundColor: theme === "light" ? "#f8f9fa" : "#212529",
      }}
    >
      <div className="d-flex align-items-center gap-3">
        <div className="d-flex align-items-center gap-2">
          <div className="d-flex justify-content-center align-items-center rounded bg-primary text-white fw-bold" style={{ width: "24px", height: "24px", fontSize: "12px" }}>
            R
          </div>
          <span className="fw-semibold">React IDE</span>
        </div>
        <span className="small text-muted">Project: {projectId}</span>
      </div>

      <div className="d-flex align-items-center gap-3">
        {/* Auto-save toggle */}
        <div className="form-check form-switch d-flex align-items-center gap-1">
          <input
            className="form-check-input"
            type="checkbox"
            id="autosave"
            checked={autoSave}
            onChange={onAutoSaveToggle}
          />
          <label className="form-check-label small" htmlFor="autosave">
            Auto-save {autoSave && <span className="text-success">●</span>}
          </label>
        </div>

        {/* Save button */}
        <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1" onClick={onSave}>
          <Save size={16} />
          Save
        </button>

        {/* Settings button */}
        <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1">
          <Settings size={16} />
        </button>

        {/* Light/Dark mode toggle */}
        <button
          className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </div>
  );
};
