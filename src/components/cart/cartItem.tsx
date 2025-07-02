import React from 'react';
import { useCart } from '../../hooks/useCart';
import { Product } from '../../utils/products';

interface CartItemProps {
    product: Product;
    quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ product, quantity }) => {
    const { updateQuantity, removeItem } = useCart();

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity === 0) {
            removeItem(product.id);
        } else {
            updateQuantity(product.id, newQuantity);
        }
    };

    return (
        <div className="flex items-center space-x-4 py-4 border-b border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded">
                {product.images && product.images.length > 0 ? (
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover rounded"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        No Image
                    </div>
                )}
            </div>

            <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <p className="text-gray-600">{product.price} {product.currency}</p>
            </div>

            <div className="flex items-center space-x-2">
                <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                    -
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                    +
                </button>
            </div>

            <div className="text-right">
                <p className="font-semibold">
                    {(product.price * quantity).toFixed(2)} {product.currency}
                </p>
                <button
                    onClick={() => removeItem(product.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartItem;