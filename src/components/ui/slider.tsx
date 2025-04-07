import React from "react";

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const Slider: React.FC<SliderProps> = ({ value, onChange, min = 1, max = 10, step = 1 }) => {
  return (
    <div className="flex flex-col">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full cursor-pointer accent-orange-500"
      />
      <div className="text-center text-sm text-gray-600 mt-2">
        Quantity: <span className="font-semibold">{value}</span>
      </div>
    </div>
  );
};

export {Slider};
