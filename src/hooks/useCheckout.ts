import { useState } from "react";
import { Product } from '../utils/products'

interface CartItem {
  product: Product;
  quantity: number;
}
export function useCheckout() {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async (items: CartItem[]) => {
    if (!items || items.length === 0) return;

        setIsCheckingOut(true);

        try {
            const response = await fetch('https://threed-print-websapp-backend.onrender.com/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items }),
            });

            const { url } = await response.json();

            if (url) {
                window.location.href = url;
            }
        } catch (error) {
            console.error('Checkout failed:', error);
            setIsCheckingOut(false);
        }
    };
    return {handleCheckout, isCheckingOut};
}

// THIS WAS TO BE USED IN MINICART AND CART IF THIS METHOD FAILS FOR WHATEVER REASON ########################


    // const [isCheckingOut, setIsCheckingOut] = useState(false);

    // const handleQuickCheckout = async () => {
    //     if (items.length === 0) return;

    //     setIsCheckingOut(true);

    //     try {
    //         const response = await fetch('https://threed-print-websapp-backend.onrender.com/api/create-checkout-session', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ items }),
    //         });

    //         const { url } = await response.json();

    //         if (url) {
    //             window.location.href = url;
    //         }
    //     } catch (error) {
    //         console.error('Checkout failed:', error);
    //         setIsCheckingOut(false);
    //     }
    // };