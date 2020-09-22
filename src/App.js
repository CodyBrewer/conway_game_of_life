import React, { useState } from 'react';
import Grid from './features/grid';
import SimulationContext from './context/simulationContext';
import GridContext from './context/gridContext';

function App() {
  const [running, setRunning] = useState(false);
  const [numRows, setNumRows] = useState(25);
  const [numCols, setNumCols] = useState(25);

  const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i+=1) {
        rows.push(Array.from(Array(numCols), () => 0));
    };
    return rows;
};

  const [grid, setGrid] = useState(() => {
      return generateEmptyGrid();
  });

  return (
    <SimulationContext.Provider value={{ running, setRunning }}>
      <GridContext.Provider value={{ grid, setGrid, generateEmptyGrid, numCols, numRows }}>
        <Grid />
      </GridContext.Provider>
    </SimulationContext.Provider>    
  );
}

export default App;
