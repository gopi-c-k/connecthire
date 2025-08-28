// src/components/ChipInput.jsx
import React, { useState, useRef } from "react";

/**
 * ChipInput
 * Props:
 * - label?: string
 * - values: string[]
 * - onChange: (newValues: string[]) => void
 * - placeholder?: string
 * - allowDuplicates?: boolean (default: false)
 * - maxChips?: number
 */
export const ChipInput = ({
  label,
  values = [],
  onChange,
  placeholder = "Type and press Enter",
  allowDuplicates = false,
  maxChips,
}) => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const clean = (s) => s.replace(/\s+/g, " ").trim();

  const addChip = (raw) => {
    const txt = clean(raw || input);
    if (!txt) return;

    // support comma-separated entry in one go
    const parts = txt
      .split(",")
      .map((p) => clean(p))
      .filter(Boolean);

    if (parts.length === 0) return;

    let next = [...values];

    for (const p of parts) {
      if (maxChips && next.length >= maxChips) break;
      if (!allowDuplicates && next.some((v) => v.toLowerCase() === p.toLowerCase())) {
        continue;
      }
      next.push(p);
    }

    if (next.length !== values.length) {
      onChange(next);
    }
    setInput("");
  };

  const removeChip = (idx) => {
    const next = values.filter((_, i) => i !== idx);
    onChange(next);
    // keep focus on input for fast editing
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleKeyDown = (e) => {
    // Enter or comma adds chip
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addChip();
      return;
    }
    // Backspace on empty input removes last chip
    if (e.key === "Backspace" && !input && values.length > 0) {
      e.preventDefault();
      removeChip(values.length - 1);
    }
  };

  const handleBlur = () => {
    // Add remaining text when leaving the field
    if (input.trim()) addChip();
  };

  return (
    <div className="w-full">
      {label ? (
        <label className="block mb-1 font-medium text-lightText">{label}</label>
      ) : null}

      <div className="flex flex-wrap items-center gap-2 border border-border rounded-lg p-2 bg-card focus-within:ring-2 focus-within:ring-primary">
        {values.map((chip, idx) => (
          <span
            key={`${chip}-${idx}`}
            className="group flex items-center gap-2 bg-primary/10 text-primary px-2 py-1 rounded-full text-sm"
            title={chip}
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
          className="flex-1 min-w-[140px] bg-transparent outline-none text-lightText placeholder:text-muted"
          aria-label={label || "Chip input"}
        />
      </div>

      {/* Helper text (optional) */}
      {maxChips ? (
        <p className="mt-1 text-xs text-muted">
          {values.length}/{maxChips} added
        </p>
      ) : null}
    </div>
  );
};

export default ChipInput; 