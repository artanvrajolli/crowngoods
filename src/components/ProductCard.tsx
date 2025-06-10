import { RiAlertLine } from "react-icons/ri";
import { FiPlus, FiCheck } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { IoHardwareChipOutline } from "react-icons/io5";
export interface ProductType {
    localId: number;
    id: number;
    name: string;
    imageUrl: string;
    currentPrice: number;
    inStock: boolean;
    category: string;
    deliveryDays: number;
    vat: number;
    capacity?: string;
    description?: string;
}

interface ProductCardProps {
    product: ProductType;
    onCardClick: (product: ProductType) => void;
}

export default function ProductCard({ product, onCardClick }: ProductCardProps) {
    const { addToCart, removeFromCart, state } = useCart();

    const cartItem = state.items.find(item => item.id === product.id);
    const isInCart = !!cartItem;
    const quantityInCart = cartItem?.quantity || 0;

    const handlePurchaseClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!product.inStock) return;
        onCardClick(product);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!product.inStock) return;
        if (isInCart) {
            removeFromCart(product.id);
        } else {
            addToCart(product);
        }
    };

    return (<div
        className={`border hover:shadow-md ${isInCart
            ? 'border-green-400 bg-green-50'
            : 'border-gray-200'
            } ${!product.inStock ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'} rounded-lg flex flex-col shadow-sm transition-all duration-200 relative h-full`}
        onClick={product.inStock ? () => onCardClick(product) : undefined}
    >                {product.inStock && (
        <button
            onClick={handleAddToCart}
            className={`absolute top-2 right-2 z-10 ${isInCart
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-[#e15726] hover:bg-[#d35f30]'
                } text-white cursor-pointer rounded-full p-2 transition-colors shadow-md focus:outline-none focus:ring-2 ${isInCart ? 'focus:ring-green-600' : 'focus:ring-[#e15726]'
                } focus:ring-opacity-50`}
            aria-label={isInCart ? `In cart (${quantityInCart})` : "Add to cart"}
            title={isInCart ? `In cart (${quantityInCart})` : "Add to cart"}
        >
            {isInCart ? (
                <FiCheck className="w-4 h-4" />
            ) : (
                <FiPlus className="w-4 h-4" />
            )}
        </button>
    )}

        <div className="relative flex justify-center items-center">
            {
                !product.inStock && (
                    <span className="absolute bottom-0 left-2 bg-[#e15726] text-white pointer-events-none flex items-center bg-primary  font-medium text-xs px-1.5 py-0.5 rounded italic mt-3 h-[22px] mr-auto ">
                        <RiAlertLine className="w-5 h-5 mr-1" />
                        Out of Stock
                    </span>
                )
            }
            {
                product.category === 'electronics' && (
                    <span className="absolute top-0 left-2 flex items-center rounded bg-[#e9f1fb] text-[#174e97] italic mt-3 text-xs px-1.5 py-0.5">
                        <IoHardwareChipOutline className="w-5 h-5 mr-1" />
                        Electronics
                    </span>
                )
            }
            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-60 object-contain mb-4"
            />
        </div>
        <div className="p-4 text-left w-full flex flex-col flex-1">
            <h3 className="text-gray-700 text-sm md:text-base font-medium mb-2 line-clamp-2 min-h-[3rem]" title={product.name}>
                {product.name}
            </h3>
            {product.description && (
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                    {product.description}
                </p>
            )}
            <div className="flex-1"></div>
            <span className="price font-bold text-gray-700 text-base md:text-xl">£{product.currentPrice.toFixed(2)}</span>
            {product.vat && (
                <span className="text-xs text-gray-500">VAT: £{product.vat?.toFixed(2) ?? 'N/A'}</span>
            )}
            <div className="flex justify-between py-1 items-center">
                {product.deliveryDays > 0 && (
                    <div className="text-xs text-gray-500">
                        {product.deliveryDays} days delivery
                    </div>
                )}

                {isInCart && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2  rounded-full flex items-center">
                        <FiCheck className="w-3 h-3 mr-1" />
                        In Cart ({quantityInCart})
                    </span>
                )}
            </div>



            <button
                onClick={handlePurchaseClick}
                disabled={!product.inStock}
                className={`mt-4 w-full py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 font-medium text-sm h-11 flex items-center justify-center ${!product.inStock
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-[#e15726] text-white cursor-pointer hover:bg-opacity-90 focus:ring-[#e15726] focus:ring-opacity-50'
                    }`}
            >
                {!product.inStock ? 'Out of Stock' : 'Purchase'}
            </button>
        </div>
    </div>
    );
} 