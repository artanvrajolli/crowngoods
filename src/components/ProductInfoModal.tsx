import { ProductType } from "./ProductCard";

interface ProductInfoModalProps {
    product: ProductType;
    onClose: () => void;
    onContinuePurchase: () => void;
}

export default function ProductInfoModal({ product, onClose, onContinuePurchase }: ProductInfoModalProps) {

    return (
        <>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
                <button
                    onClick={onClose}
                    className="text-[#e4673b] cursor-pointer hover:text-[#d35f30] text-2xl font-bold transition-colors"
                    aria-label="Close modal"
                >
                    ×
                </button>
            </div>

            {/* Main content - side by side layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left side - Product Image */}
                <div className="flex justify-center items-center">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full max-w-md h-auto max-h-96 object-contain rounded-lg shadow-sm"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-product.png';
                        }}
                    />
                </div>

                {/* Right side - Product Details */}
                <div className="flex flex-col justify-between">
                    <div className="space-y-4 text-gray-700">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-3xl font-bold text-[#e15726]">
                                    £{product.currentPrice.toFixed(2)}
                                </span>
                                <span className="text-sm text-gray-500">
                                    (VAT: £{product.vat.toFixed(2)})
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="font-medium">Delivery Time:</span>
                                <span>{product.deliveryDays} days</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="font-medium">In Stock:</span>
                                <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                                    {product.inStock ? "Yes" : "No"}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="font-medium">Category:</span>
                                <span className="capitalize">{product.category}</span>
                            </div>
                        </div>

                        {product.description && (
                            <div className="mt-4">
                                <h4 className="font-medium mb-2">Description:</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
                            </div>
                        )}
                    </div>

                    {/* Purchase button at bottom of right column */}
                    <button
                        onClick={onContinuePurchase}
                        className="mt-6 w-full cursor-pointer bg-[#e4673b] text-white py-3 px-6 rounded-md hover:bg-[#d35f30] transition-colors font-medium text-lg"
                        disabled={!product.inStock}
                    >
                        {product.inStock ? 'Continue Purchase' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </>
    );
} 