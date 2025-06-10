import { ProductType } from "./ProductCard";
import { useState } from "react";
import ProductInfoModal from "./ProductInfoModal";
import PaymentModal from "./PaymentModal";

interface ProductModalProps {
    product: ProductType | null;
    onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    if (!product) return null;

    return (
        <div onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div onClick={(e) => e.stopPropagation()} className={`bg-white text-gray-800 p-6 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ease-in-out`}>
                {!showPaymentForm ? (
                    <ProductInfoModal
                        product={product}
                        onClose={onClose}
                        onContinuePurchase={() => setShowPaymentForm(true)}
                    />
                ) : (
                    <PaymentModal
                        onBack={() => setShowPaymentForm(false)}
                        onClose={onClose}
                    />
                )}
            </div>
        </div>
    );
} 