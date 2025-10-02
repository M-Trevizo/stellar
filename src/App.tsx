import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import TextBox from "./components/TextBox";
import Titlebar from "./components/Titlebar";

function App() {
  const [content, setContent] = useState("");

  const saveAs = () => {
    invoke("save_as", {content: content})
  }

  const open = () => {
    invoke("open")
      .then((text) => {
        setContent(text as string);
        console.log(text);
      })
      .catch((error) => console.error(error))
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
        <Titlebar open={open} save={save} saveAs={saveAs}/>
        <TextBox content={content} setContent={setContent}/>
      </main>
    </>
  );
}

export default App;
