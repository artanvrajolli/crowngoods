import { ProductType } from '../components/ProductCard';

// Alternative: Fetch from Fake Store API
export const fetchProductsFromAPI = async (): Promise<ProductType[]> => {
    const response = await fetch('https://fakestoreapi.com/products');
    const apiProducts = await response.json();

    let tmpProducts = apiProducts.map((product: any, index: number) => ({
        localId: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
        id: product.id,
        name: product.title,
        imageUrl: product.image,
        currentPrice: product.price,
        inStock: true,
        category: product.category,
        deliveryDays: index % 5 + 1,
        vat: product.price * 0.2, // 20% VAT
        capacity: product.category,
        description: product.description
    }));

    let outOfStockProducts = tmpProducts.map((product: any) => ({
        ...product,
        inStock: false,
        currentPrice: product.currentPrice * 1.1,
        localId: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
        id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
    })).slice(0, 5);

    return [...tmpProducts, ...outOfStockProducts];
};


export const fetchProducts = async (): Promise<ProductType[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return await fetchProductsFromAPI();
};

export const handleApiError = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    return 'An unexpected error occurred while fetching data';
};