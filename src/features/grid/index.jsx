import React, { useContext,} from 'react';
import { GridContext } from '../../context'
import produce from 'immer';
import styled from 'styled-components';
import Buttons from '../buttons';

const Grid = () => {

    const { grid , setGrid, numCols, numRows } = useContext(GridContext)

    const handleCellSelect = (x, y) => {
        const newGrid = produce(grid, (gridCopy) => {
            gridCopy[x][y] = grid[x][y] ? 0 : 1;
        });
        setGrid(newGrid);
    }

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
                            grid[x][y] === 1
                                ? <Alive 
                                    key={`${x}-${y}`}
                                    onClick={() => {
                                        handleCellSelect(x, y);
                                    }}
                                />
                                : <Dead 
                                    key={`${x}-${y}`}
                                    onClick={() => {
                                        handleCellSelect(x, y);
                                    }}
                                />
                        ))    
                    )}
                </div>
            </div>
    );
};

const Dead = styled.div`
    border: solid 1px black;
    height: 20;
    width: 20;
    background-color: white
`

const Alive = styled(Dead)`
    background-color: black
`

export default Grid;