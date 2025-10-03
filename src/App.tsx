import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import TextBox from "./components/TextBox";
import Titlebar from "./components/Titlebar";

function App() {
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState<string>("");

  const saveAs = () => {
    invoke("save_as", {content: content})
  }

  const open = async () => {
    try {
      await invoke("open");
      const name = await invoke("get_file_name");
      setFileName(name as string);
    }
    catch (err) {
      console.error(err);
    }
  }

  const save = async () => {
    try {
      await invoke("save", {content: content});
    }
    catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <main className="bg-gray-800 flex flex-col">
        <Titlebar fileName={fileName} open={open} save={save} saveAs={saveAs}/>
        <TextBox content={content} setContent={setContent}/>
      </main>
    </>
  );
}

export default App;
