// src/pages/ShopRedirect.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ShopRedirect = () => {
    useEffect(() => {
        window.location.replace("http://localhost:4000"); // Change this to your actual Evershop URL
    }, []);

    return <p>Redirecting to Shop...</p>;
};

export default ShopRedirect;
