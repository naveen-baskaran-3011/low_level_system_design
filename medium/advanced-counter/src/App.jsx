import { useState } from "react"

export default function App() {
    const [value, setValue] = useState(0);
    const [asyncActionInProgress, setAsyncActionInProgress] = useState(false);
    const [increamentBy, setIncreamentBy] = useState(1);
    const [timerDelay, setTimerDelay] = useState(1);

    const performOperation = (action) => {
        switch(action) {
            case '+':
                setValue(prev => prev + increamentBy);
                break;
            case '-':
                setValue(prev => prev - increamentBy);
                break;
            case 'async +':
                setAsyncActionInProgress(true);
                setTimeout(() => {
                    setValue(prev => prev + increamentBy);
                    setAsyncActionInProgress(false);
                }, timerDelay * 1000)
                break;
            case 'async -':
                setAsyncActionInProgress(true);
                setTimeout(() => {
                    setValue(prev => prev - increamentBy);
                    setAsyncActionInProgress(false);
                }, timerDelay * 1000)
                break;
        }
    }
    return <div>
        <div>{value}</div>
        <div>
            <button onClick={() => performOperation('+')}>+</button>
            <button onClick={() => performOperation('-')}>-</button>
        </div>
        <div>
            <button
                disabled={asyncActionInProgress}
                onClick={() => performOperation('async +')}>async +</button>
            <button
                disabled={asyncActionInProgress}
                onClick={() => performOperation('async -')}>async -</button>
        </div>
        <div>
            <label htmlFor="increament_by">Increament By</label>
            <input type="number" name="increament_by" id="increament_by" defaultValue={increamentBy} onChange={(e) => {
                setIncreamentBy(Number(e.target.value));
            }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="timer">Delay by {timerDelay} seconds</label>
            <input
                style={{
                    width: 'fit-content'
                }}
                type="range"
                name="timer"
                id="timer"
                min={1}
                max={5}
                defaultValue={timerDelay} onChange={(e) => {
                setTimerDelay(Number(e.target.value));
            }} />
        </div>
    </div>
}