import { useCallback, useContext, useEffect } from "react";
import { TotalConfigContext } from "../App";
import { createConfig, findNode } from "../data";

function IconRename(props) {
    return (
        <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em" {...props}>
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10 4H8v2H5a3 3 0 00-3 3v6a3 3 0 003 3h3v2h2V4zM8 8v8H5a1 1 0 01-1-1V9a1 1 0 011-1h3z"
                clipRule="evenodd"
            />
            <path
                fill="currentColor"
                d="M19 16h-7v2h7a3 3 0 003-3V9a3 3 0 00-3-3h-7v2h7a1 1 0 011 1v6a1 1 0 01-1 1z"
            />
        </svg>
    );
}

function IconDelete(props) {
    return (
        <svg
            viewBox="0 0 1024 1024"
            fill="currentColor"
            height="1em"
            width="1em"
            {...props}
        >
            <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" />
        </svg>
    );
}

function IconFolderPlus(props) {
    return (
        <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            {...props}
        >
            <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2zM12 11v6M9 14h6" />
        </svg>
    );
}

function IconFileAdd(props) {
    return (
        <svg
            viewBox="0 0 1024 1024"
            fill="currentColor"
            height="1em"
            width="1em"
            {...props}
        >
            <path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494zM544 472c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v108H372c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h108v108c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V644h108c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H544V472z" />
        </svg>
    );
}

export default function Options({
    config,
    setIsEditing,
    setIsOpen
}) {

    const totalConfig = useContext(TotalConfigContext);

    useEffect(() => {
        setIsEditing(config.id === totalConfig.newlyAddedFile);
    }, [
        config.id,
        totalConfig.newlyAddedFile,
    ]);

    const onDelete = useCallback(() => {
        let parentNode = findNode(totalConfig.config, config.parent);
        if (parentNode) {
            let currentNodeIndex = parentNode.nodes.findIndex(node => node.id === config.id);
            currentNodeIndex > -1 && parentNode.nodes.splice(currentNodeIndex, 1);
        }
        totalConfig.setConfig({ ...totalConfig.config });
    }, [totalConfig.config, config.id]);

    const onCreateNew = useCallback((type) => {
        let currentNode = findNode(totalConfig.config, config.id);
        const newConfig = createConfig(type, config.id);
        currentNode.nodes.push(newConfig);

        setIsOpen(true);
        totalConfig.setConfig({ ...totalConfig.config });
        totalConfig.setNewlyAddedFile(newConfig.id);
    }, [totalConfig.config, config.id]);

    return <div className="options-container">
        <div className="icons" onClick={(event) => {
            setIsEditing(true);
            event.stopPropagation();
        }}><IconRename /></div>
        {config.parent && <div className="icons" onClick={(event) => {
            event.stopPropagation();
            onDelete();
        }}><IconDelete /></div>}
        {config.isFolder && <div className="icons" onClick={(event) => {
            event.stopPropagation();
            onCreateNew('folder');
        }}><IconFolderPlus /></div>}
        {config.isFolder && <div className="icons" onClick={(event) => {
            event.stopPropagation();
            onCreateNew('file');
        }}><IconFileAdd /></div>}
    </div>
}