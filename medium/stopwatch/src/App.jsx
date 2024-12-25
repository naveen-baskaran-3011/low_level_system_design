import { useCallback, useEffect, useRef, useState } from 'react';
import './App.styles.css';

function formatTime(milliSeconds) {
    const afterHoursMS = milliSeconds % (1000*60*60);
    const hours = Math.floor((milliSeconds) / (1000*60*60));
    const afterMinsMS = afterHoursMS % (1000*60);
    const mins = Math.floor((afterHoursMS) / (1000*60));
    const afterSecsMS = afterMinsMS % (1000);
    const seconds = Math.floor((afterMinsMS) / (1000));

    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${afterSecsMS.toString().padStart(3, '0')}`
}

export default function App() {
    const [mS, setMS] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const animationFrameRef = useRef(0);
    let currentTime = useRef(Date.now());

    const timerFunction = useCallback(() => {
        setMS(Date.now() - currentTime.current);
        animationFrameRef.current = requestAnimationFrame(timerFunction);
    }, []);

    useEffect(() => {
        return () => cancelAnimationFrame(animationFrameRef.current);
    }, []);

    const onStart = useCallback(() => {
        currentTime.current = Date.now() - mS;
        setIsTimerRunning(true);
        animationFrameRef.current = requestAnimationFrame(timerFunction)
    }, [mS]);

    const onStop = () => {
        setIsTimerRunning(false);
        cancelAnimationFrame(animationFrameRef.current);
    };

    const onReset = () => {
        setIsTimerRunning(false);
        setMS(0);
        currentTime.current = Date.now();
        cancelAnimationFrame(animationFrameRef.current);
    }

    return <div style={{
        width: 'fit-content',
        background: 'red',
        padding: '40px',
        borderRadius: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <h2>Stopwatch</h2>
        <h1>{formatTime(mS)}</h1>
        <div className="button-grp">
            <button onClick={onStart} disabled={isTimerRunning}>Start</button>
            <button onClick={onStop} disabled={!isTimerRunning}>Stop</button>
            <button onClick={onReset} disabled={mS === 0}>Reset</button>
        </div>
    </div>;
}