import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface ProtectedElfRouteProps {
    children: ReactNode;
}

export const ProtectedElfRoute = ({ children }: ProtectedElfRouteProps) => {
    const elfUser = localStorage.getItem('elf_user');
    
    if (!elfUser) {
        // Redirect to login if not authenticated
        return <Navigate to="/elf/login" replace />;
    }
    
    return <>{children}</>;
};
