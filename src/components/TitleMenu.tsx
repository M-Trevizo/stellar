type TitleMenuProps = {
    menu: "file" | "edit",
    closeMenus: () => void
}

export default function TitleMenu(props: TitleMenuProps) {
    const { menu, closeMenus } = props;
    const fileMenuArr: string[] = [
        "New",
        "Open",
        "Save As...",
        "Save"
    ]
    const editMenuArr: string[] = [
        "Cut",
        "Copy",
        "Paste",
        "Delete"
    ]

    // TODO: Implement the option functionality
    const handleClick = (menu: "file" | "edit", option: number) => {
        if (menu === "file") console.log(`Option selected: ${menu}: ${fileMenuArr[option]}`);
        if (menu === "edit") console.log(`Option selected: ${menu}: ${editMenuArr[option]}`);
    }

    let list;
    if (menu === "file") {
        list = fileMenuArr.map((item, idx) => <li key={idx} onClick={() => handleClick(menu, idx)} className="pl-2 py-1 hover:bg-gray-500">{item}</li>)
    }
    if (menu === "edit") {
        list = editMenuArr.map((item, idx) => <li key={idx} onClick={() => handleClick(menu, idx)} className="pl-2 py-1 hover:bg-gray-500">{item}</li>);
    }
    
    return (
        <menu 
            className="bg-gray-600 drop-shadow-sm drop-shadow-black flex flex-col absolute top-[30px] w-30" 
            onMouseLeave={closeMenus}
        >
            {list}
        </menu>
    );
}