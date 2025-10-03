import type { TitleMenuProps } from "./Titlebar";

type FileMenuProps = TitleMenuProps & {
    newFile: () => void,
    open: () => void,
    saveAs: () => void,
    save: () => void
}

export default function FileMenu(props: FileMenuProps) {
    const { closeMenus, newFile, open, saveAs, save } = props;
    const fileMenuArr: string[] = [
        "New",
        "Open",
        "Save As...",
        "Save"
    ]

    // Handle calls for the file menu
    const handleClick = (option: number) => {
        console.log(`File option selected: ${fileMenuArr[option]}`)
        switch(fileMenuArr[option]) {
            case "New": newFile();
            break;
            case "Open": open();
            break;
            case "Save As...": saveAs();
            break;
            case "Save": save();
        }   
    }
    
    return (
        <menu 
            className="bg-gray-600 drop-shadow-sm drop-shadow-black flex flex-col absolute top-[30px] w-30" 
            onMouseLeave={closeMenus}
        >
            {
                fileMenuArr.map((item, idx) => <li key={idx} onClick={() => handleClick(idx)} className="pl-2 py-1 hover:bg-gray-500">{item}</li>)
            }
        </menu>
    );
}