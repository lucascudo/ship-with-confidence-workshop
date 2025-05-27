import { useState, useEffect } from 'react';

function ProductCategoryRow({ category }) {
    return (
      <tr>
        <th colSpan="2">
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
      <table>
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
    const [fruits, setFruits] = useState(null);
    
    useEffect(() => {
        const fetchFruits = async () => {
            try {
                const response = await fetch('http://localhost:8080/products.json');
                const fruits = await response.json();
                setFruits(fruits);
            } catch (error) {
                console.error('Error fetching fruits:', error);
            }
        };

        fetchFruits();
    }, []);

    return (<section>
        {fruits ? (
            <ProductTable products={fruits} />
        ) : (
            <p>Loading fruits...</p>
        )}
    </section>);
  }