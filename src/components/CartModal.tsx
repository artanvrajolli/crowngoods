import { useCart, CartItem } from "../context/CartContext";
import { FiMinus, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import { useEffect } from "react";

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
    const { state, updateQuantity, removeFromCart, clearCart } = useCart();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleQuantityChange = (item: CartItem, newQuantity: number) => {
        if (newQuantity <= 0) {
            removeFromCart(item.id);
        } else {
            updateQuantity(item.id, newQuantity);
        }
    }; return (<div onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
        <div onClick={(e) => e.stopPropagation()} className="bg-white text-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[95vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Shopping Cart</h2>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1"
                    aria-label="Close cart"
                >
                    <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col">
                {state.items.length === 0 ? (
                    <div className="text-center py-8 px-4 sm:px-6">
                        <p className="text-gray-500 text-lg">Your cart is empty</p>
                        <p className="text-gray-400 text-sm mt-2">Add some items to get started</p>
                    </div>
                ) : (
                    <>                        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
                        <div className="space-y-3 sm:space-y-4">
                            {state.items.map((item) => (
                                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200 rounded-lg">
                                    <div className="flex items-center gap-3 w-full sm:w-auto">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-md flex-shrink-0"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = '/placeholder-product.png';
                                            }}
                                        />

                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-gray-900 text-sm sm:text-base">{item.name}</h3>
                                            <p className="text-xs sm:text-sm text-gray-500">{item.deliveryDays} days delivery</p>
                                            <p className="font-semibold text-[#e15726] text-sm sm:text-base">£{item.currentPrice.toFixed(2)}</p>
                                        </div>
                                    </div>

                                    <div className="flex ml-auto items-center justify-between w-full sm:w-auto sm:justify-end gap-3">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                                className="p-2 sm:p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                                                aria-label="Decrease quantity"
                                            >
                                                <FiMinus className="w-3 h-3 sm:w-4 sm:h-4" />
                                            </button>

                                            <span className="w-8 text-center font-medium text-sm sm:text-base">{item.quantity}</span>

                                            <button
                                                onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                                className="p-2 sm:p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                                                aria-label="Increase quantity"
                                            >
                                                <FiPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-2 sm:p-1 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors cursor-pointer"
                                            aria-label="Remove item"
                                        >
                                            <FiTrash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                        <div className="flex-shrink-0 border-t border-gray-200 p-4 sm:p-6 bg-white">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                                <span className="text-base sm:text-lg font-semibold">Total Items: {state.totalItems}</span>
                                <span className="text-lg sm:text-xl font-bold text-[#e15726]">£{state.totalPrice.toFixed(2)}</span>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                <button
                                    onClick={clearCart}
                                    className="w-full sm:flex-1 bg-gray-200 text-gray-700 py-3 sm:py-2 px-4 rounded-md hover:bg-gray-300 transition-colors font-medium cursor-pointer text-sm sm:text-base"
                                >
                                    Clear Cart
                                </button>
                                <button
                                    onClick={onClose}
                                    className="w-full sm:flex-1 bg-[#e15726] text-white py-3 sm:py-2 px-4 rounded-md hover:bg-[#d35f30] transition-colors font-medium cursor-pointer text-sm sm:text-base"
                                >
                                    Continue Shopping
                                </button>
                                <button className="w-full sm:flex-1 bg-green-600 text-white py-3 sm:py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium cursor-pointer text-sm sm:text-base">
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    </div >
    );
}
