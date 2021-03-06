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

    const { running, setRunning, generation, setGeneration } = useContext(SimulationContext);
const { grid, setGrid, numRows, setNumRows, numCols, setNumCols, generateEmptyGrid } = useContext(GridContext);
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
        setGeneration(prevGen => prevGen + 1)
        setTimeout(runSimulation, 100);
    }, []);

    const handlePausePlay = () => {
        setRunning(!running);
        if (!running) {
            runningRef.current = true;
            runSimulation();
        }
    }

    const randomGrid = () => {
        setGrid((prevGrid) => {
            console.log(prevGrid.map((rowArr) => 
            rowArr.map(() => Math.floor(Math.random() *4) === 1)
        ))
            return prevGrid.map((rowArr) => 
                rowArr.map(() => Math.floor(Math.random() *4) === 1)
            )
        })
        handlePausePlay();
    }

    const stepper = () => {
        setGrid((grid) => {
            return produce(grid, gridCopy => {
                for (let x = 0; x < numRows; x++) {
                    for (let y = 0; y < numCols; y++) {
                        let neighbors = 0
                        operations.forEach(([xx, yy]) => {
                            const newX = x + xx
                            const newY = y + yy
                            if (newX >= 0 && newX < numRows && newY >= 0 && newY < numCols) {
                                neighbors += grid[newX][newY]
                            }
                        })
                    if (neighbors < 2 || neighbors > 3) {
                        gridCopy[x][y] = 0
                    } else if (grid[x][y] === 0 && neighbors === 3) {
                        gridCopy[x][y] = 1
                    }
                    }
                }
            })
        })
        setGeneration(prevGen => prevGen + 1)
    }

    const handleRowChange = (event) => {
        setNumRows(event.target.value);
    }

    const handleColChange = (event) => {
        setNumCols(event.target.value);
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
            <button onClick={stepper}>
                Increase Generation By One
            </button>
            <button 
                onClick={() => randomGrid()}
            >
                Random
            </button>
            <p>Generations: {generation} </p>
            <div
                style={{width: 50, margin: 5}}
            >
                <label htmlFor="gridRows">
                    Rows
                    <input 
                        id="gridRows"
                        name="gridRows"
                        type="number"
                        value={numRows}
                        onChange={handleRowChange}
                    />
                </label>
                <label htmlFor="gridCols">
                    Columns                
                    <input
                        id="gridCols"
                        name="gridCols"
                        type="number"
                        value={numCols}
                        onChange={handleColChange}
                    />
                </label>
            </div>
        </div>
    )
};

export default Buttons;