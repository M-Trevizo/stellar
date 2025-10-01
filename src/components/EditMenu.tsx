import type { TitleMenuProps } from "./Titlebar";

type EditMenuProps = TitleMenuProps & {
    cut: () => void,
}

export default function EditMenu(props: EditMenuProps) {
    const { closeMenus } = props;
    const editMenuArr: string[] = [
        "Cut",
        "Copy",
        "Paste",
        "Delete"
    ]

    // Handle calls for edit menu commands
    const handleClick = (option: number) => {
        console.log(`Edit option selected: ${editMenuArr[option]}`);
        switch(editMenuArr[option]) {
            case "Copy": ;
        }
    }
    
    return (
        <menu 
            className="bg-gray-600 drop-shadow-sm drop-shadow-black flex flex-col absolute top-[30px] w-30" 
            onMouseLeave={closeMenus}
        >
            {
                editMenuArr.map((item, idx) => <li key={idx} onClick={() => handleClick(idx)} className="pl-2 py-1 hover:bg-gray-500">{item}</li>
                )
            }
        </menu>
    );
}