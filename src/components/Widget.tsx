import React, { MouseEvent } from 'react';

interface WidgetProps {
  minValue: number | undefined;
  maxValue: number | undefined;
  setMinValue: (value: number | undefined) => void;
  setMaxValue: (value: number | undefined) => void;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Widget: React.FC<WidgetProps> = ({ minValue, maxValue, setMinValue, setMaxValue, onClick }) => {
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
    <div className="bg-gray-400 w-fit h-full">
      <h2 
        className="font-sans text-white text-center text-2xl py-4 font-semibold">
          Filters
      </h2>
      <div className="mx-4">
        <label
          className="font-sans text-white text-left">
            Minimum Paser Value (1-10):
        </label>
        <input
          type="number"
          min="1"
          max="10"
          step="1"
          value={minValue || ''}
          onChange={handleMinChange}
          className="bg-white text-black w-full h-8 p-4 my-2 rounded-md"
        />
      </div>
      <div className="mx-4" >
        <label
          className="font-sans text-white text-left">
            Maximum Paser Value (1-10):
        </label>
        <input
          type="number"
          min="1"
          max="10"
          step="1"
          value={maxValue || ''}
          onChange={handleMaxChange}
          className="bg-white text-black w-full h-8 p-4 my-2 rounded-md"
        />
      </div>
      <div className="flex justify-center mt-2 text-white font-sans">
        <button 
          onClick={onClick}
          className=""
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Widget;
