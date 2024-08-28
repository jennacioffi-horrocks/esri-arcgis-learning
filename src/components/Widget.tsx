import React, { MouseEvent, useState } from 'react';

interface WidgetProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Widget: React.FC<WidgetProps> = ({ onClick }) => {
  const [minValue, setMinValue] = useState<number | undefined>(undefined);
  const [maxValue, setMaxValue] = useState<number | undefined>(undefined);

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value);
    if (value < 1) value = 1;
    if (value > 10) value = 10;
    setMinValue(value);
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value);
    if (value < 1) value = 1;
    if (value > 10) value = 10;
    setMaxValue(value);
  };

  return (
    <div style={{ zIndex: 1000, fontSize: 20, color: 'black', backgroundColor: 'red', width: '20vw', height: '100vh' }}>
      <h2>Filters</h2>
      <div>
        <div>Minimum Paser Value (1-10):</div>
        <div>
          <input 
            type="number" 
            min="1" 
            max="10" 
            step="1" 
            value={minValue || ''} 
            onChange={handleMinChange} 
          />
        </div>
      </div>
      <div>
        <div>Maximum Paser Value (1-10):</div>
        <div>
          <input 
            type="number" 
            min="1" 
            max="10" 
            step="1" 
            value={maxValue || ''} 
            onChange={handleMaxChange} 
          />
        </div>
      </div>
      <div>
        <button onClick={onClick}>Apply</button>
      </div>
    </div>
  );
};

export default Widget;
