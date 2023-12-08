import React, { useState } from "react";
import styles from "./CreateProduct.module.scss";
import layoutStyles from "../../Layout/Layout.module.scss";

const CreateProduct: React.FC = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    logo: "",
    date_release: "",
    date_revision: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del nuevo producto al servidor o hacer lo que necesites
  };

  return (
    <div className={styles.formContainer}>
      <h2>Agregar Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del producto:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Logo (URL):</label>
          <input
            type="text"
            name="logo"
            value={product.logo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Fecha de liberación:</label>
          <input
            type="text"
            name="date_release"
            value={product.date_release}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Fecha de revisión:</label>
          <input
            type="text"
            name="date_revision"
            value={product.date_revision}
            onChange={handleChange}
          />
        </div>
      </form>
      <div className={styles.buttonContainer}>
        <button type="submit">Agregar Producto</button>
        <button
          onClick={() => history.back()}
          className={`${layoutStyles.button} ${layoutStyles.secondary}`}
        >
          Regresar
        </button>
      </div>
    </div>
  );
};

export default CreateProduct;
