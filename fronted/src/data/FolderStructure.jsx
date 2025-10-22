import { defaultFiles } from "./defaultFiles";

import { Sandpack, SandpackCodeEditor, SandpackFileExplorer, SandpackLayout, SandpackPreview, SandpackProvider } from "@codesandbox/sandpack-react";

export const FolderStructure = () => {
  const files = {}
  
  return (
    <SandpackProvider
      files={files} 
      theme="light" 
      template="react"
      
    >
      <SandpackLayout>
        <SandpackFileExplorer />
        <SandpackCodeEditor closableTabs showTabs />
        <SandpackPreview />
      </SandpackLayout>
    </SandpackProvider>
  )  
}
