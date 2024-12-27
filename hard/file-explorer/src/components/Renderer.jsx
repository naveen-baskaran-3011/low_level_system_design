import { useCallback, useContext, useState } from "react";
import File from "./File";
import Folder from "./Folder";
import { findNode } from "../data";
import { TotalConfigContext } from "../App";

export default function Renderer({ config }) {
    const [isEditing, setIsEditing] = useState(false);
    const [label, setLabel] = useState(config.name);
    const totalConfig = useContext(TotalConfigContext);

    const onChange = useCallback((event) => {
        setLabel(event.target.value);
    }, []);
    const onSave = useCallback(() => {
        let foundNode = findNode(totalConfig.config, config.id);
        if(foundNode) {
            foundNode.name = label;
        }
        totalConfig.setConfig(totalConfig.config);
        totalConfig.setNewlyAddedFile(null);
        setIsEditing(false);
    }, [label]);

    const ComponentToRender = config.isFolder ? Folder : File;
    return <ComponentToRender
        label={label}
        key={config.id}
        config={config}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onChange={onChange}
        onSave={onSave} />
}