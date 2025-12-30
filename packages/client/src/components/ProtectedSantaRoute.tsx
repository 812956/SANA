import { Navigate } from 'react-router-dom';

interface ProtectedSantaRouteProps {
    children: JSX.Element;
}

export const ProtectedSantaRoute = ({ children }: ProtectedSantaRouteProps) => {
    const isAuthenticated = localStorage.getItem('santa_auth') === 'true';

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
