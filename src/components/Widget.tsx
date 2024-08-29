import React, { useEffect, useState } from 'react';
import { Switch, Select } from 'antd';

interface WidgetProps {
  minValue: number;
  maxValue: number;
  setMinValue: (value: number) => void;
  setMaxValue: (value: number) => void;
  onApplyClick: () => void;
  isSwitchOn: boolean;
  handleSwitchChange: (value: boolean) => void;
  treatmentCodes: { name: string; code: string }[];
  onTreatmentSelection: (value: string) => void;
}

const Widget: React.FC<WidgetProps> = ({ 
  minValue, 
  maxValue, 
  setMinValue, 
  setMaxValue, 
  onApplyClick: onApplyClick,
  isSwitchOn,
  handleSwitchChange,
  treatmentCodes,
  onTreatmentSelection
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
          onClick={onApplyClick}
          className="bg-white text-black hover:bg-black hover:text-white text-white font-sans"
        >
          Apply
        </button>
      </div>
        </>
      ) : (
        <div className="mx-4">
          <label className="font-sans text-left">Recommended Treatment Code:</label>
          <Select
            className="w-full mt-2"
            placeholder="Select a code"
            options={treatmentCodes.map(tc => ({
              value: tc.code, // Use the code as the value
              label: `${tc.name} (${tc.code})`, // Use name and code as the label
            }))}
            onChange={(value) => onTreatmentSelection(value)}
          />
        </div>
      )}
      <div className="flex justify-center mt-4">
        <Switch checked={isSwitchOn} onChange={handleSwitchChange} />
      </div>
    </div>
  );
};

export default Widget;
