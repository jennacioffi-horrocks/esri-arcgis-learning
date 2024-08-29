import React, { useEffect, useState } from 'react';
import { Switch, Select } from 'antd';

interface WidgetProps {
  minValue: number;
  maxValue: number;
  setMinValue: (value: number) => void;
  setMaxValue: (value: number) => void;
  onClick: () => void;
  isSwitchOn: boolean;
  setSwitch: (value: boolean) => void;
  treatmentCodes: string[];
}

const Widget: React.FC<WidgetProps> = ({ 
  minValue, 
  maxValue, 
  setMinValue, 
  setMaxValue, 
  onClick ,
  isSwitchOn,
  setSwitch,
  treatmentCodes,
  }) => {

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value);
    if (value < 1) value = 1;
    if (value > 10) value = 10;
    if (value > maxValue) value = maxValue;
    setMinValue(value);
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value);
    if (value < 1) value = 1;
    if (value > 10) value = 10;
    if (value < minValue) value = minValue;
    setMaxValue(value);
  };

  return (
    <div className="bg-stone-400 w-fit h-fit p-6 absolute top-5 right-5 rounded-lg shadow-2xl border-2 border-black-500/75">
      <h2 className="font-sans text-white text-center text-2xl font-semibold">
        {isSwitchOn ? 'Recommended Treatments' : 'Filters'}
      </h2>
      {!isSwitchOn ? (
        <>
          <div className="mx-4">
            <label className="font-sans text-white text-left">
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
          <div className="mx-4">
            <label className="font-sans text-white text-left">
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
          <div className="flex justify-center mt-4">
        <button
          onClick={onClick}
          className="bg-white text-black hover:bg-black hover:text-white text-white font-sans"
        >
          Apply
        </button>
      </div>
        </>
      ) : (
        <div className="mx-4">
          <label className="font-sans text-white text-left">
            Recommended Treatment Code:
          </label>
          <Select
            className="w-full mt-2"
            placeholder="Select a code"
            options={treatmentCodes.map(code => ({ value: code, label: code }))}
          />
        </div>
      )}
      <div className="flex justify-center mt-4">
        <Switch checked={isSwitchOn} onChange={setSwitch} />
      </div>
    </div>
  );
};

export default Widget;
