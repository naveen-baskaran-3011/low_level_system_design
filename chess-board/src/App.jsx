import { useRef, useState } from "react";
import './App.css';

const chess_array = JSON.stringify(Array(8).fill(Array(8).fill(0)));

// function ltrDiagonal(rowIdx, columnIdx) {
//     const ltrDiagonalSet = new Set();
//     let [dummyRow, dummyColumn] = [rowIdx, columnIdx];
//     while(![dummyRow, dummyColumn].includes(-1)) {
//         ltrDiagonalSet.add(`[${dummyRow},${dummyColumn}]`);
//         --dummyRow;
//         --dummyColumn;
//     }

//     dummyRow = rowIdx;
//     dummyColumn = columnIdx;
//     while(Math.max(dummyRow, dummyColumn) < 8) {
//         ltrDiagonalSet.add(`[${dummyRow},${dummyColumn}]`);
//         ++dummyRow;
//         ++dummyColumn;
//     }

//     return ltrDiagonalSet;
// }

// function rtlDiagonal(rowIdx, columnIdx) {
//     const rtlDiagonalSet = new Set();
//     let [dummyRow, dummyColumn] = [rowIdx, columnIdx];
//     while(![dummyRow, dummyColumn].includes(-1) && Math.max(dummyRow, dummyColumn) < 8) {
//         rtlDiagonalSet.add(`[${dummyRow},${dummyColumn}]`);
//         --dummyRow;
//         ++dummyColumn;
//     }

//     dummyRow = rowIdx;
//     dummyColumn = columnIdx;
//     while(![dummyRow, dummyColumn].includes(-1) && Math.max(dummyRow, dummyColumn) < 8) {
//         rtlDiagonalSet.add(`[${dummyRow},${dummyColumn}]`);
//         ++dummyRow;
//         --dummyColumn;
//     }

//     return rtlDiagonalSet;
// }

// function calculatePossibleDiagonals(rowIdx, columnIdx) {
//     const ltrDiagonalSet = ltrDiagonal(rowIdx, columnIdx);
//     const rtlDiagonalSet = rtlDiagonal(rowIdx, columnIdx);
//     const calculatedPositionsSet = new Set([...ltrDiagonalSet, ...rtlDiagonalSet]);
//     console.log('ltrDiagonalSet', ltrDiagonalSet, 'rtlDiagonalSet', rtlDiagonalSet);
//     console.log('calculatedPositionsSet', calculatedPositionsSet)

//     const newChessBoard = JSON.parse(chess_array);
//     newChessBoard.forEach((row, rowId) => {
//         return row.forEach((column, columnId) => {
//             if(calculatedPositionsSet.has(`[${rowId},${columnId}]`)) {
//                 newChessBoard[`${columnId}`][rowId] = 'diagonal';
//             }
//         })
//     });
//     newChessBoard[`${columnIdx}`][`${rowIdx}`] = 'selected'
//     return newChessBoard;
// }

function calcClass(rowId, columnId, selectedRowId, selectedColumnId) {
    if(selectedRowId === null || !selectedColumnId === null) {
        return '';
    }
    if(rowId === selectedRowId && columnId === selectedColumnId) {
        return 'selected';
    }
    if((rowId - columnId === selectedRowId - selectedColumnId) || (rowId + columnId === selectedRowId + selectedColumnId)) {
        return 'diagonal';
    }
}

export default function App() {
    const colorRef = useRef('white');
    // const [chessBoard, setChessBoard] = useState(JSON.parse(chess_array));
    const chessBoard = JSON.parse(chess_array);
    const [selected, setSelected] = useState([null, null]);
    const clickHandler = (rowIdx, columnIdx) => {
        setSelected([rowIdx, columnIdx]);
        // setChessBoard([...calculatePossibleDiagonals(rowIdx, columnIdx)]);
    };
    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        width: 'min(90vw,100vh - 160px)',
        height: 'min(90vw,100vh - 160px)'
    }}>
        {chessBoard.map((row, rowIdx) => {
            colorRef.current = colorRef.current === 'white' ? 'black' : 'white';

            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flex: 1
                    }}
                    className="column"
                    key={rowIdx}>
                    {row.map && row.map((column, colIdx) => {
                        colorRef.current = colorRef.current === 'white' ? 'black' : 'white';

                        return (
                        <div
                            // className={`row ${chessBoard[`${colIdx}`][`${rowIdx}`]}`}
                            className={`row ${calcClass(rowIdx, colIdx, selected[0], selected[1])}`}
                            style={{
                                backgroundColor: colorRef.current,
                                color: colorRef.current === 'white' ? 'black' : 'white',
                                flex: 1
                            }}
                            key={colIdx}
                            onClick={() => clickHandler(rowIdx, colIdx)}>
                            </div>)
                    })}
                </div>
            )
        })}
    </div>
}