// src/pages/ShopRedirect.tsx
import { useEffect } from "react";

const ShopRedirect = () => {
    useEffect(() => {
        window.location.replace("http://localhost:9000"); // Change this to your actual URL
    }, []);

    return <p>Redirecting to Shop...</p>;
};

export default ShopRedirect;
