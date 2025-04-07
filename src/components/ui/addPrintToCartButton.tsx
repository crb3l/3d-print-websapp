// src/components/AddPrintToCartButton.tsx
import React, { useState } from 'react';
import { usePrintCart } from '@/print_service/PrintCartContext';
import { Loader2 } from 'lucide-react';
import { PrintSettings } from '@/print_service/printCartService';

interface AddPrintToCartButtonProps {
    modelId: string;
    modelName: string;
    settings: PrintSettings;
    getPreviewImage: () => Promise<string>;
}

const AddPrintToCartButton: React.FC<AddPrintToCartButtonProps> = ({
    modelId,
    modelName,
    settings,
    getPreviewImage
}) => {
    const { addModelToCart } = usePrintCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = async () => {
        setIsAdding(true);
        try {
            // Get preview image
            const previewImage = await getPreviewImage();

            // Add to cart
            await addModelToCart(modelId, modelName, settings, previewImage);

            // Show success message
            alert('Model added to cart successfully!');
        } catch (err) {
            console.error('Failed to add model to cart:', err);
            alert('Failed to add model to cart. Please try again.');
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
            {isAdding ? (
                <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding to Cart...
                </>
            ) : (
                'Add to Cart'
            )}
        </button>
    );
};

export default AddPrintToCartButton;