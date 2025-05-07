import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    redirectTo = "/rpint"
}) => {
    const supabase = useSupabaseClient();
    const navigate = useNavigate();
    const location = useLocation();
    const session = useSession();
    const [isLoading, setIsLoading] = useState(true);
    const [authStatus, setAuthStatus] = useState<string>("checking");

    useEffect(() => {
        console.log("ProtectedRoute mounted. Current path:", location.pathname);
        console.log("Session from provider:", session ? "EXISTS" : "NULL");

        const checkAuth = async () => {
            try {
                console.log("Checking auth manually...");
                const {
                    data: { session: currentSession },
                    error,
                } = await supabase.auth.getSession();

                if (error) {
                    console.error("Supabase auth error:", error);
                    setAuthStatus("error");
                    navigate("/signin");
                    return;
                }

                console.log("Manual session check result:", currentSession ? "AUTHENTICATED" : "NOT AUTHENTICATED");

                if (!currentSession) {
                    console.log("No session found, redirecting to /signin");
                    setAuthStatus("unauthenticated");
                    navigate("/signin");
                } else {
                    console.log("Session found, user is authenticated");
                    setAuthStatus("authenticated");

                    // Check if we need to redirect to a specific path
                    if (location.pathname === "/" || location.pathname === "/protected") {
                        console.log(`On ${location.pathname}, redirecting to ${redirectTo}`);
                        navigate(redirectTo);
                    } else {
                        console.log(`On ${location.pathname}, staying here`);
                    }
                }
            } catch (error) {
                console.error("Error in checkAuth:", error);
                setAuthStatus("error");
                navigate("/signin");
            } finally {
                setIsLoading(false);
            }
        };

        if (!session) {
            checkAuth();
        } else {
            console.log("Using session from provider, user is authenticated");
            setAuthStatus("authenticated");

            // Handle redirects for authenticated users
            if (location.pathname === "/" || location.pathname === "/protected") {
                console.log(`On ${location.pathname}, redirecting to ${redirectTo}`);
                navigate(redirectTo);
            }

            setIsLoading(false);
        }

        // Clean-up function
        return () => {
            console.log("ProtectedRoute unmounted");
        };
    }, [supabase, navigate, session, location.pathname, redirectTo]);

    // Add an additional effect to log when auth status changes
    useEffect(() => {
        console.log("Auth status changed to:", authStatus);
    }, [authStatus]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading authentication status...</p>
            </div>
        );
    }

    if (authStatus === "authenticated") {
        console.log("Rendering protected content");
        return <>{children}</>;
    }

    console.log("Not rendering protected content, auth status:", authStatus);
    return null;
};

export default ProtectedRoute;