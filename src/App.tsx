import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import TextBox from "./components/TextBox";
import Titlebar from "./components/Titlebar";

function App() {
  const [content, setContent] = useState("");

  const saveAs = () => {
    invoke("save_as", {content: content})
  }

  return (
    <>
      <main className="bg-gray-800 flex flex-col">
        <Titlebar saveAs={saveAs}/>
        <TextBox setContent={setContent}/>
      </main>
    </>
  );
}

export default App;
