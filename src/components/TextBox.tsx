type TextBoxProps = {
    content: string,
    setContent: (nextState:string) => void;
}

export default function TextBox(props: TextBoxProps) {
    const { content, setContent } = props;

    return (
        <textarea 
            rows={10} 
            cols={10}
            className="text-white p-2 pt-8 outline-0 resize-none border-white  min-h-screen"
            onChange={e => setContent(e.target.value)}
            value={content}
        >
        </textarea>
    );
}