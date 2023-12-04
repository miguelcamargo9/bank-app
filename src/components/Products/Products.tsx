import React, { useEffect, useState } from "react";
import { fetchProducts } from "../../services/productsService";
import { Product } from "../../models/Product";
import styles from "./Products.module.scss";
import { formatDate } from "../../helpers/dateHelpers";
import Search from "./Search/Search";
import Pagination from "../Pagination/Pagination";

const Products: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setAllProducts(data);
        setDisplayedProducts(data);
        setLoading(false);
      } catch (error) {
        setError("Error al cargar los productos");
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    paginateProducts();
  }, [currentPage, itemsPerPage, allProducts]);

  const filterProducts = (query: string) => {
    if (!query) return allProducts;
    const lowercasedQuery = query.toLowerCase();
    return allProducts.filter((product) => {
      return (
        product.name.toLowerCase().includes(lowercasedQuery) ||
        product.description.toLowerCase().includes(lowercasedQuery) ||
        formatDate(product.date_release).includes(lowercasedQuery) ||
        formatDate(product.date_revision).includes(lowercasedQuery)
      );
    });
  };

  const paginateProducts = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setDisplayedProducts(allProducts.slice(indexOfFirstItem, indexOfLastItem));
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (numberOfItems: number) => {
    setItemsPerPage(numberOfItems);
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    const filtered = filterProducts(query);
    setAllProducts(filtered);
    setCurrentPage(1);
    paginateProducts();
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Lista de Productos</h1>
      <Search onSearch={handleSearch} />
      <table className={styles.productsTable}>
        <thead>
          <tr>
            <th>Logo</th>
            <th>Nombre del producto</th>
            <th>Descripción</th>
            <th>Fecha de liberación</th>
            <th>Fecha de restricción</th>
          </tr>
        </thead>
        <tbody>
          {displayedProducts.map((product) => (
            <tr key={product.id}>
              <td>
                <img
                  src={product.logo}
                  alt={product.name}
                  className={styles.logo}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{formatDate(product.date_release)}</td>
              <td>{formatDate(product.date_revision)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={allProducts.length}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
};

export default Products;
