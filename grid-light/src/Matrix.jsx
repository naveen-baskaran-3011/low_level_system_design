import { useCallback, useEffect, useState } from 'react';
import './Matrix.styles.css';

export default function({
    gridSize = 3,
    timeOut = 1000
}) {
    const [selectionArray, setSelectedArray] = useState([]);
    const onCellClick = useCallback((event) => {
        const cellId = event.target.getAttribute('data-test-cell-id');
        if(!selectionArray.includes(cellId)) {
            setSelectedArray(prevArray => [...prevArray, cellId]);
        }
    }, [gridSize, selectionArray]);

    useEffect(() => {
        let timer;
        if(selectionArray.length === gridSize*gridSize) {
            timer = setInterval(() => {
                selectionArray.pop();
                setSelectedArray([...selectionArray]);
                if(selectionArray.length === 0) {
                    clearInterval(timer);
                }
            }, timeOut);
        }

        return () => {
            if(selectionArray.length === 0) {
                clearInterval(timer);
            }
        }
    }, [selectionArray, timeOut, gridSize]);

    return <div className='matrix-container'>
        {Array(gridSize).fill(1).map((_, rowId) => (
            <div className='row' data-test-row-id={rowId + 1} key={rowId}>
                {Array(gridSize).fill(1).map((_, columnId) => (
                    <div className={`column ${selectionArray.includes(`${rowId},${columnId}`) && 'active'}`} data-test-cell-id={`${rowId},${columnId}`} key={`${rowId},${columnId}`} onClick={onCellClick} ></div>
                ))}
            </div>
        ))}
    </div>
}