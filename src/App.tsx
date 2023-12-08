import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Products from "./components/Products/Products";
import CreateProduct from "./components/Products/Create/CreateProduct";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/create" element={<CreateProduct />} />
          {/* Otras rutas */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
