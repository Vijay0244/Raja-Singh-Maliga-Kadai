import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { EditProductPage } from './pages/EditProductPage'
import { AddProductPage } from './pages/AddProductPage'
import ProductPage from './pages/ProductPage'
import Header from './components/Header'
import Error_404 from './pages/Error_404'

const App: React.FC = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/products/:id" element={<ProductPage/>} />
        <Route path="/edit-product/:id" element={<EditProductPage />} />
        <Route path="*" element={<Error_404 />} />
      </Routes>
    </div>
  )
}

export default App