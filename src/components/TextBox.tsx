import { SyntheticEvent } from "react";

type TextBoxProps = {
    content: string,
    setContent: (nextState:string) => void;
    handleSelect: (e: SyntheticEvent) => void;
}

export default function TextBox(props: TextBoxProps) {
    const { content, setContent, handleSelect } = props;
    
    return (
        <textarea
            rows={10} 
            cols={10}
            className="text-latte font-roboto font-normal p-2 pt-8 outline-0 resize-none border-white  min-h-screen"
            onChange={e => setContent(e.target.value)}
            value={content}
            onSelect={handleSelect}
        >
        </textarea>
    );
}