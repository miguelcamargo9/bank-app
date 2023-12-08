import { Product } from '../models/Product';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';
const AUTHOR_ID = process.env.REACT_APP_AUTHOR_ID || 'default';

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await fetch(`${BASE_URL}/bp/products`, {
            method: 'GET',
            headers: {
                'authorId': AUTHOR_ID
            }
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud de productos');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        throw error;
    }
};

export const createProduct = async (product: Product): Promise<Product> => {
    try {
        const response = await fetch(`${BASE_URL}/bp/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorId': AUTHOR_ID
            },
            body: JSON.stringify(product)
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud de productos');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al crear el producto:', error);
        throw error;
    }
}
