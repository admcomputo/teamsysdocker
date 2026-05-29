interface ExperienceMessageProps {
  type: 'success' | 'error';
  text: string;
  onClose: () => void;
}

const ExperienceMessage = ({
  type,
  text,
  onClose,
}: ExperienceMessageProps) => {
  return (
    <div
      className={`mb-4 flex items-start justify-between gap-4 rounded-xl border px-4 py-3 shadow-lg ${
        type === 'success'
          ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-200'
          : 'border-rose-500/30 bg-rose-500/15 text-rose-200'
      }`}
    >
      <p className="text-sm font-medium">{text}</p>

      <button
        onClick={onClose}
        className="text-lg font-bold leading-none opacity-80 transition hover:opacity-100"
      >
        ×
      </button>
    </div>
  );
};

export default ExperienceMessage;