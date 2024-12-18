import { useEffect, useState } from "react"

export default function App() {
    const [noOfRows, setNoOfRows] = useState(2);
    const [noOfColumns, setNoOfColumns] = useState(2);
    const [matrix, setMatrix] = useState(null);

    useEffect(() => {
        const dummyMatrix = [];
        let inc = true;
        let counter = 1;

        for(let i = 0; i < noOfColumns; i++) {
            console.log('inc', inc);
            if(inc) {
                for(let j = 0; j < noOfRows; j++) {
                    if(dummyMatrix[j]) {
                        dummyMatrix[j].push(counter);
                    } else {
                        dummyMatrix[j] = [counter] 
                    }

                    counter++;
                }
            } else {
                for(let j = noOfRows - 1; j >= 0; j--) {
                    if(dummyMatrix[j]) {
                        dummyMatrix[j].push(counter);
                    } else {
                        dummyMatrix[j] = [counter] 
                    }

                    counter++;
                }
            }
            inc = !inc;
        }

        setMatrix(dummyMatrix);
    }, [noOfRows, noOfColumns]);

    return <div>
        <div className="row">
            <label htmlFor="rows">Rows :: {noOfRows}</label>
            <input
                type="range"
                name="rows"
                id="rows"
                min={2}
                max={8}
                step={1}
                defaultValue={noOfRows}
                onChange={(event) => setNoOfRows(Number(event.target.value))} />
        </div>
        <div className="column">
            <label htmlFor="columns">Columns :: {noOfColumns}</label>
            <input
                type="range"
                name="rows"
                id="rows"
                min={2}
                max={8}
                step={1}
                defaultValue={noOfColumns}
                onChange={(event) => setNoOfColumns(Number(event.target.value))} />
        </div>

        {matrix && (<div className="matrix" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px'
        }}>
            {matrix.map((rowConfig, idx) => (
                <div
                key={`row-${idx}`} style={{
                    display: "flex",
                    gap: "2px"
                }}>
                    {rowConfig.map((col, idx) => <div
                        key={`col-${idx}`}
                        style={{
                            width: '50px',
                            height: '50px',
                            border: '1px solid',
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>{col}</div>)}
                </div>
            ))}
        </div>)}
    </div>
}