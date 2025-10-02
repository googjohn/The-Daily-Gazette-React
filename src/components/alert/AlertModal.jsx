import { useEffect } from "react"

export default function AlertModal({ isOpen, onClose, title, message, type = 'warning' }) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null;

  const typeStyles = {
    info: 'bg-blue-500/90 border-blue-400',
    warning: 'bg-yellow-500/90 border-yellow-400',
    error: 'bg-red-500/90 border-red-400',
    success: 'bg-green-500/90 border-green-400'
  };

  const iconMap = {
    info: 'ℹ️',
    warning: '⚠️',
    error: '❌',
    success: '✓'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div
        className={`relative w-full max-w-md p-6 rounded-lg border-2 shadow-2xl transform transition-all animate-slideIn ${typeStyles[type]}`}
        role="alertdialog"
        aria-labelledby="alert-title"
        aria-describedby="alert-message"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white/80 hover:text-white hover:scale-110 transition-transform"
          aria-label="Close alert"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="flex items-start gap-4">
          <span className="text-3xl flex-shrink-0">{iconMap[type]}</span>
          <div className="flex-1">
            <h3 id="alert-title" className="text-xl font-bold text-white mb-2">
              {title}
            </h3>
            <p id="alert-message" className="text-white/90">
              {message}
            </p>
          </div>
        </div>

        {/* Progress bar for auto-close */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-b-lg overflow-hidden">
          <div className="h-full bg-white/60 animate-shrink origin-left"></div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes shrink {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        .animate-shrink {
          animation: shrink 3s linear;
        }
      `}</style>
    </div>
  );
}