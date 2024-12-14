import { useEffect, useRef, useState } from 'react';
import './App.css';

const SIGNAL_CONFIG = {
    red: {
        id: 'red',
        waitingTime: 5000,
        nextSignalId: 'green'
    },
    yellow: {
        id: 'yellow',
        waitingTime: 3000,
        nextSignalId: 'red'
    },
    green: {
        id: 'green',
        waitingTime: 10000,
        nextSignalId: 'yellow'
    }
};

export default function() {
    const counterRef = useRef(null);
    const [currentSignal, setCurrentSignal] = useState('red');
    useEffect(() => {
        console.log('current signal', currentSignal);

        const currentTimer = setTimeout(() => {
            counterRef.current.innerText = SIGNAL_CONFIG[currentSignal].waitingTime / 1000;
            setCurrentSignal(SIGNAL_CONFIG[currentSignal].nextSignalId);
        }, SIGNAL_CONFIG[currentSignal].waitingTime);

        const currentInterval = setInterval(() => {
            counterRef.current.innerText = Number(counterRef.current.innerText) - 1;
        }, 1000);

        return () => {
            // clearTimeout(currentTimer);
            clearInterval(currentInterval);
        };
    }, [currentSignal]);

    return (
        <div className="App">
            <div className='signal-container'>
                <div className={`signal-light ${currentSignal === 'red' && 'red'}`}></div>
                <div className={`signal-light ${currentSignal === 'yellow' && 'yellow'}`}></div>
                <div className={`signal-light ${currentSignal === 'green' && 'green'}`}></div>
            </div>
            <div>
                <b className='time-counter'>
                    <p ref={counterRef}>{SIGNAL_CONFIG[currentSignal].waitingTime / 1000}</p>
                    &nbsp;Seconds
                </b>
            </div>
        </div>
    );
};