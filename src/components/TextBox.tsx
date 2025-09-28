import { useState } from "react";

export default function TextBox() {
    const [content, setContent] = useState("");

    return (
        <textarea 
            rows={10} 
            cols={10}
            className="text-white p-2 pt-8 outline-0 resize-none border-white  min-h-screen"
            onChange={e => setContent(e.target.value)}
        >
        </textarea>
    );
}