import { useState, SyntheticEvent } from "react";
import { invoke } from "@tauri-apps/api/core";
import TextBox from "./components/TextBox";
import Titlebar from "./components/Titlebar";

function App() {
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState<string>("");
  const [selection, setSelection] = useState<string>("");

  // File menu function
  const saveAs = async () => {
    try {
      await invoke("save_as", {content: content})
      const name = await invoke("get_file_name");
      setFileName(name as string);
    }
    catch (err) {
      console.error(err);
    }
    
  }

  const open = async () => {
    try {
      const text = await invoke("open");
      setContent(text as string);
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
      if (fileName.length === 0) {
        const name = await invoke("get_file_name");
        setFileName(name as string);
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  const newFile = () => {
    invoke("new");
    setContent("");
    setFileName("");
  }

  // Edit Menu function
  const handleSelect = (e: SyntheticEvent) => {
    const target = e.target as HTMLTextAreaElement;
    const text = target.value.substring(target.selectionStart, target.selectionEnd);
    setSelection(text);
  }

  const getCaretPosition = () => {
    const textArea = document.getElementById("text-area") as HTMLTextAreaElement;
    const caretStart = textArea.selectionStart;
    return caretStart;
  }

  const copy = () => {
    navigator.clipboard.writeText(selection);
  }

  const paste = async () => {
    const caretPosition = getCaretPosition();
    const pasteText = await navigator.clipboard.readText();
    const contentLeft = content.substring(0, caretPosition);
    const contentRight = content.substring(caretPosition);
    const newContent = contentLeft + pasteText + contentRight;
    setContent(newContent);
  }


  return (
    <>
      <main className="bg-eerie-800 flex flex-col">
        <Titlebar 
          fileName={fileName} 
          open={open} 
          save={save} 
          saveAs={saveAs}
          newFile={newFile}
          copy={copy}
          paste={paste}
        />
        <TextBox 
          content={content} 
          setContent={setContent}
          handleSelect={handleSelect}
        />
      </main>
    </>
  );
}

export default App;
