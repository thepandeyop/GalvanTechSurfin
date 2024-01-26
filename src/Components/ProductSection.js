import React, { useState, useReducer, useCallback, useMemo } from 'react';
import Product from './Product';
import '../Styles/ProductSection.css';
import image1 from '../Assets/fac1.jpg';
import image2 from '../Assets/fac2.jpg';

const ProductSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, dispatch] = useReducer(productReducer, {
    selectedMainProduct: null,
    selectedSubProduct: null,
    selectedSubSubProduct: null,
  });
  const [filteredProducts, setFilteredProducts] = useState([]);

  function productReducer(state, action) {
    switch (action.type) {
      case 'SELECT_MAIN_PRODUCT':
        return { ...state, selectedMainProduct: action.payload, selectedSubProduct: null, selectedSubSubProduct: null };
      case 'SELECT_SUB_PRODUCT':
        return { ...state, selectedSubProduct: action.payload, selectedSubSubProduct: null };
      case 'SELECT_SUB_SUB_PRODUCT':
        return { ...state, selectedSubSubProduct: action.payload };

      default:
        return state;
    }
  }

  const products = useMemo(() => [
    {
      name: 'Main Product 1',
      image: image1,
      description: 'Description for Main Product 1.',
      subProducts: [
        {
          name: 'Sub Product 1',
          image: image2,
          description: 'Description for Sub Product 1.',
          subSubProducts: [
            {
              name: 'SubSub Product 1',
              image: image1,
              description: 'Description for SubSub Product 1.',
            },
            {
              name: 'SubSub Product 2',
              image: image2,
              description: 'Description for SubSub Product 2.',
            },
          ],
        },
        {
          name: 'Sub Product 2',
          image: image1,
          description: 'Description for Sub Product 2.',
          subSubProducts: [
            {
              name: 'SubSub Product 3',
              image: image1,
              description: 'Description for SubSub Product 3.',
            },
            {
              name: 'SubSub Product 4',
              image: image2,
              description: 'Description for SubSub Product 4.',
            },
          ],
        },
      ],
    },
    // Add more products as needed
  ], []);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        (product.subProducts &&
          product.subProducts.some((subProduct) => subProduct.name.toLowerCase().includes(query)))
    );
    setFilteredProducts(filtered);
  };

  const handleMainProductClick = useCallback((mainProduct) => {
    dispatch({ type: 'SELECT_MAIN_PRODUCT', payload: mainProduct });
  }, []);

  const handleSubProductClick = useCallback((subProduct) => {
    dispatch({ type: 'SELECT_SUB_PRODUCT', payload: subProduct });
  }, []);

  const handleSubSubProductClick = useCallback((subSubProduct) => {
    dispatch({ type: 'SELECT_SUB_SUB_PRODUCT', payload: subSubProduct });
  }, []);

  return (
    <div className="product-section">
      <h2>Our Products</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="product-list">
        {filteredProducts.map((mainProduct, index) => (
          <div key={index}>
            <Product
              {...mainProduct}
              onClick={() => handleMainProductClick(mainProduct)}
              isSelected={selectedProducts.selectedMainProduct === mainProduct}
            />
            {selectedProducts.selectedMainProduct === mainProduct && (
              <div className="sub-product-list">
                {mainProduct.subProducts &&
                  mainProduct.subProducts.map((subProduct, subIndex) => (
                    <div key={subIndex}>
                      <Product
                        {...subProduct}
                        onClick={() => handleSubProductClick(subProduct)}
                        isSelected={selectedProducts.selectedSubProduct === subProduct}
                      />
                      {selectedProducts.selectedSubProduct === subProduct && (
                        <div className="sub-sub-product-list">
                          {subProduct.subSubProducts &&
                            subProduct.subSubProducts.map((subSubProduct, subSubIndex) => (
                              <Product
                                key={subSubIndex}
                                {...subSubProduct}
                                onClick={() => handleSubSubProductClick(subSubProduct)}
                                isSelected={selectedProducts.selectedSubSubProduct === subSubProduct}
                              />
                            ))}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
