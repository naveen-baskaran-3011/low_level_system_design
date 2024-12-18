import { useEffect, useRef, useState } from 'react';
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
    const [status, setStatus] = useState('reset');

    useEffect(() => {
        let interval;
        if(status === 'started') {
            interval = setInterval(() => {
                setMS(prev => prev+10);
            }, 10);
        } else if(status === 'reset') {
            setMS(0);
        }

        return () => interval && clearInterval(interval)
    }, [status]);

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
            <button onClick={() => setStatus('started')} disabled={status === 'started'}>Start</button>
            <button onClick={() => setStatus('paused')} disabled={['reset', 'paused'].includes(status)}>Stop</button>
            <button onClick={() => setStatus('reset')} disabled={mS === 0}>Reset</button>
        </div>
    </div>;
}