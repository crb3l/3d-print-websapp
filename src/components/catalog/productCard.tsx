import React from 'react';
import { Product } from '../../utils/products';
import { useCart } from '../../hooks/useCart';
import { Link } from 'react-router-dom';
import ProductDetail from './productDetail';

interface ProductCardProps {
    product: Product;
    onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
    const { addItem } = useCart();

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        addItem(product, 1);
    };
    // const goToProduct= () =>{
    //     ProductDetail(product)
    // };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            onClick={onClick}>
            {/* <Link to={`/shop/${product.name}`}> */}
            {/* <button> */}

            <div className="aspect-square bg-gray-100">
                {product.images && product.images.length > 0 ? (
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                    </div>
                )}
            </div>
            {/* </button> */}
            {/* </Link> */}

            <div className="p-4">
                {/*ONLY FOR LATER ITERATIONS WHEN EACH PRODUCT HAS ITS OWN PAGE - IF NEEDED!!!!@!!!!!!!!!!!!!!!! -- ADD THE </Link> UNDER DESCRIPTION*/}
                {/* <Link to={`/shop/${product.name}`} className="text-inherit font-normal"></Link> */}
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">{product.description}</p>

                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">
                        {product.price} {product.currency}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;