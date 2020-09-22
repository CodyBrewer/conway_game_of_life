import React, { useContext, useRef, useCallback } from 'react';
import produce from 'immer';
import { GridContext, SimulationContext } from '../../context'


const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0]
];

const Buttons = () => {

    const { running, setRunning } = useContext(SimulationContext);
    const { grid, setGrid, numRows, numCols, generateEmptyGrid } = useContext(GridContext);
    const runningRef = useRef(running);
    runningRef.current = running;

    const runSimulation = useCallback(() => {
        if (!runningRef.current) {
            return;
        };
        setGrid((grid) => {
            return produce(grid, (gridCopy) => {
                for (let x = 0; x < numRows; x++) {
                    for (let y= 0; y < numCols; y++) {
                        let neighbors = 0;
                        operations.forEach(([xx, yy]) => {
                            const newX = x + xx;
                            const newY = y + yy;
                            if (newX >= 0
                                && newX < numRows
                                && newY >= 0
                                && newY < numCols) {
                                    neighbors += grid[newX][newY];
                            };
                        });

                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[x][y] = 0;
                        } else if (grid[x][y] === 0 && neighbors === 3) {
                            gridCopy[x][y] = 1;
                        }
                    }
                }
            })
        })
        setTimeout(runSimulation, 100);
    }, []);

    const handlePausePlay = () => {
        setRunning(!running);
        if (!running) {
            runningRef.current = true;
            runSimulation();
        }
    }

    return (
        <div style={{
            display: "flex",
        }}>
            <button onClick={handlePausePlay}>
                { running ? "pause": "play" }
            </button>
            <button
                onClick={() => {
                    setGrid(generateEmptyGrid());
                }}
            >
                clear
            </button>
        </div>
    )
};

export default Buttons;