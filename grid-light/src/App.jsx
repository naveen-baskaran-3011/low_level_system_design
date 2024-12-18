import { useState } from "react";
import Matrix from "./Matrix";

export default function() {
    const [gridSize, setGridSize] = useState(3);
    const [timeOutDelay, setTimeOutDelay] = useState(300);
    return <div>
        <h3>Click on cells to select them. Once all cells are selected, they will be unselected one by one in the reverse order they were selected.</h3>
        <Matrix timeOut={timeOutDelay} gridSize={gridSize} />
        <div className="controls" style={{
            position: "absolute",
            top: '100px',
            right: '100px',
            padding: '10px',
            backgroundColor: 'grey',
            borderRadius: '10px',
            color: 'white'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '5px'
            }}>
                <label>Grid size {gridSize}</label>
                <input
                    type="range"
                    name="gridSize"
                    id="gridSize"
                    min={2}
                    max={4}
                    step={1}
                    defaultValue={gridSize}
                    style={{
                        accentColor: 'lightgreen'
                    }}
                    onChange={(event) => setGridSize(Number(event.target.value))} />
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '5px'
            }}>
                <label>Delay {timeOutDelay}</label>
                <input
                    type="range"
                    name="delay"
                    id="delay"
                    min={100}
                    max={700}
                    step={100}
                    defaultValue={timeOutDelay}
                    style={{
                        accentColor: 'lightgreen'
                    }}
                    onChange={(event) => setTimeOutDelay(Number(event.target.value))} />
            </div>
        </div>
    </div>
}