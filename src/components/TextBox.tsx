import { useState } from "react";

export default function TextBox() {
    const [content, setContent] = useState("");

    return (
        <textarea 
            rows={10} 
            cols={10}
            className="text-white p-2 outline-0 resize-none border-white border-2 min-h-screen"
            onChange={e => setContent(e.target.value)}
        >
        </textarea>
    );
}