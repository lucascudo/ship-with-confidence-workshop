import { useState, useEffect, useRef } from 'react';
import ProductsService from '../services/Products.service';

function ProductCategoryRow({ category }) {
    return (
      <tr>
        <th colSpan='2'>
          {category}
        </th>
      </tr>
    );
  }
  
  function ProductRow({ product }) {
    const name = product.stocked ? product.name :
      <span style={{ color: 'red' }}>
        {product.name}
      </span>;
  
    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
  
  function ProductTable({ products }) {
    const rows = [];
    let lastCategory = null;
  
    products.forEach((product) => {
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name} />
      );
      lastCategory = product.category;
    });
  
    return (
      <table data-testid='products-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
  
  export default function Products() {
    const [products, setProducts] = useState(null);
    const initialized = useRef(false);
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await ProductsService.fetchProducts();
                setProducts(products);
            } catch (error) {
                console.error(`Error fetching products: ${error}`);
            }
        };
        
        if (!initialized.current) {
          initialized.current = true;
          fetchProducts();
        }
    });

    return (<section>
        {products ? (
            <ProductTable products={products} />
        ) : (
            <p>Loading products...</p>
        )}
    </section>);
  }