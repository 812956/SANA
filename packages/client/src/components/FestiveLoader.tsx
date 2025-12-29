import { Snowflake } from 'lucide-react';

interface FestiveLoaderProps {
    message?: string;
    size?: 'sm' | 'md' | 'lg';
}

export const FestiveLoader = ({ message = 'Loading...', size = 'md' }: FestiveLoaderProps) => {
    const sizeMap = {
        sm: 24,
        md: 48,
        lg: 64
    };

    const iconSize = sizeMap[size];

    return (
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <div className="relative">
                <Snowflake 
                    size={iconSize} 
                    className="text-santa-gold animate-spin-slow drop-shadow-[0_0_15px_rgba(248,178,41,0.5)]" 
                    style={{ animationDuration: '4s' }} 
                />
                <div className="absolute inset-0 bg-santa-gold/30 blur-2xl rounded-full animate-glow-pulse"></div>
            </div>
            
            {message && (
                <p className="text-santa-gold font-orbitron text-sm tracking-widest animate-pulse-subtle">
                    {message}
                </p>
            )}
        </div>
    );
};
