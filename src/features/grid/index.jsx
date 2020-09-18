import React, { useState } from 'react';

// Number of Rows and Columns for Grid
const numRows = 25;
const numCols = 25;

const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i+=1) {
        rows.push(Array.from(Array(numCols), () => 0));
    };
    return rows;
};

const Grid = () => {
    const [grid, setGrid] = useState(() => {
        return generateEmptyGrid();
    });

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20vh"
        }}
        >
            <div style={{
                display: "grid",
                gridTemplateColumns: `repeat(${numCols}, 20px)`,
            }}>
                {grid.map((rows, x) =>
                    rows.map((columns, y) => (
                        <div
                            key={`${x}-${y}`}
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