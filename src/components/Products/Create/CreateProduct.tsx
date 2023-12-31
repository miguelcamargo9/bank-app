import React, { useState, useEffect } from "react";
import styles from "./CreateProduct.module.scss";
import layoutStyles from "../../Layout/Layout.module.scss";
import { Product } from "../../../models/Product";
import { Errors } from "../../../models/Error";
import { createProduct } from "../../../services/productsService";
import Alert from "../../Alert/Alert";
import { useNavigate } from "react-router-dom";

const CreateProduct: React.FC = () => {
  const navigate = useNavigate();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [product, setProduct] = useState<Product>({
    id: "",
    name: "",
    description: "",
    logo: "",
    date_release: "",
    date_revision: "",
  });
  const [errors, setErrors] = useState<Errors>({
    id: "",
    name: "",
    description: "",
    logo: "",
    date_release: "",
    date_revision: "",
  });
  const [alertInfo, setAlertInfo] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({ message: "", type: null });

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (shouldRedirect) {
      timer = setTimeout(() => {
        navigate(-1);
      }, 3000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [shouldRedirect, navigate]);

  const validateField = (name: keyof Product, value: string) => {
    if (!value) {
      const fieldName =
        name.charAt(0).toUpperCase() + name.slice(1).replace("_", " ");
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `El campo ${fieldName} es requerido`,
      }));
      return false;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as { name: keyof Product; value: string };
    if (name === "date_release" || name === "date_revision") {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: new Date(value).toISOString().split("T")[0],
      }));
      return;
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }

    if (errors[name]) {
      validateField(name, value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    // Validate all fields
    (Object.keys(product) as Array<keyof Product>).forEach((key) => {
      isValid = validateField(key, product[key]) && isValid;
    });

    if (!isValid) {
      // Prevent form submission if validation fails
      return;
    }

    // Submit form if all validations pass
    try {
      await createProduct(product);
      setAlertInfo({ message: "Producto creado con éxito", type: "success" });
      setShouldRedirect(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      setAlertInfo({
        message: `No se pudo crear el producto: ${error.message}`,
        type: "error",
      });
    }
  };

  const getInputClassName = (fieldName: string) => {
    return errors[fieldName] ? `${styles.input} ${styles.error}` : styles.input;
  };

  const clearForm = () => {
    setProduct({
      id: "",
      name: "",
      description: "",
      logo: "",
      date_release: "",
      date_revision: "",
    });
    setErrors({
      id: "",
      name: "",
      description: "",
      logo: "",
      date_release: "",
      date_revision: "",
    });
  };

  const isFormDirtyOrInvalid = () => {
    const fieldsNotEmpty = Object.values(product).some((value) => value !== "");
    const errorsPresent = Object.values(errors).some((error) => error !== "");
    return fieldsNotEmpty || errorsPresent;
  };

  const handleCloseAlert = () => {
    setAlertInfo({ message: "", type: null });
  };

  return (
    <div className={styles.formContainer}>
      {alertInfo.type && (
        <Alert
          message={alertInfo.message}
          type={alertInfo.type}
          onClose={handleCloseAlert}
        />
      )}
      <h2>Agregar Nuevo Producto</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">ID del producto:</label>
          <input
            id="id"
            type="text"
            name="id"
            value={product.id}
            onChange={handleChange}
            className={getInputClassName("id")}
          />
          {errors.id && <div className={styles.errorMsg}>{errors.id}</div>}
        </div>
        <div>
          <label htmlFor="name">Nombre del producto:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className={getInputClassName("name")}
          />
          {errors.name && <div className={styles.errorMsg}>{errors.name}</div>}
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <input
            id="description"
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            className={getInputClassName("description")}
          />
          {errors.description && (
            <div className={styles.errorMsg}>{errors.description}</div>
          )}
        </div>
        <div>
          <label htmlFor="logo">Logo (URL):</label>
          <input
            id="logo"
            type="text"
            name="logo"
            value={product.logo}
            onChange={handleChange}
            className={getInputClassName("logo")}
          />
          {errors.logo && <div className={styles.errorMsg}>{errors.logo}</div>}
        </div>
        <div>
          <label htmlFor="date_release">Fecha de liberación:</label>
          <input
            id="date_release"
            type="date"
            name="date_release"
            value={product.date_release}
            onChange={handleChange}
            className={getInputClassName("date_release")}
          />
          {errors.date_release && (
            <div className={styles.errorMsg}>{errors.date_release}</div>
          )}
        </div>
        <div>
          <label htmlFor="date_revision">Fecha de revisión:</label>
          <input
            id="date_revision"
            type="date"
            name="date_revision"
            value={product.date_revision}
            onChange={handleChange}
            className={getInputClassName("date_revision")}
          />
          {errors.date_revision && (
            <div className={styles.errorMsg}>{errors.date_revision}</div>
          )}
        </div>
      </form>
      <div className={styles.buttonContainer}>
        {isFormDirtyOrInvalid() && (
          <button
            onClick={clearForm}
            className={`${layoutStyles.button} ${layoutStyles.secondary}`}
          >
            Reiniciar
          </button>
        )}
        {!isFormDirtyOrInvalid() && (
          <button
            onClick={() => navigate(-1)}
            className={`${layoutStyles.button} ${layoutStyles.secondary}`}
          >
            Regresar
          </button>
        )}
        <button onClick={handleSubmit}>Agregar Producto</button>
      </div>
    </div>
  );
};

export default CreateProduct;
