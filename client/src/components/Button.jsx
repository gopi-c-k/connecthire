
export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props} //  this passes onClick, type, disabled, etc.
      className={`px-4 py-2 rounded bg-primary text-white font-semibold ${className}`}
    >
      {children}
    </button>
  );
}
