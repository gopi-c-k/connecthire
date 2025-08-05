import React from "react";

export default function InputWithIcon({
  icon: Icon,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium capitalize">{name}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-3 w-5 h-5 text-muted" />}
        <input
          name={name}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="pl-10 pr-4 py-2 border rounded-lg w-full bg-surface text-lightText focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  );
}
