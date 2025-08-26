// import React, { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { useCheckout } from "@/hooks/useCheckout";
import { Link } from 'react-router-dom';

const MiniCart: React.FC = () => {
    const { items, getTotalPrice, removeItem, updateQuantity } = useCart();
    const { handleCheckout, isCheckingOut } = useCheckout();

    if (items.length === 0) {
        return (
            <div className="w-80 p-4 text-center">
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <Link to="/shop">
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                        Continue Shopping
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="w-80">
            <div className="p-4 border-b">
                <h3 className="font-semibold text-lg">Shopping Cart</h3>
            </div>

            <div className="max-h-64 overflow-y-auto">
                {items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-3 p-4 border-b">
                        <div className="w-12 h-12 bg-gray-100 rounded flex-shrink-0">
                            {item.product.images && item.product.images.length > 0 ? (
                                <img
                                    src={item.product.images[0]}
                                    alt={item.product.name}
                                    className="w-full h-full object-cover rounded"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                    No Image
                                </div>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{item.product.name}</p>
                            <p className="text-gray-600 text-sm">
                                {item.product.price} {item.product.currency}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                                <button
                                    onClick={() => updateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                                    className="bg-slate-300 w-6 h-6 rounded border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-100"
                                >
                                    -
                                </button>
                                <span className="text-sm">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                    className="bg-slate-300 w-6 h-6 rounded border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-100"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={() => removeItem(item.product.id)}
                            className="bg-slate-100 text-red-500 hover:text-red-700 text-sm"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t">
                <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-lg">
                        {getTotalPrice().toFixed(2)} EUR
                    </span>
                </div>

                <div className="space-y-2">
                    <button
                        onClick={() => handleCheckout(items)}
                        disabled={isCheckingOut}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
                    >
                        {isCheckingOut ? 'Processing...' : 'Quick Checkout'}
                    </button>

                    <Link to="/cart">
                        <button className="bg-white w-full border border-gray-300 hover:bg-gray-50 font-medium mt-2 py-2 px-4 rounded transition-colors duration-200">
                            View Full Cart
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MiniCart;
