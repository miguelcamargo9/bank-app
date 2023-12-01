import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../services/productsService";
import { Product } from "../../models/Product";
import styles from './Products.module.scss';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError("Error al cargar los productos");
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Lista de Productos</h1>
      <div className={styles.productsContainer}> {/* Contenedor para los productos */}
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}> {/* Aplica los estilos de productCard */}
            <img src={product.logo} alt={product.name} className={styles.productImage} />
            <h2 className={styles.productName}>{product.name}</h2>
            <p className={styles.productDescription}>{product.description}</p>
            <p>Fecha de lanzamiento: {product.date_release}</p>
            <p>Fecha de revisión: {product.date_revision}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
