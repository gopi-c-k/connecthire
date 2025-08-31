import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CustomSelect({ value, onChange, options = [], placeholder = "Select..." }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (val) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <div className="relative w-48">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 flex justify-between items-center rounded-lg 
                   bg-surface/60 backdrop-blur-md border border-slate-700 shadow-md 
                   text-lightText hover:border-primary focus:outline-none focus:ring-2 
                   focus:ring-primary transition"
      >
        <span>{options.find((opt) => opt.value === value)?.label || placeholder}</span>
        <ChevronDown size={16} className={`ml-2 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          className="absolute z-50 mt-2 w-full rounded-lg bg-surface/95 backdrop-blur-md 
                     border border-slate-700 shadow-lg overflow-hidden"
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`px-4 py-2 text-sm cursor-pointer text-lightText hover:bg-primary/20 transition 
                         ${value === opt.value ? "bg-primary/10 text-primary" : ""}`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
