import React, { useCallback, useContext, useRef, useState } from 'react';
import SimulationContext from '../../context/simulationContext';
import GridContext from '../../context/gridContext';
import produce from 'immer';

// Number of Rows and Columns for Grid


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



const Grid = () => {

    const { running, setRunning } = useContext(SimulationContext);
    const { grid , setGrid, generateEmptyGrid, numCols, numRows } = useContext(GridContext);

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

    return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "20vh"
            }}
            >
                <div>
                    <button
                        onClick={() => {
                            setRunning(!running);
                            if (!running) {
                                runningRef.current = true;
                                runSimulation();
                            }
                        }}
                        >
                        {running ? "stop" : "start"}
                    </button>
                    <button
                        onClick={() => {
                            setGrid(generateEmptyGrid());
                        }}
                    >
                        clear
                    </button>
                </div>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${numCols}, 20px)`,
                }}>
                    {grid.map((rows, x) =>
                        rows.map((columns, y) => (
                            <div
                                key={`${x}-${y}`}
                                onClick={() => {
                                    const newGrid = produce(grid, (gridCopy) => {
                                        gridCopy[x][y] = grid[x][y] ? 0 : 1;
                                    });
                                    setGrid(newGrid);                                
                                }}
                                style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: grid[x][y] ? "blue" : undefined,
                                    border: "solid 1px black"
                                }}
                            />
                        ))    
                    )}
                </div>
            </div>
    );
};

export default Grid;