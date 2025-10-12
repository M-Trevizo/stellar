import type { TitleMenuProps } from "./Titlebar";

type EditMenuProps = TitleMenuProps & {
    copy: () => void,
    paste: () => void,
}

export default function EditMenu(props: EditMenuProps) {
    const { closeMenus, copy, paste } = props;
    const editMenuArr: string[] = [
        "Cut",
        "Copy",
        "Paste",
        "Delete"
    ]

    

    // Handle calls for edit menu commands
    const handleClick = (option: number) => {
        console.log(`Edit option selected: ${editMenuArr[option]}`);
        closeMenus();
        switch(editMenuArr[option]) {
            case "Copy": copy();
            break;
            case "Paste": paste();
            break;
        }
    }
    
    return (
        <menu 
            className="bg-eerie-700 drop-shadow-sm drop-shadow-black flex flex-col absolute top-[30px] w-30" 
            onMouseLeave={closeMenus}
        >
            {
                editMenuArr.map((item, idx) => <li key={idx} onClick={() => handleClick(idx)} className="cursor-default pl-2 py-1 hover:bg-eerie-600">{item}</li>
                )
            }
        </menu>
    );
}