import Renderer from "./components/Renderer"
import './App.css';
import { configGenerator, fileExplorerData } from "./data"
import { createContext, useCallback, useState } from "react";

export const TotalConfigContext = createContext({
    config: {},
    setConfig: () => {},
    newlyAddedFile: null,
    setNewlyAddedFile: () => {}
})

export default function App() {
    const [config, setConfig] = useState(configGenerator(fileExplorerData));
    const [newlyAddedFile, setNewlyAddedFile] = useState(null);

    return (
        <TotalConfigContext.Provider value={{
            config,
            setConfig,
            newlyAddedFile,
            setNewlyAddedFile
        }}>
            <div>
                <Renderer
                    config={config} />
            </div>
        </TotalConfigContext.Provider>)
}