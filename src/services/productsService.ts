import { Product } from '../models/Product';

const BASE_URL = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';

export const fetchProducts = async (): Promise<Product[]> => {
    const authorId = '10';
    try {
        const response = await fetch(`${BASE_URL}/bp/products`, {
            method: 'GET',
            headers: {
                'authorId': authorId
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
