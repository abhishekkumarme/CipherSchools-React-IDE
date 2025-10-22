export const defaultFiles = {
  "/src/App.js": {
    code: `import React from "react";

export default function App() {
  return <h1>Hello, CipherStudio!</h1>;
}`
  },
  "/src/index.js": {
    code: `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`
  },
};
