CodeFlow IDE - Browser-Based React IDE

CodeFlow IDE is an interactive, browser-based IDE built with React that allows users to create, manage, and organize project files and folders in a seamless, hierarchical interface. It supports folder structure, file creation, deletion, and dynamic file navigation with a modern user interface.

Table of Contents

Features

Technologies Used

Project Structure

Installation

Usage

File Explorer Functionality

Contributing

License

Features

Hierarchical File Explorer: Browse folders and files in a tree-like structure.

File Operations: Create and delete files and folders.

Dynamic Navigation: Click folders to expand/collapse and view nested files.

React Context & State Management: Efficient state handling for folder expansion.

Icon Integration: Uses Lucide React for file and folder icons.

Lightweight and Fast: Fully client-side with optional backend integration.

Expandable for IDE Features: Can be extended with code editing, live preview, and auto-save.

Technologies Used

Frontend: React, Bootstrap, HTML, CSS, JavaScript

State Management: React useState, useContext

Icons: Lucide React

Optional Backend: Node.js + Express + MongoDB/MySQL for persistent storage

Routing: React Router (if multiple IDE pages or settings are added)

Project Structure
CodeFlowIDE/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── FileExplorer.jsx
│   │   ├── File.jsx
│   │   └── Folder.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── api/                # Optional API calls if using backend
│   ├── App.jsx
│   ├── index.jsx
│   └── styles.css
│
├── README.md
└── package.json

Installation
Prerequisites

Node.js >= 18

npm or yarn

Steps

Clone the repository:

git clone https://github.com/yourusername/codeflow-ide.git
cd codeflow-ide


Install dependencies:

npm install


Run the app:

npm start


The IDE will open in your browser at http://localhost:3000.

Usage

Explore the File Tree: Click folders to expand/collapse them.

Create a New File/Folder: Click the + icon to add new items.

Delete a File/Folder: Click the Trash icon to remove items.

Toggle Folder View: Click the arrow icons (ChevronDown / ChevronRight) to open or close folders.

Light/Dark Mode: Switch themes if implemented via ThemeContext.

File Explorer Functionality

Hierarchical Display: Files and folders are displayed in a nested structure.

State Management: Folder expansion is controlled via React state.

Dynamic Rendering: Only shows child files when the parent folder is expanded.

Extensible: Can be extended to support renaming, drag-and-drop, and inline code editing.

Contributing

Fork the repository.

Create a feature branch:

git checkout -b feature/your-feature


Make your changes and commit:

git commit -m "Add your feature"


Push to your branch:

git push origin feature/your-feature


Open a Pull Request.
