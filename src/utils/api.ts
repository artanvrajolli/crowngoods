import { ProductType } from '../components/ProductCard';

// Alternative: Fetch from Fake Store API
export const fetchProductsFromAPI = async (): Promise<ProductType[]> => {
    const response = await fetch('https://fakestoreapi.com/products');
    const apiProducts = await response.json();

    // Transform API data to match your ProductType interface
    return apiProducts.map((product: any) => ({
        id: product.id,
        name: product.title,
        imageUrl: product.image,
        currentPrice: product.price,
        inStock: true,
        category: product.category,
        deliveryDays: 1,
        vat: product.price * 0.2, // 20% VAT
        capacity: product.category,
        description: product.description
    }));
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