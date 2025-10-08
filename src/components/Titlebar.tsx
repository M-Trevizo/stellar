// Template from Tauri.app
import { getCurrentWindow } from "@tauri-apps/api/window";
import { MouseEvent, useState } from "react";
import FileMenu from "./FileMenu";
import EditMenu from "./EditMenu";

// Props for the title bar menus
export type TitleMenuProps = {
    closeMenus: () => void;
}

type TitlebarProps = {
    fileName: string,
    newFile: () => void,
    open: () => void,
    saveAs: () => void,
    save: () => void,
    copy: () => void,
}

export default function Titlebar(props: TitlebarProps) {
    const { fileName, newFile, open, saveAs, save, copy } =  props;
    const appWindow = getCurrentWindow();
    const [showFile, setShowFile] = useState<boolean>(false);
    const [showEdit, setShowEdit] = useState<boolean>(false);

    const handleDrag = (e: MouseEvent) => {
        if (e.buttons === 1) {
            if (e.detail === 2) {
                appWindow.toggleMaximize();
            }
            else {
                appWindow.startDragging();
            }
        }
    }

    const closeMenus = () => {
        setShowFile(false);
        setShowEdit(false);
    }

    const handleClick = (menu: "file" | "edit") => {
        switch(menu) {
            case "file": 
                setShowEdit(false);
                setShowFile(!showFile);
            break;
            case "edit": 
                setShowFile(false);
                setShowEdit(!showEdit);
            break;
            default: console.log("param string not recognized");
        }
    }
    

    return (
        <div className="h-[30px] bg-gray-900 absolute min-w-screen flex flex-row justify-between">
            <div className="flex justify-center items-center gap-0 text-white">
                <div className="h-full relative">
                    <button 
                        className="px-4 h-full hover:cursor-pointer hover:bg-gray-700"
                        onClick={() => handleClick("file")}
                    >
                        File
                    </button>
                    {
                        showFile && 
                        <FileMenu 
                            closeMenus={closeMenus} 
                            newFile={newFile}
                            open={open}
                            saveAs={saveAs}
                            save={save}
                        />
                    }
                </div>
                <div className="h-full relative">
                    <button 
                        className="px-4 h-full hover:cursor-pointer hover:bg-gray-700"
                        onClick={() => handleClick("edit")}
                    >
                        Edit
                    </button>
                    {
                        showEdit && 
                        <EditMenu 
                            closeMenus={closeMenus} 
                            copy={copy}
                        />
                    }
                </div>
            </div>
            <div className="flex justify-center items-center w-full text-white text-center" onMouseDown={handleDrag}>
                <p>{fileName}</p>
            </div>
            <div className="flex">
                <button 
                    id="titlebar-minimize" 
                    title="minimize" 
                    className="p-0 m-0 w-[30px] border-none flex flex-row justify-center items-center hover:bg-gray-700"
                    onClick={() => appWindow.minimize()}
                >
                 {/* https://api.iconify.design/mdi:window-minimize.svg */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <path fill="white" d="M19 13H5v-2h14z" />
                </svg>
                </button>
                <button 
                    id="titlebar-maximize" 
                    title="maximize" 
                    className="p-0 m-0 w-[30px] border-none flex flex-row justify-center items-center hover:bg-gray-700"
                    onClick={() => appWindow.toggleMaximize()}
                >
                {/* https://api.iconify.design/mdi:window-maximize.svg */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <path fill="white" d="M4 4h16v16H4zm2 4v10h12V8z" />
                </svg>
                </button>
                <button 
                    id="titlebar-close" 
                    title="close" 
                    className="p-0 m-0 w-[30px] border-none flex flex-row justify-center items-center hover:bg-red-500"
                    onClick={() => appWindow.close()}
                >
                {/* https://api.iconify.design/mdi:close.svg */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <path
                    fill="white"
                    d="M13.46 12L19 17.54V19h-1.46L12 13.46L6.46 19H5v-1.46L10.54 12L5 6.46V5h1.46L12 10.54L17.54 5H19v1.46z"
                    />
                </svg>
                </button>
            </div>
            
        </div>
    );
}