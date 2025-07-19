import React, { useState } from 'react';
import { Product } from '../../utils/products';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from './productCard';
import ProductDetail from './productDetail';

const ProductGrid: React.FC = () => {
    const { products, loading } = useProducts();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    if (loading) {
        return (
            <div className="container mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6"> {/*pt fullwidth, cel mai bine scot container si mx-auto - container ia din latime si mx-auto pune automat marginile pe x-axis(stg dreapta)*/}
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                        <div className="bg-gray-300 aspect-square rounded-lg mb-4"></div>
                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} onClick={() => setSelectedProduct(product)} />
                ))}
            </div>
            {selectedProduct && (
                <ProductDetail
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>

    );
};

export default ProductGrid;