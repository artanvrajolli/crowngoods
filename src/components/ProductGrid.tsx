import { useEffect, useMemo, useState } from "react";
import ProductCard, { ProductType } from "./ProductCard";
import ProductFilter from "./ProductFilter";
import ProductModal from "./ProductModal";
import { fetchProducts, handleApiError } from "../utils";

type SortKey = 'name' | 'currentPrice' | 'deliveryDays';
type SortOrder = 'asc' | 'desc';
type FilterProductType = {
    electronics: boolean;
    hideOutOfStock: boolean;
    minPrice?: number;
    maxPrice?: number;
}

export default function ProductGrid() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<FilterProductType>({
        electronics: false,
        hideOutOfStock: false,
        minPrice: undefined,
        maxPrice: undefined
    });
    const [sortKey, setSortKey] = useState<SortKey>('name');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const fetchedProducts = await fetchProducts();
            setProducts(fetchedProducts);
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (product: ProductType) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    const filteredAndSortedProducts = useMemo(() => {
        if (products.length === 0) return [];

        const tempProducts = products.filter((product) => {
            const electronicsCondition = !filters.electronics || product.category === 'electronics';
            const stockCondition = filters.hideOutOfStock ? product.inStock : true;
            const minPriceCondition = filters.minPrice === undefined || product.currentPrice >= (filters.minPrice || 0);
            const maxPriceCondition = filters.maxPrice === undefined || product.currentPrice <= (filters.maxPrice || 0);

            return electronicsCondition && stockCondition && minPriceCondition && maxPriceCondition;
        });

        tempProducts.sort((a, b) => {
            let valA = a[sortKey];
            let valB = b[sortKey];

            if (typeof valA === 'string') valA = valA.toLowerCase();
            if (typeof valB === 'string') valB = valB.toLowerCase();

            if (valA < valB) {
                return sortOrder === 'asc' ? -1 : 1;
            }
            if (valA > valB) {
                return sortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });

        return tempProducts;
    }, [products, filters, sortKey, sortOrder]);

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="col-span-1 relative">
                    <ProductFilter filters={filters} setFilters={setFilters} />
                </div>
                <div className="col-span-3">
                    <div className="p-4 flex flex-wrap gap-2 items-center border-b border-gray-200">
                        <span className="text-sm font-medium mr-2">Sort by:</span>
                        <button
                            onClick={() => handleSort('name')}
                            className={`px-3 py-1 cursor-pointer text-sm rounded-md border ${sortKey === 'name' ? 'bg-[#e15726] text-white border-[#e15726]' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                        >
                            Name {sortKey === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </button>
                        <button
                            onClick={() => handleSort('currentPrice')}
                            className={`px-3 py-1 cursor-pointer text-sm rounded-md border ${sortKey === 'currentPrice' ? 'bg-[#e15726] text-white border-[#e15726]' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                        >
                            Price {sortKey === 'currentPrice' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </button>
                        <button
                            onClick={() => handleSort('deliveryDays')}
                            className={`px-3 py-1 cursor-pointer text-sm rounded-md border ${sortKey === 'deliveryDays' ? 'bg-[#e15726] text-white border-[#e15726]' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                        >
                            Delivery Time {sortKey === 'deliveryDays' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
                        {loading ? (
                            <div className="col-span-full text-center py-8 text-gray-500">
                                Loading products...
                            </div>
                        ) : error ? (
                            <div className="col-span-full text-center py-8">
                                <div className="text-red-500 mb-2">Error loading products</div>
                                <div className="text-gray-500 text-sm mb-4">{error}</div>
                                <button
                                    onClick={loadProducts}
                                    className="bg-[#e15726] text-white px-4 py-2 rounded-md hover:bg-[#d35f30] transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        ) : filteredAndSortedProducts.length === 0 ? (
                            <div className="col-span-full text-center py-8 text-gray-500">
                                No products found matching your filters
                            </div>
                        ) : (
                            filteredAndSortedProducts.map((product) => (
                                <ProductCard key={product.localId} product={product} onCardClick={handleOpenModal} />
                            ))
                        )}
                    </div>
                </div>
            </div>
            {selectedProduct && (
                <ProductModal product={selectedProduct} onClose={handleCloseModal} />
            )}
        </>
    );
}