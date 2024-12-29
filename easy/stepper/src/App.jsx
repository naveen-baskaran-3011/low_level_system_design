import { useEffect, useRef, useState } from 'react';
import './App.css';
import Stage from './Stage';

const STAGES_CONFIG = [
    {
        id: 1,
        name: 'Contact Details',
        desc: 'Add contact details for further communications.'
    },
    {
        id: 2,
        name: 'Shipping Address',
        desc: 'Add shipping address for successful delivery.'
    },
    {
        id: 3,
        name: 'Payment',
        desc: 'Complete Payment to complete the order.'
    },
    {
        id: 4,
        name: 'Delivered',
        desc: 'Ready to get delivered!'
    }
];

export default function App() {
    const [currentStageIndex, setCurrentStageIndex] = useState(0);
    const progressBarRef = useRef(null);

    useEffect(() => {
        if(progressBarRef.current && currentStageIndex < STAGES_CONFIG.length) {
            progressBarRef.current.style.width = `${33.3 * currentStageIndex}%`
        }
    }, [currentStageIndex])

    return <div>
        <div className="stages-container">
            {STAGES_CONFIG.map((stageConfig, index) => (
                <Stage
                    currentStageIndex={currentStageIndex}
                    key={index}
                    stageConfig={stageConfig}
                    index={index}
                    onClick={() => {
                        setCurrentStageIndex(index)
                    }} />
            ))}
            <div className="progress-bar-container">
                <div className="progress-bar" ref={progressBarRef}></div>
            </div>
        </div>
        <div className="other">
            <div className="current-description">
                {currentStageIndex === STAGES_CONFIG.length ? 'Order Delivered successfully!🎉' : STAGES_CONFIG[`${currentStageIndex}`].desc}
            </div>
            <div className="controls">
                <div className="prev">
                    <button disabled={currentStageIndex === 0} onClick={() => setCurrentStageIndex(prevIndex => prevIndex - 1 >= 0 ? prevIndex - 1 : 0)}>Prev</button>
                </div>
                {currentStageIndex >= STAGES_CONFIG.length - 1 ?
                    <div className="finish">
                        <button disabled={currentStageIndex === STAGES_CONFIG.length} onClick={() => setCurrentStageIndex(STAGES_CONFIG.length)}>Finish</button>
                    </div> : <div className="next">
                        <button onClick={() => setCurrentStageIndex(prevIndex => prevIndex + 1 > STAGES_CONFIG.length ? STAGES_CONFIG.length : prevIndex + 1)}>Next</button>
                    </div>}
            </div>
        </div>
    </div>
}