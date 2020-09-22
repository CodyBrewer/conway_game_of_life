import React, { useCallback, useContext, useRef, useState } from 'react';
import { GridContext, SimulationContext } from '../../context'
import produce from 'immer';
import Buttons from '../buttons'

const Grid = () => {

    const { grid , setGrid, numCols, numRows } = useContext(GridContext);

    return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "20vh"
            }}
            >
                <Buttons />
                <div style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${numCols}, 20px)`,
                    gridTemplateRows: `repeat(${numRows}, 20px)`,
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