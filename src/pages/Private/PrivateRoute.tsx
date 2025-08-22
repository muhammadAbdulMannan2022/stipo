// PrivateRoute.tsx
import { Navigate, useLocation } from "react-router";
import { useContext, type ReactNode } from "react";
import { RouteContext } from "../../App";

type PrivateRouteProps = {
    children: ReactNode;
};

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const location = useLocation()
    const routeContext = useContext(RouteContext);
    const currentRoute = routeContext?.currentRoute ?? "/start";
    console.log(location.pathname, currentRoute)

    // Check if the route user is trying to access is allowed
    if (location.pathname === "/start/success" || location.pathname === "/start/paymentSuccess") {
        return <>{children}</>
    } else {
        if (location.pathname === currentRoute) {
            return <>{children}</>;
        } else {
            // Otherwise redirect to current route
            return <Navigate to={currentRoute} replace />;
        }
    }
};
