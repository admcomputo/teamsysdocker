interface ToastMessageProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

export const ToastMessage = ({
  message,
  type = "info",
  onClose,
}: ToastMessageProps) => {
  const styles = {
    success: "bg-green-600 border-green-400",
    error: "bg-red-600 border-red-400",
    info: "bg-blue-600 border-blue-400",
  };

  return (
    <div className="fixed top-5 right-5 z-50 max-w-sm">
      <div
        className={`${styles[type]} text-white px-5 py-3 rounded-xl shadow-lg border`}
      >
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium">{message}</p>

          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white font-bold"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};