import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './components/Products/Products';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Products />} />
      </Routes>
    </Router>
  );
};

export default App;
