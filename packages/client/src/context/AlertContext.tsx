import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface AlertOptions {
    title?: string;
    message: ReactNode;
    type?: 'success' | 'error' | 'warning' | 'info' | 'confirm';
    onAcknowledge?: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
    duration?: number;
}

interface AlertContextType {
    showAlert: (options: AlertOptions) => void;
    hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [config, setConfig] = useState<AlertOptions>({
        message: '',
        type: 'info'
    });

    const showAlert = (options: AlertOptions) => {
        setConfig(options);
        setIsOpen(true);
    };

    const hideAlert = () => {
        setIsOpen(false);
        // Ensure state is cleaned up after animation if possible, 
        // but for now immediate state change is fine.
    };

    // Auto-dismiss logic for non-confirm alerts
    useEffect(() => {
        if (isOpen && config.type !== 'confirm') {
            const duration = config.duration || 2000; // Default 2 seconds for quick reading
            const timer = setTimeout(() => {
                handleAcknowledge();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isOpen, config]);

    const handleAcknowledge = () => {
        setIsOpen(false);
        if (config.onAcknowledge) {
            config.onAcknowledge();
        }
    };

    const handleCancel = () => {
        setIsOpen(false);
        if (config.onCancel) {
            config.onCancel();
        }
    };

    const getStyles = () => {
        switch (config.type) {
            case 'success': return {
                border: 'border-green-500/50',
                text: 'text-green-400',
                bg: 'bg-slate-950 shadow-green-900/20',
                icon: <CheckCircle size={24} className="text-green-400" />
            };
            case 'error': return {
                border: 'border-red-500/50',
                text: 'text-red-400',
                bg: 'bg-slate-950 shadow-red-900/20',
                icon: <AlertTriangle size={24} className="text-red-400" />
            };
            case 'warning': return {
                border: 'border-yellow-500/50',
                text: 'text-yellow-400',
                bg: 'bg-slate-950 shadow-yellow-900/20',
                icon: <AlertTriangle size={24} className="text-yellow-400" />
            };
            case 'confirm': return {
                border: 'border-slate-700',
                text: 'text-slate-100',
                bg: 'bg-slate-900',
                icon: <Info size={24} className="text-santa-gold" />
            };
            default: return {
                border: 'border-blue-500/50',
                text: 'text-blue-400',
                bg: 'bg-slate-950 shadow-blue-900/20',
                icon: <Info size={24} className="text-blue-400" />
            };
        }
    };

    const styles = getStyles();

    return (
        <AlertContext.Provider value={{ showAlert, hideAlert }}>
            {children}
            {isOpen && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
                    {/* Backdrop only for confirm to block interaction */}
                    {config.type === 'confirm' && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" onClick={handleCancel} />
                    )}

                    {/* Alert Box */}
                    <div className={`
                        pointer-events-auto 
                        relative 
                        ${styles.bg} 
                        border ${styles.border} 
                        rounded-xl 
                        shadow-2xl 
                        p-6 
                        max-w-sm w-full mx-4
                        transform transition-all duration-300 animate-in fade-in zoom-in-95
                        flex flex-col items-center text-center gap-4
                    `}>
                        {/* Compact Content */}
                        <div className="flex flex-col items-center gap-2">
                             {/* Only show Title if it's a Confirm dialog or explicitly needed, user asked for minimal */}
                            {config.type === 'confirm' && config.title && (
                                <h3 className={`text-lg font-bold font-santa tracking-wide ${styles.text}`}>{config.title}</h3>
                            )}
                            
                            <div className={`flex items-center gap-3 ${styles.text} font-medium text-lg`}>
                                {styles.icon}
                                {config.message}
                            </div>
                        </div>

                        {/* Actions (Only for Confirm) */}
                        {config.type === 'confirm' && (
                            <div className="flex gap-3 w-full justify-center mt-2">
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 rounded-lg text-sm font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    {config.cancelText || 'CANCEL'}
                                </button>
                                <button
                                    onClick={handleAcknowledge}
                                    className="px-6 py-2 rounded-lg text-sm font-bold bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
                                >
                                    {config.confirmText || 'CONFIRM'}
                                </button>
                            </div>
                        )}
                        
                        {/* Close button for manual dismissal on non-auto types (though we are auto-dismissing) */}
                        {/* Removing close button for cleaner 'toast' look as user requested 'just show alert message' */}
                    </div>
                </div>,
                document.body
            )}
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};
