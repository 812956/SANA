import { X } from 'lucide-react';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface FestiveModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export const FestiveModal = ({ isOpen, onClose, title, children, footer }: FestiveModalProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/70 backdrop-blur-lg transition-opacity" 
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="glass-panel w-full max-w-lg rounded-2xl relative shadow-glass-lg border border-white/20 animate-scale-in">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 className="text-2xl font-santa font-bold text-santa-gold tracking-wide drop-shadow-[0_0_10px_rgba(248,178,41,0.3)]">{title}</h2>
                    <button 
                        onClick={onClose}
                        className="text-white/50 hover:text-white hover:bg-white/10 rounded-full p-2 transition-smooth hover:scale-110"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 text-slate-300 font-sans leading-relaxed">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="p-6 border-t border-white/10 bg-black/20 rounded-b-2xl flex justify-end gap-3">
                        {footer}
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};
