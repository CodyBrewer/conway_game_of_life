import React, { createContext, useState } from 'react';

export const GridContext = createContext(); 
export const SimulationContext = createContext();

const Store = ({ children }) => {

    const [running, setRunning] = useState(false);
    const [numRows, setNumRows] = useState(25);
    const [numCols, setNumCols] = useState(25);
    const [generation, setGeneration] = useState(0);

    const generateEmptyGrid = () => {
        const rows = [];
        for (let i = 0; i < numRows; i+=1) {
            rows.push(Array.from(Array(numCols), () => 0));
        };
        setGeneration(0);
        setRunning(false);
        return rows;
    };

    const [grid, setGrid] = useState(() => {
        return generateEmptyGrid();
    });

    return (  
        <SimulationContext.Provider value={{ running, setRunning, generation, setGeneration }}>
            <GridContext.Provider value={{ grid, setGrid, generateEmptyGrid, numCols, numRows }}>
                {children}
            </GridContext.Provider>
        </SimulationContext.Provider>
    );
};

export default Store;