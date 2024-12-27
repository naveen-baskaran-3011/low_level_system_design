import { useCallback, useState } from "react";
import Renderer from "./Renderer";
import Options from "./Options";

function IconFolderClosed() {
    return (
        <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="1em"
            width="1em"
        >
            <path d="M448 96H275.9l-49.2-45.25C214.7 38.74 198.5 32 181.5 32H64C28.65 32 0 60.66 0 96v320c0 35.34 28.65 64 64 64h384c35.35 0 64-28.66 64-64V160c0-35.3-28.7-64-64-64zM64 80h117.5c4.273 0 8.293 1.664 11.31 4.688L256 144h192c8.822 0 16 7.176 16 16v32H48V96c0-8.82 7.18-16 16-16zm384 352H64c-8.822 0-16-7.176-16-16V240h416v176c0 8.8-7.2 16-16 16z" />
        </svg>
    );
}

function IconFolderOpen() {
    return (
        <svg
            viewBox="0 0 576 512"
            fill="currentColor"
            height="1em"
            width="1em"
        >
            <path d="M572.6 270.3l-96 192c-5.4 10.9-16.5 17.7-29.5 17.7H64c-35.35 0-64-28.66-64-64V96c0-35.34 28.65-64 64-64h117.5c16.97 0 33.25 6.742 45.26 18.75L275.9 96H416c35.35 0 64 28.66 64 64v32h-48v-32c0-8.824-7.178-16-16-16H256l-63.2-59.31c-3-3.03-7-4.69-11.3-4.69H64c-8.82 0-16 7.18-16 16v288l71.16-142.3A31.976 31.976 0 01147.8 224H544c23.7 0 39.2 25 28.6 46.3z" />
        </svg>
    );
}

export default function Folder({ label, config, isEditing, setIsEditing, onChange, onSave }) {
    const [isOpen, setIsOpen] = useState(false);

    return <div className="container">
        <div className="main-content folder" onClick={() => !isEditing && setIsOpen(prev => !prev)}>
            <div className="icon">
                {isOpen ? (
                    <IconFolderOpen />
                ) : (
                    <IconFolderClosed />
                )}
            </div>
            <div className="label">
                {isEditing ? <input
                    type="text"
                    autoFocus
                    defaultValue={label}
                    onChange={onChange}
                    onKeyUp={e => e.key === "Enter" && onSave()}
                    onBlur={onSave} /> : label}
                <div>
                    <Options
                        config={config}
                        setIsOpen={setIsOpen}
                        setIsEditing={setIsEditing} />
                </div>
            </div>
        </div>
        {isOpen && config.nodes.length > 0 && (
            <div className="sub-node">
                {console.log(config.nodes)}
                {config.nodes.map(node => <Renderer
                    key={node.id}
                    config={node} />)}
            </div>
        )}
    </div>
}