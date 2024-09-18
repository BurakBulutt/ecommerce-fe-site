const ProductCard = ({ product, onClick }) => {
  const emptyImage =
    "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg";
  
    
  const calculateDiscount = (product) => {
    const discount = product.originalPrice - product.priceAfterDiscount;
    const discountPercentage = (discount / product.originalPrice) * 100;
    return discountPercentage.toFixed(2); 
  }  

  return (
    <div
      className="overflow-hidden border-none shadow-none rounded-none flex flex-col justify-center items-center"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="overflow-hidden max-w-64 max-h-64">
        <img
          alt={product.name}
          src={product.image !== undefined ? product.image : emptyImage}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="overflow-hidden max-w-64 mt-4">
        <div className="text-center">
          <span className="text-md font-bold mb-2.5">{product.name}</span>
          {product.productDiscounts.length ? (
            <div className="flex justify-center gap-5">
              <div className="flex items-center justify-center bg-red-600 rounded-md p-3">
                <p className="text-base text-white flex items-center gap-1">%{calculateDiscount(product)}</p>
              </div>
              <p className="text-xs text-body flex flex-col items-center justify-center gap-2">
                <p className="flex flex-col items-center">
                  <span className="text-sm text-gray-500 line-through font-normal">
                    TRY {product.originalPrice.toLocaleString("tr-TR")}
                  </span>
                </p>
                <span className="text-base font-bold text-black">
                  TRY {product.priceAfterDiscount.toLocaleString("tr-TR")}
                </span>
              </p>
            </div>
          ) : (
            <p className="text-xs text-body flex flex-wrap justify-center gap-2">
              <span className="text-base font-bold text-black">
                {" "}
                TRY {product.priceAfterDiscount.toLocaleString("tr-TR")}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
