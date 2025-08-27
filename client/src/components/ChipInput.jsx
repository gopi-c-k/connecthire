import { useEffect, useState } from "react";
export const ChipInput = ({ label, values, onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault();
      onChange([...values, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeItem = (index) => {
    const newValues = values.filter((_, i) => i !== index);
    onChange(newValues);
  };

  return (
    <label className="block">
      <span className="font-medium">{label}</span>
      <div className="flex flex-wrap gap-2 border border-muted p-2 rounded bg-bg">
        {values.map((val, idx) => (
          <span
            key={idx}
            className="flex items-center bg-gray-700 text-white px-2 py-1 rounded-full"
          >
            {val}
            <button
              type="button"
              onClick={() => removeItem(idx)}
              className="ml-2 text-red-400 hover:text-red-600"
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          className="bg-transparent outline-none flex-1"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type and press Enter..."
        />
      </div>
    </label>
  );
};