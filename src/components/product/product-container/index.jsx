import { useEffect, useState } from "react";
import ProductCard from "../product-card";
import { useNavigate } from "react-router-dom";

const ProductContainer = ({products}) => {
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (products !== undefined) {
      setProductList(products.content);
    }
  }, [products]);

  const handleProductClick = (product) => {
    console.log(product.slug);
    navigate(`/products/${product.slug}`);
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      <h2 className="col-span-12 text-xl font-bold mb-4">Ürünler</h2>
      {productList.map((p) => (
        <div key={p.id} className="col-span-12 sm:col-span-6 lg:col-span-4">
          <ProductCard product={p} onClick={() => handleProductClick(p)}/>
        </div>
      ))}
    </div>
  );
  
};
export default ProductContainer;
