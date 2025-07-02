import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import CartItem from './cartItem';

const Cart: React.FC = () => {
    const { items, getTotalPrice, clearCart } = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleCheckout = async () => {
        setIsCheckingOut(true);

        try {
            // Call your backend API to create Stripe checkout session
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/checkout/create-checkout-session`, {
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

    if (items.length === 0) {
        return (
            <div className="max-w-2xl mx-auto p-6">
                <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
                <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">Your cart is empty</p>
                    <button className="text-blue-600 hover:text-blue-800">
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Shopping Cart</h2>
                <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 text-sm"
                >
                    Clear Cart
                </button>
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    {items.map((item) => (
                        <CartItem
                            key={item.product.id}
                            product={item.product}
                            quantity={item.quantity}
                        />
                    ))}
                </div>

                <div className="border-t border-gray-200 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-2xl font-bold">
                            {getTotalPrice().toFixed(2)} RON
                        </span>
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
                    >
                        {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;