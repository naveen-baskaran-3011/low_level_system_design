import { Fragment, useCallback, useState } from "react"
import { arrayGenerator } from "./array-generator"
import Tile from "./Tile";

export default function App() {
    const [gridValue, setGridValue] = useState(arrayGenerator());
    const [openedGrid, setOpenedGrid] = useState([]);
    const [currentPairSelection, setCurrentPairSelection] = useState([]);

    const tileClickHandler = useCallback((index) => {
        if (currentPairSelection.length === 1) {
            if (gridValue[currentPairSelection[0]] === gridValue[index]) {
                setOpenedGrid(prev => [...prev, currentPairSelection[0], index]);
            }
        }

        setCurrentPairSelection(prev => {
            if (prev.length === 2) {
                return [index];
            } else {
                return [...prev, index];
            }
        });
    }, [currentPairSelection, gridValue]);

    const resetHandler = useCallback(() => {
        setCurrentPairSelection([]);
        setOpenedGrid([]);
        setGridValue(arrayGenerator());
    }, []);

    return <div>
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 100px)',
            gap: '5px'
        }}>
            {
                gridValue.map((el, index) => <Tile
                    onClick={() => tileClickHandler(index)}
                    isOpen={[...openedGrid, ...currentPairSelection].includes(index)}
                    key={index}
                    index={index}
                    label={el} />
                )
            }
        </div>
        <button onClick={resetHandler}>Reset</button>
    </div>
}