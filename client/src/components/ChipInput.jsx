import React, { useState, useRef } from "react";

export const ChipInput = ({
  label,
  values = [],
  onChange,
  placeholder = "Type and press Enter",
  allowDuplicates = false,
  maxChips,
  className = "",   // ✅ accept className
}) => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const clean = (s) => s.replace(/\s+/g, " ").trim();

  const addChip = (raw) => {
    const txt = clean(raw || input);
    if (!txt) return;

    const parts = txt.split(",").map((p) => clean(p)).filter(Boolean);

    let next = [...values];
    for (const p of parts) {
      if (maxChips && next.length >= maxChips) break;
      if (!allowDuplicates && next.some((v) => v.toLowerCase() === p.toLowerCase())) continue;
      next.push(p);
    }

    if (next.length !== values.length) onChange(next);
    setInput("");
  };

  const removeChip = (idx) => {
    const next = values.filter((_, i) => i !== idx);
    onChange(next);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addChip();
      return;
    }
    if (e.key === "Backspace" && !input && values.length > 0) {
      e.preventDefault();
      removeChip(values.length - 1);
    }
  };

  const handleBlur = () => {
    if (input.trim()) addChip();
  };

  return (
    <div className="w-full">
      {label ? (
        <label className="block mb-1 font-medium text-lightText">{label}</label>
      ) : null}

      <div
        className={`${className} flex flex-wrap items-center gap-2`} 
        // ✅ parent se same inputClasses apply hoga
      >
        {values.map((chip, idx) => (
          <span
            key={`${chip}-${idx}`}
            className="group flex items-center gap-2 bg-primary/10 text-primary px-2 py-1 rounded-full text-sm"
          >
            <span className="truncate max-w-[180px]">{chip}</span>
            <button
              type="button"
              aria-label={`Remove ${chip}`}
              onClick={() => removeChip(idx)}
              className="text-xs font-bold opacity-80 hover:opacity-100 hover:text-red-500"
            >
              ✕
            </button>
          </span>
        ))}

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-lightText placeholder:text-muted"
        />
      </div>

      {maxChips ? (
        <p className="mt-1 text-xs text-muted">
          {values.length}/{maxChips} added
        </p>
      ) : null}
    </div>
  );
};

export default ChipInput;
