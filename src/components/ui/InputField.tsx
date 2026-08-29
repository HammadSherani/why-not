// Reusable input field component
function InputField({
  icon,
  placeholder,
  type = "text",
}: {
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/35 bg-white/[0.03] px-3 py-2">
      <span className="text-white/50">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-white placeholder-white/50 outline-none"
      />
    </div>
  );
}


export default InputField;
