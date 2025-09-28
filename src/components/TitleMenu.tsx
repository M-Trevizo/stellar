type TitleMenuProps = {
    menu: "file" | "edit"
}

export default function TitleMenu(props: TitleMenuProps) {
    const { menu } = props;
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

    let list;
    if (menu === "file") {
        list = fileMenuArr.map((item, idx) => <li key={idx} className="border-b-1 pl-2 hover:bg-gray-500">{item}</li>)
    }
    if (menu === "edit") {
        list = editMenuArr.map((item, idx) => <li key={idx} className="border-b-1 pl-2 hover:bg-gray-500">{item}</li>);
    }
    
    return (
        <menu className="bg-gray-600 drop-shadow-sm drop-shadow-black flex flex-col absolute top-[30px] w-30">
            {list}
        </menu>
    );
}